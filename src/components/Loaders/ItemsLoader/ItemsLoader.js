import ContentLoader from 'react-content-loader';

const ItemsLoader = ({ count, options, loader, parentClasses = '' }) => {
  const content = {
    comics: () => (
      <>
        <rect
          x="0"
          y="0"
          rx="0"
          ry="0"
          width="225"
          height="346"
        />
        <rect
          x="0"
          y="356"
          rx="0"
          ry="0"
          width="225"
          height="10"
        />
        <rect
          x="0"
          y="371"
          rx="0"
          ry="0"
          width="33"
          height="10"
        />
      </>
    ),
    chars: () => (
      <rect
        x="0"
        y="0"
        rx="0"
        ry="0"
        width="200"
        height="318"
      />
    ),
  };

  return (
    <ul className={parentClasses}>
      {[...Array(count)].map((_, index) => (
        <Item
          options={options}
          key={index}
        >
          {content[loader]()}
        </Item>
      ))}
    </ul>
  );
};

const Item = (props) => {
  const {
    options: { speed, width, height, viewBox },
    children,
    ...itemProps
  } = props;

  return (
    <ContentLoader
      speed={speed}
      width={width}
      height={height}
      viewBox={viewBox}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...itemProps}
    >
      {children}
    </ContentLoader>
  );
};

export default ItemsLoader;
