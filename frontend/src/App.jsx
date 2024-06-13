import { Routes, Route, useNavigate } from "react-router-dom";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Sales from "./pages/Sales/Sales";
import "./index.css";

export default function App() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center flex-col">
      <NavigationBar />
      <Routes>
        <Route path="/sales" element={<Sales />} />
      </Routes>
    </div>
  );
}
