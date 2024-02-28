import styles from './SignInForm.module.css';
import { PiIdentificationCard, PiPassword } from 'react-icons/pi';
import { RiLoginBoxLine } from "react-icons/ri";

const SignInForm = ({ handleSignIn }) => {
  return (
    <form className={styles.form} onSubmit={handleSignIn}>
      <label>
        <PiIdentificationCard />
        <input type="text" name="nickname" placeholder="아이디" required />
      </label>
      <label>
        <PiPassword />
        <input type="password" name="password" placeholder="비밀번호(선택)" />
      </label>
      <button>
        <RiLoginBoxLine />
        로그인</button>
    </form>
  );
};

export default SignInForm;
