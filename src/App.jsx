import { Outlet } from "react-router-dom";
import styles from "./App.module.css";

function App() {
  return (
    <>
      <nav>Navbar</nav>
      <Outlet />
    </>
  );
}

export default App;
