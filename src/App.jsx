import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
