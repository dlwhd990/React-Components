import { useNavigate } from "react-router-dom";
import styles from "./MainPage.module.css";

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <main className={styles.main}>
      <h1>React Components</h1>
      <button onClick={() => navigate("/carousel")}>👉Carousel</button>
      <button onClick={() => navigate("/daterange")}>👉Daterange</button>
      <button onClick={() => navigate("/infinityscroll")}>
        👉InfinityScroll
      </button>
    </main>
  );
};

export default MainPage;
