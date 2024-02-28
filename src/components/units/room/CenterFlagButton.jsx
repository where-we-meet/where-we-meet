import style from './CenterFlagButton.module.css';
import { FaFlag } from 'react-icons/fa';

function CenterFlagButton() {
  return (
    <button className={style.button}>
      <FaFlag className={style.button_icon} />
      <p className={style.button_text}>중간 지점으로 이동</p>
    </button>
  );
}

export default CenterFlagButton;
