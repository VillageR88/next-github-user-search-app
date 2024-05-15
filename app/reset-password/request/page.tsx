import FormResetRequest from './FormResetRequest';
import LayoutAccount from '../../components/LayoutAccount';

export default function Login() {
  return (
    <LayoutAccount title="Reset Password">
      <FormResetRequest />
    </LayoutAccount>
  );
}
