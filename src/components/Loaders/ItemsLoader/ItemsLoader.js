import ContentLoader from 'react-content-loader';

const ItemsLoader = (props) => {
  const {
    options: { speed, width, height, viewBox },
    children,
    ...itemProps
  } = props;

  return (
    <ContentLoader speed={speed} width={width} height={height} viewBox={viewBox} backgroundColor="#f3f3f3" foregroundColor="#ecebeb" {...itemProps}>
      {children}
    </ContentLoader>
  );
};

export default ItemsLoader;
