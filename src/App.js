import { Route, Routes } from "react-router-dom";
import DashBoard from "./Screens/DashBoard/DashBoard";
import Product from "./Screens/Product/Product";
import ImportOrder from "./Screens/ImportOrder/ImportOrder";
import ImportOrderData from "./Screens/ImportData/ImportData";
import CheckOut from "./Screens/CheckOut/CheckOut";
import Login from "./Screens/Login/Login";
import InvoiceDetails from "./Screens/InvoiceDetails/InvoiceDetails";
import CreateBill from "./Screens/CreateBill/CreateBill";

import ProductEdit from "./Screens/ProductEdit/ProductEdit";
import ImportExcel from "./Screens/ImportExcel/ImportExcel";
import ImportDetail from "./Screens/ImportDetail/ImportDetail";

function Router() {
  return (
    <Routes basename="/DoAnTotNghiep">
      <Route path="/DashBoard" element={<DashBoard />} />
      <Route path="/Product" element={<Product />} />
      <Route path="/ImportOrder" element={<ImportOrder />} />
      <Route path="/ImportOrderData" element={<ImportOrderData />} />
      <Route path="/ImportOrderData/:id" element={<ImportDetail />} />
      <Route path="/CheckOut" element={<CheckOut />} />
      <Route path="/CheckOut/:id" element={<InvoiceDetails />} />
      <Route path="/CreateBill" element={<CreateBill />} />

      <Route path="/ImportExcel" element={<ImportExcel />} />
      <Route path="/ProductEdit/:id" element={<ProductEdit />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default Router;
