import './Modal.scss';

const Modal = ({ active, setActive, children }) => {
  const onClose = () => setActive(false);

  const onClickContent = (e) => e.stopPropagation();

  return (
    <div
      className={`${active ? 'modal modal--active' : 'modal'}`}
      onClick={onClose}
    >
      <div
        className={`${active ? 'modal__content modal__content--active' : 'modal__content'}`}
        onClick={onClickContent}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
