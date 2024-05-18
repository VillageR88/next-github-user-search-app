'use server';

import type { tGithubJSON1, tGithubJSON2 } from './types';

export const createInvoice = async (prev: tGithubJSON1, formData: FormData): Promise<tGithubJSON1> => {
  const response = await fetch('https://api.github.com/users/'.concat(formData.get('search') as string));
  const json = (await response.json()) as tGithubJSON1 | tGithubJSON2;
  if ('message' in json && json.message === 'Not Found') return { ...prev, error: true };
  else return { ...(json as tGithubJSON1), error: false };
};
