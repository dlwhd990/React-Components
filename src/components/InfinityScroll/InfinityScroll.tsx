import { ReactNode, useCallback, useEffect, useState } from "react";
import { callbackify } from "util";
import styles from "./InfinityScroll.module.css";

const InfinityScroll: React.FC<{
  children: ReactNode;
  callback: () => unknown;
}> = ({ children, callback }) => {
  const [isThrottle, setIsThrottle] = useState(false);

  const scrollCallback = useCallback(() => {
    if (isThrottle) return;
    setIsThrottle(true);

    setTimeout(() => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;

      if (scrollTop + clientHeight >= scrollHeight) {
        console.log("BBOOM");
        callback();
      }
      setIsThrottle(false);
    }, 200);
  }, [callback, isThrottle]);

  useEffect(() => {
    window.addEventListener("scroll", scrollCallback);
    return () => window.removeEventListener("scroll", scrollCallback);
  }, [scrollCallback]);

  return <div className={styles.infinity_scroll}>{children}</div>;
};

export default InfinityScroll;
