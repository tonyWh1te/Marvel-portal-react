import ContentLoader from 'react-content-loader';

const CharListLoader = (props) => (
  <ContentLoader speed={4} width={200} height={318} viewBox="0 0 200 318" backgroundColor="#f3f3f3" foregroundColor="#ecebeb" {...props}>
    <rect x="0" y="0" rx="0" ry="0" width="200" height="318" />
  </ContentLoader>
);

export default CharListLoader;
