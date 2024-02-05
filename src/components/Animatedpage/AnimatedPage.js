import { m } from 'framer-motion';
import { pageVariants } from '../../utils/constants';

const AnimatedPage = ({ children }) => {
  return (
    <m.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </m.div>
  );
};

export default AnimatedPage;
