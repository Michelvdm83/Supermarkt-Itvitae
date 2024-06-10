import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import ProductPage from "./pages/ProductPage";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <div className="container">
        <NavigationBar />
      </div>
      <Routes>
        <Route path="products/:productName" element={<ProductPage />} />
      </Routes>
    </>
  );
}

export default App;
