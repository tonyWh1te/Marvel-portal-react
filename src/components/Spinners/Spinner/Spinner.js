import { spinner } from '../../../assets';

const Spinner = () => {
  return (
    <img
      src={spinner}
      alt="spinner"
      style={{ display: 'block', margin: '0 auto', alignSelf: 'center', objectFit: 'contain', minHeight: '180px' }}
    />
  );
};

export default Spinner;
