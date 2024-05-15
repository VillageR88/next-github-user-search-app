'use client';
import { createInvoiceCreateEmail } from '../lib/functionsServer';
import ButtonSubmit from '../components/ButtonSubmit';
import { useFormState } from 'react-dom';
import ModuleEmail from '../components/ModuleEmail';
import ModulePassword from '../components/ModulePassword';
import ModulePasswordConfirm from '../components/ModulePasswordConfirm';
import ButtonLogin from '../components/ButtonLogin';
import type { Message } from '../lib/interfaces';

export default function FormCreateAccount() {
  const [state, action] = useFormState<Message, FormData>(createInvoiceCreateEmail, { message: '' });
  return (
    <form action={action} id="form-createAccount" className="flex size-full flex-col gap-6">
      <ModuleEmail Button={ButtonLogin} />
      <ModulePassword />
      <ModulePasswordConfirm />
      <ButtonSubmit state={state.message} type="createAccount" />
    </form>
  );
}
