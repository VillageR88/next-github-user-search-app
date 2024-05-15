'use client';

import { createInvoiceReset } from '../../../lib/functionsServer';
import ButtonSubmit from '../../../components/ButtonSubmit';
import { useFormState } from 'react-dom';
import ModulePassword from '../../../components/ModulePassword';
import ModulePasswordConfirm from '@/app/components/ModulePasswordConfirm';
import type { Message } from '../../../lib/interfaces';

export default function FormReset() {
  let token: string;
  if (typeof window !== 'undefined') {
    token = window.location.pathname.split('/')[3];
  }

  const [state, action] = useFormState<Message, FormData>(
    (state, payload) => createInvoiceReset(state, payload, token),
    {
      message: '',
    },
  );

  return (
    <form action={action} id="form-login" className="flex size-full flex-col gap-6">
      <ModulePassword newPassword />
      <ModulePasswordConfirm />
      <ButtonSubmit state={state.message} type="resetPassword" />
    </form>
  );
}
