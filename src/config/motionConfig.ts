import { easeInOut, easeOut } from "framer-motion";

export const motionVariant = {
  hidden: {
    opacity: 0,
    y: 50,
    transition: { duration: 0.5, ease: easeOut },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeInOut },
  },
};
