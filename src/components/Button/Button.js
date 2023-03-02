import './Button.scss';

const Button = ({ href, children, classes, onClick }) => {
  return href ? (
    <a className={`button ${classes.join(' ')}`} href={href}>
      <div className="inner">{children}</div>
    </a>
  ) : (
    <button className={`button ${classes.join(' ')}`} onClick={onClick}>
      <div className="inner">{children}</div>
    </button>
  );
};

export default Button;
