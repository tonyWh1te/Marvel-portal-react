import ContentLoader from 'react-content-loader';

export default function Skeleton(props) {
  return (
    <>
      <b className="char-content__select">Please select a character to see information</b>
      <ContentLoader speed={6} width={376} height={191} viewBox="0 0 376 191" backgroundColor="#c4c4c4" foregroundColor="#ecebeb" {...props}>
        <circle cx="20" cy="20" r="20" />
        <rect x="49" y="11" rx="0" ry="0" width="326" height="16" />
        <rect x="0" y="55" rx="0" ry="0" width="375" height="35" />
        <rect x="0" y="105" rx="0" ry="0" width="375" height="35" />
        <rect x="0" y="155" rx="0" ry="0" width="375" height="35" />
      </ContentLoader>
    </>
  );
}
