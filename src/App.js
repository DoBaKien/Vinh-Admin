import { Route, Routes } from "react-router-dom";
import DashBoard from "./Screens/DashBoard/DashBoard";
import Product from "./Screens/Product/Product";
import ImportOrder from "./Screens/ImportOrder/ImportOrder";
import ImportOrderData from "./Screens/ImportData/ImportData";
import CheckOut from "./Screens/CheckOut/CheckOut";
import Login from "./Screens/Login/Login";

function Router() {
  return (
    <Routes basename="/DoAnTotNghiep">
      <Route path="/DashBoard" element={<DashBoard />} />
      <Route path="/Product" element={<Product />} />
      <Route path="/ImportOrder" element={<ImportOrder />} />
      <Route path="/ImportOrderData" element={<ImportOrderData />} />
      <Route path="/CheckOut" element={<CheckOut />} />

      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default Router;
