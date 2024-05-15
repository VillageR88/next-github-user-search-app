'use server';

interface DocumentJSON {
  createdAt: string;
  name: string;
  content: string;
}

type TButtonSubmit = 'login' | 'createAccount' | 'resetPassword';

interface Message {
  message: string;
}

export type { DocumentJSON, TButtonSubmit, Message };
