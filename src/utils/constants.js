const colors = {
  red: '#9f0013',
  dark: '#232222',
  grey: '#5c5c5c',
};

const pages = [
  { name: 'ComicsPage', path: 'Comics/ComicsPage/ComicsPage' },
  { name: 'SingleCharLayout', path: 'SinglePageLayout/SingleCharLayout/SingleCharLayout' },
  { name: 'SingleComicLayout', path: 'SinglePageLayout/SingleComicLayout/SingleComicLayout' },
  { name: 'NotFoundPage', path: 'NotFound/NotFoundPage/NotFoundPage' },
  { name: 'SinglePage', path: 'SinglePage/SinglePage' },
  { name: 'HomePage', path: 'Home/HomePage/HomePage' },
];

const liVariants = {
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.2, duration: 0.2, type: 'ease' },
  }),
  hidden: {
    opacity: 0,
    y: 20,
  },
  comicHover: {
    translateY: -5,
    transition: {
      duration: 0.3,
    },
  },
  charHover: {
    boxShadow: `0px 7px 20px 2px ${colors.red}, 0 8px 12px 0px ${colors.red}`,
    scale: 1.1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
  tap: {
    scale: 0.9,
  },
};

const divVariants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: 'easeInOut',
    },
  },
  hidden: {
    opacity: 0,
    y: 20,
  },
};

const pageVariants = {
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  hidden: {
    scale: 0.8,
    opacity: 0,
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

export { liVariants, divVariants, pageVariants, pages };
