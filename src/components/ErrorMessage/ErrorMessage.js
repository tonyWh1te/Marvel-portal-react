import error from './error.gif';

export default function ErrorMessage() {
  return (
    <img
      src={error}
      alt="error"
      style={{ maxWidth: '250px', maxHeight: '250px', objectFit: 'contain', display: 'block', margin: '0 auto', alignSelf: 'center' }}
    />
  );
}
