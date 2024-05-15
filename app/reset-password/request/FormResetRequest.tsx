'use client';

import { createInvoiceResetRequest } from '../../lib/functionsServer';
import ButtonSubmit from '../../components/ButtonSubmit';
import ButtonLogin from '../../components/ButtonLogin';
import { useFormState } from 'react-dom';
import ModuleEmail from '../../components/ModuleEmail';
import type { Message } from '../../lib/interfaces';

export default function FormResetRequest() {
  const [state, action] = useFormState<Message, FormData>(createInvoiceResetRequest, { message: '' });

  if (state.message === 'success') {
    return (
      <div className="mt-[-15px] h-[80px] w-full flex-col items-stretch">
        <p className="w-full items-center justify-center">
          Please check your inbox for an email from <strong>responseserver1@gmail.com</strong> containing a link to
          reset your password. If you do not see the email, please check your spam folder in the next few minutes.
        </p>
      </div>
    );
  } else
    return (
      <form action={action} id="form-login" className="flex size-full flex-col gap-6">
        <ModuleEmail Button={ButtonLogin} />
        <ButtonSubmit state={state.message} type="resetPassword" />
      </form>
    );
}
