'use client';
import Link from 'next/link';
import { Routes } from '../routes';

const ButtonCreateAccount = () => {
  return (
    <Link href={Routes.createAccount}>
      <button
        type="button"
        className="group flex items-center gap-[6px] text-[14px] font-semibold text-[#E46643] active:cursor-wait dark:font-normal dark:tracking-normal sm:tracking-[-0.05px]"
      >
        <svg
          className="fill-[#E46643]"
          xmlns="http://www.w3.org/2000/svg"
          height="18"
          viewBox="0 -960 960 960"
          width="18"
        >
          <path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z" />
        </svg>
        <div className="flex flex-col">
          <span className="hidden leading-[13px] md:block">Create new account</span>
          <span className="block leading-[13px] md:hidden">new account</span>
          <div className="h-px w-full transition group-hover:bg-[#E46643]"></div>
        </div>
      </button>
    </Link>
  );
};

export default ButtonCreateAccount;
