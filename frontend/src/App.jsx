import { Routes, Route, useNavigate } from "react-router-dom";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Sales from "./pages/Sales/Sales";
import ProductPage from "./pages/ProductPage";
import "./index.css";

export default function App() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center flex-col">
      <NavigationBar />
      <Routes>
        <Route path="/sales" element={<Sales />} />
        <Route path="products/:productName" element={<ProductPage />} />
        {/* apostrophes cant be ignored in the backend
        for now the ProductPage URL must contain apostrophes to find "Pinda's" */}
      </Routes>
    </div>
  );
}
