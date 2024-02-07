import { spinnerBtn } from '../../../assets';

const SpinnerBtn = () => {
  return (
    <img
      style={{ animation: 'rotation 1s infinite linear' }}
      src={spinnerBtn}
      alt="spinner"
    />
  );
};

export default SpinnerBtn;
