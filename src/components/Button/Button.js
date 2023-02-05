import './Button.scss';

export default function Button({ isLink, children, classes }) {
  return isLink ? (
    <a className={`button ${classes.join(' ')}`} href="#">
      <div className="inner">{children}</div>
    </a>
  ) : (
    <button className={`button ${classes.join(' ')}`}>
      <div className="inner">{children}</div>
    </button>
  );
}
