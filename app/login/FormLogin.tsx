'use client';

import { createInvoiceLogin } from '../lib/functionsServer';
import ButtonSubmit from '../components/ButtonSubmit';
import ButtonCreateAccount from '../components/ButtonCreateAccount';
import { useFormState } from 'react-dom';
import ModuleEmail from '../components/ModuleEmail';
import ModulePassword from '../components/ModulePassword';
import ButtonResetPassword from '@/app/components/ButtonResetPassword';
import type { Message } from '@/app/lib/interfaces';

export default function FormLogin() {
  const [state, action] = useFormState<Message, FormData>(createInvoiceLogin, { message: '' });

  return (
    <form action={action} id="form-login" className="flex size-full flex-col gap-6">
      <ModuleEmail Button={ButtonCreateAccount} />
      <ModulePassword Button={ButtonResetPassword} />
      <ButtonSubmit state={state.message} type="login" />
    </form>
  );
}
