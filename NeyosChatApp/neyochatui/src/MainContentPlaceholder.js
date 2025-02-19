import { motion } from "framer-motion";
import { Placeholder, Card } from "react-bootstrap";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.5 } },
};

const MainContentPlaceholder = ({ sidebarWidth }) => {
  return (
    <motion.div
      className="main-content"
      style={{ marginLeft: sidebarWidth }}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="lobby">
        <Card style={{ width: "100%", flexGrow: "1", display: "flex", padding: "1rem", background: "white" }}>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="wave">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
        </Card>
      </div>
    </motion.div>
  );
};

export default MainContentPlaceholder;
