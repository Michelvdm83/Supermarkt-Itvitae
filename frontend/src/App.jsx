import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import ProductPage from "./pages/ProductPage";

function App() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <NavigationBar />
      <Routes>
        <Route path="products/:productName" element={<ProductPage />} />
        {/* apostrophes cant be ignored in the backend
        for now the ProductPage URL must contain apostrophes to find "Pinda's" */}
      </Routes>
    </div>
  );
}

export default App;
