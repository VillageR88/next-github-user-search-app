'use server';

import { cookies } from 'next/headers';
import { DocumentJSON } from './interfaces';
import { redirect } from 'next/navigation';
import { Routes } from '../routes';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import type { Message } from '@/app/lib/interfaces';
import { Client, ClientConfig } from 'pg';

const defJSON = [
  {
    createdAt: new Date().toString(),
    name: 'welcome.md',
    content:
      "# Welcome to Markdown\n\nMarkdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.\n\n## How to use this?\n\n1. Write markdown in the markdown editor window\n2. See the rendered markdown in the preview window\n\n### Features\n\n- Create headings, paragraphs, links, blockquotes, inline-code, code blocks, and lists\n- Name and save the document to access again later\n- Choose between Light or Dark mode depending on your preference\n\n> This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).\n\n#### Headings\n\nTo create a heading, add the hash sign (#) before the heading. The number of number signs you use should correspond to the heading level. You'll see in this guide that we've used all six heading levels (not necessarily in the correct way you should use headings!) to illustrate how they should look.\n\n##### Lists\n\nYou can see examples of ordered and unordered lists above.\n\n###### Code Blocks\n\nThis markdown editor allows for inline-code snippets, like this: `<p>I'm inline</p>`. It also allows for larger code blocks like this:\n\n```\n<main>\n  <h1>This is a larger code block</h1>\n</main>\n```",
  },
] as DocumentJSON[];

const clientConfig: ClientConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.ENV !== 'development' && { rejectUnauthorized: false },
};

const client = new Client(clientConfig);
void client.connect();

export const checkToken = async () => {
  const token = cookies().get('token')?.value;
  await Promise.resolve(token);
  if (!token) return null;
  return token;
};

export const clearToken = async () => {
  cookies().delete('token');
  await Promise.resolve();
};

export const handleLoadCollectionGroup = async ({ token }: { token: string }) => {
  if (!token) return null;
  let decodedToken;
  try {
    if (!process.env.JWT_SECRET) return { message: 'Invalid token' };
    decodedToken = jwt.verify(token, process.env.JWT_SECRET) as { email: string; id: number; iat: number };
  } catch (err) {
    return { message: 'Invalid token' };
  }
  try {
    const result = (await client.query('SELECT data FROM users WHERE email = $1', [decodedToken.email])) as {
      rows: { data: DocumentJSON[] }[];
    };
    if (result.rows.length > 0) {
      const data = result.rows[0].data;
      return data;
    } else {
      return;
    }
  } catch (err) {
    return;
  }
};

export const handleSaveCollectionGroup = async ({ data, token }: { data: string; token: string }) => {
  if (!token) return false;
  let decodedToken;
  try {
    if (!process.env.JWT_SECRET) return false;
    decodedToken = jwt.verify(token, process.env.JWT_SECRET) as { email: string; id: number; iat: number };
  } catch (err) {
    return false;
  }
  try {
    const result = await client.query('SELECT * FROM users WHERE email = $1', [decodedToken.email]);
    if (result.rows.length > 0) {
      await client.query('UPDATE users SET data = $1 WHERE email = $2', [data, decodedToken.email]);
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};

export async function createInvoiceCreateEmail(prev: Message, formData: FormData): Promise<Message> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const passwordConfirm = formData.get('passwordConfirm') as string;
  if (password !== passwordConfirm)
    return {
      message: 'Passwords do not match',
    };
  let user;
  try {
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length > 0) {
      return { message: 'User already exists' };
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = (
        await client.query('INSERT INTO users (email, password, data) VALUES ($1, $2, $3) RETURNING *', [
          email,
          hashedPassword,
          JSON.stringify(defJSON),
        ])
      ).rows[0] as { id: number; email: string; password: string; data: DocumentJSON[] };
      if (!process.env.JWT_SECRET) return { message: 'Server error' };
      const token = jwt.sign({ email: user.email, id: user.id }, process.env.JWT_SECRET);
      cookies().set({ name: 'token', value: token, httpOnly: true });
      return { message: '' };
    }
  } catch (err) {
    console.error(err);
    return { message: 'Server error' };
  } finally {
    if (user) redirect(Routes.home);
  }
}

export async function createInvoiceLogin(prev: Message, formData: FormData): Promise<Message> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  let isMatch;
  try {
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length > 0) {
      const user = result.rows[0] as { id: number; email: string; password: string };
      isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return { message: 'Invalid credentials' };
      } else {
        const token = jwt.sign({ email: user.email, id: user.id }, process.env.JWT_SECRET ?? '');
        cookies().set({ name: 'token', value: token, httpOnly: true });
        return { message: '' };
      }
    } else {
      return { message: 'Invalid credentials' };
    }
  } catch (err) {
    console.error(err);
    return { message: 'Server error' };
  } finally {
    if (isMatch) {
      redirect(Routes.home);
    }
  }
}

export async function createInvoiceResetRequest(prev: Message, formData: FormData): Promise<Message> {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const email = formData.get('email') as string;
  try {
    const response = (await client.query('SELECT * FROM users WHERE email = $1', [email])).rows[0] as {
      id: number;
      email: string;
      password: string;
      reset_token: string;
      reset_token_expiration: Date;
      data: DocumentJSON[];
    };
    if (response.id) {
      const expirationTime = Date.now() + 3600000; // 1 hour
      const resetToken = crypto.randomBytes(20).toString('hex');
      await client.query('UPDATE users SET reset_token = $1, reset_token_expiration = $2 WHERE email = $3', [
        resetToken,
        expirationTime,
        email,
      ]);
      if (!process.env.APP_URL) return { message: 'Server error' };
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Password Reset',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n${process.env.APP_URL}/reset-password/reset/${resetToken}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };
      await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err) => {
          if (err) {
            console.error('there was an error: ', err);
            reject(err);
          } else {
            resolve(null);
          }
        });
      });
      return { message: 'success' };
    } else {
      return { message: 'success' };
    }
  } catch (error) {
    return { message: 'success' };
  }
}

export async function createInvoiceReset(prev: Message, formData: FormData, token: string): Promise<Message> {
  const password = formData.get('password') as string;
  const passwordConfirm = formData.get('passwordConfirm') as string;
  if (password !== passwordConfirm)
    return {
      message: 'Passwords do not match',
    };
  let response;
  try {
    response = (
      await client.query('SELECT * FROM users WHERE reset_token = $1 AND reset_token_expiration > $2', [
        token,
        Date.now(),
      ])
    ).rows[0] as {
      id: number;
      email: string;
      password: string;
      reset_token: string;
      reset_token_expiration: Date;
    } | null;
    if (response) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await client.query(
        'UPDATE users SET password = $1, reset_token = $2, reset_token_expiration = $3 WHERE reset_token = $4',
        [hashedPassword, null, null, token],
      );
      if (!process.env.JWT_SECRET) return { message: 'Server error' };
      const newToken = jwt.sign({ email: response.email, id: response.id }, process.env.JWT_SECRET);
      cookies().set({ name: 'token', value: newToken, httpOnly: true });
      return { message: 'success' };
    }
    return { message: 'Reset token expired. Request new one.' };
  } catch (error) {
    return { message: 'Server error' };
  } finally {
    if (response) {
      redirect(Routes.home);
    }
  }
}
