'use server';

import type { tGithubJSON } from './types';

export const createInvoice = async (prev: tGithubJSON, formData: FormData): Promise<tGithubJSON> => {
  const response = await fetch('https://api.github.com/users/'.concat(formData.get('search') as string));
  const json = (await response.json()) as tGithubJSON;
  return json;
};
