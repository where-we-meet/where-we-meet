import { useDispatch, useSelector } from 'react-redux';
import style from './CenterFlagButton.module.css';
import { FaFlag } from 'react-icons/fa';
import { setViewPoint } from '@/redux/modules/mapSlice';

function CenterFlagButton() {
  const dispatch = useDispatch();
  const center = useSelector((state) => state.mapSlice.centerPoint);

  const moveViewPointToCenter = () => {
    dispatch(setViewPoint(center));
  };
  return (
    <button className={style.button} onClick={moveViewPointToCenter}>
      <FaFlag className={style.button_icon} />
      <p className={style.button_text}>중간 지점으로 이동</p>
    </button>
  );
}

export default CenterFlagButton;
