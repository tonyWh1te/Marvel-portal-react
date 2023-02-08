import spinner from './spinner.gif';

export default function Spinner() {
  return (
    <img src={spinner} alt="spinner" style={{ display: 'block', margin: '0 auto', alignSelf: 'center', objectFit: 'contain', minHeight: '180px' }} />
  );
}
