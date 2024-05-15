'use client';

import IconLogin from '@/app/components/IconLogin';
import { useContext, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { TButtonSubmit } from '@/app/lib/interfaces';
import { createMouseLoader, startMouseLoader, stopMouseLoader } from '../lib/functionsClient';
import { DataContext } from '../_providers/DataContext';

const submitButtonProps = {
  login: {
    title: 'Login',
    icon: <IconLogin />,
  },
  createAccount: {
    title: 'Create Account',
    icon: (
      <svg className="ml-1" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18">
        <path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z" />
      </svg>
    ),
  },
  resetPassword: {
    title: 'Reset Password',
    icon: (
      <svg className="ml-px" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18">
        <path d="M520-120q-74 0-138.5-27.5T268-223l57-57q38 37 88 58.5T520-200q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198v7l73-73 57 56-170 170L30-490l57-56 73 74v-8q0-75 28.5-140.5t77-114q48.5-48.5 114-77T520-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T880-480q0 150-105 255T520-120Zm-80-200q-17 0-28.5-11.5T400-360v-120q0-17 11.5-28.5T440-520v-40q0-33 23.5-56.5T520-640q33 0 56.5 23.5T600-560v40q17 0 28.5 11.5T640-480v120q0 17-11.5 28.5T600-320H440Zm40-200h80v-40q0-17-11.5-28.5T520-600q-17 0-28.5 11.5T480-560v40Z" />
      </svg>
    ),
  },
};

export default function ButtonSubmit({ type, state }: { type: TButtonSubmit; state?: string }) {
  const { setSelected, selected, dataContext } = useContext(DataContext);

  useEffect(() => {
    if (selected === null && dataContext.length > 0 && dataContext.some((data) => data.name === 'welcome.md')) {
      setSelected(dataContext.findIndex((data) => data.name === 'welcome.md'));
    }
  }, [dataContext, selected, setSelected]);

  const { pending } = useFormStatus();
  useEffect(() => {
    if (pending) {
      const mouseLoader = createMouseLoader();
      startMouseLoader({ mouseLoader: mouseLoader });
      return () => {
        stopMouseLoader({ mouseLoader: mouseLoader });
      };
    }
  }, [pending, type]);

  return (
    <div className="flex flex-col">
      <div>
        <button disabled={pending} className="button3 group size-full" type="submit">
          <div className="button2Submit">
            <span>{submitButtonProps[type].title}</span>
            {submitButtonProps[type].icon}
          </div>
        </button>
      </div>
      <div className="flex h-0 justify-center">
        <span className="mt-[16px] px-1 text-sm font-semibold tracking-[-0.18px] text-[#ff3333] dark:font-normal dark:tracking-normal">
          {state}
        </span>
      </div>
    </div>
  );
}
