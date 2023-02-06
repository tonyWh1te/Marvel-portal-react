import './Button.scss';

export default function Button({ href, children, classes }) {
  return href ? (
    <a className={`button ${classes.join(' ')}`} href={href}>
      <div className="inner">{children}</div>
    </a>
  ) : (
    <button className={`button ${classes.join(' ')}`}>
      <div className="inner">{children}</div>
    </button>
  );
}
