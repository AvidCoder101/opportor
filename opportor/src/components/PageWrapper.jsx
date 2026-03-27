import { motion } from "framer-motion";

function PageWrapper({ children }) {
  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {children}
    </motion.div>
  );
}

export default PageWrapper;
