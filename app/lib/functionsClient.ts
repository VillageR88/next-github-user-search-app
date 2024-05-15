'use client';
import { DocumentJSON } from './interfaces';

export const safeContext = ({ dataContext }: { dataContext: DocumentJSON[] }) => {
  const safe = JSON.parse(JSON.stringify(dataContext)) as DocumentJSON[];
  return safe;
};

export const createMouseLoader = () => {
  const style = document.createElement('style');
  return style;
};

export const startMouseLoader = ({ mouseLoader }: { mouseLoader: HTMLStyleElement }) => {
  mouseLoader.innerHTML = `* { cursor: wait}`;
  document.head.appendChild(mouseLoader);
};

export const stopMouseLoader = ({ mouseLoader }: { mouseLoader: HTMLStyleElement }) => {
  document.head.removeChild(mouseLoader);
};

export const safeName = ({ selected, dataContext }: { selected: number | null; dataContext: DocumentJSON[] }) => {
  if (selected === null) return safeContext({ dataContext: dataContext });
  const temp = safeContext({ dataContext: dataContext });
  temp[selected].name = 'untitled-document.md';
  let iterator = 1;
  if (
    dataContext.filter((value) => value.name === dataContext[selected].name).length > 1 ||
    dataContext[selected].name === '.md'
  ) {
    while (temp.filter((value) => value.name === temp[selected].name).length > 1) {
      temp[selected].name = 'untitled-document' + (iterator > 1 ? iterator.toString() : '') + '.md';
      iterator++;
    }
    return safeContext({ dataContext: temp });
  } else {
    return safeContext({ dataContext: dataContext });
  }
};
