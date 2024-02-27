import styles from './SignInForm.module.css';
import { PiIdentificationCard, PiPassword } from 'react-icons/pi';

const SignInForm = ({ handleSignIn }) => {
  return (
    <form className={styles.form} onSubmit={handleSignIn}>
      <label>
        <PiIdentificationCard />
        <input type="text" name="nickname" placeholder="아이디" />
      </label>
      <label>
        <PiPassword />
        <input type="password" name="password" placeholder="비밀번호(선택)" />
      </label>
      <button>Sign In</button>
    </form>
  );
};

export default SignInForm;
