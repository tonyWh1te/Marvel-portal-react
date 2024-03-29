import './Button.scss';

const Button = (props) => {
  const { classes, onClick, href = null, btnProps = { disabled: false, styles: {}, type: 'button' }, children } = props;
  return href ? (
    <a
      className={`button ${classes.join(' ')}`}
      href={href}
    >
      <div className="inner">{children}</div>
    </a>
  ) : (
    <button
      className={`button ${classes.join(' ')}`}
      onClick={onClick}
      disabled={btnProps.disabled}
      style={btnProps.styles}
      type={btnProps.type}
    >
      <div className="inner">{children}</div>
    </button>
  );
};

export default Button;
