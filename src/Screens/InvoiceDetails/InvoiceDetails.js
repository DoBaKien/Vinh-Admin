import {
  Box,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";

import { useState } from "react";

import Left from "../../Component/Left";
import Header from "../../Component/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ValueDate2 } from "../../Component/Style";

const InvoiceDetails = () => {
  const [show, setShow] = useState(true);
  const [data, setData] = useState("");
  const [sum, setSum] = useState("");
  const id = useParams();

  useEffect(() => {
    axios
      .get(`/api/v1/orders/getOrderById/${id.id}`)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
        setSum(
          res.data.orderDetails.reduce(
            (acc, item) => acc + item.product.price * item.quantity,
            0
          )
        );
      })
      .catch((error) => console.log(error));
  }, [id.id]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },

    {
      field: "name",
      headerName: "Tên sản phẩm",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Số lượng",
      flex: 0.5,
    },
    {
      field: "price",
      headerName: "Giá",
      flex: 0.5,
    },
  ];
  const checkS = (value) => {
    if (value === "1") {
      return (
        <Typography variant="subtitle1">Trạng thái: Đang xử lý </Typography>
      );
    } else if (value === "2") {
      return (
        <Typography variant="subtitle1">Trạng thái: Đang vận chuyển</Typography>
      );
    } else if (value === "3") {
      return (
        <Typography variant="subtitle1">Trạng thái: Hoàn thành</Typography>
      );
    }
  };

  const checkData = () => {
    if (data !== "") {
      return (
        <Paper sx={{ flex: 1, mx: "auto", width: "95%", p: 1 }}>
          <Stack direction="column" spacing={1} sx={{ height: 1 }}>
            <Typography variant="h6">{`Hóa đơn ${id.id}`}</Typography>
            <Stack direction={"row"} sx={{ gap: 20 }}>
              {checkS(data.statusOrder)}
              <Typography variant="subtitle1">
                Tổng hóa đơn: {sum.toFixed(2)}
              </Typography>
              <Typography variant="subtitle1">
                Ngày lập: {ValueDate2(data.date)}
              </Typography>
            </Stack>

            <Grid container sx={{ paddingLeft: 2, paddingRight: 2 }}>
              <Grid item md={6}>
                <Typography variant="body2" color="textSecondary">
                  Thông tin khách hàng
                </Typography>
                <Typography variant="body1">
                  {data.customer.lastName + " " + data.customer.firstName}
                </Typography>
                <Typography variant="body1">{data.customer.email}</Typography>
                <Typography variant="body1">{data.customer.phone}</Typography>
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="body2" color="textSecondary">
                    Ghi chú
                  </Typography>
                  <Typography>{data.note}</Typography>
                </Box>
              </Grid>
              <Grid item md={6}>
                <Typography variant="body2" align="right" color="textSecondary">
                  Nhân viên
                </Typography>
                <Typography variant="body1" align="right">
                  {data.employee !== "" ? data.employee.id : "Id"}
                </Typography>
                <Typography variant="body1" align="right">
                  {data.employee !== ""
                    ? data.employee.lastName + " " + data.employee.firstName
                    : "Tên"}
                </Typography>
                <Typography align="right" variant="body1">
                  {data.employee !== "" ? data.employee.email : "Email"}
                </Typography>
              </Grid>
            </Grid>
            {data !== "" ? (
              <DataGrid
                localeText={{
                  toolbarColumns: "Cột",
                  toolbarDensity: "Khoảng cách",
                  toolbarFilters: "Lọc",
                  toolbarExport: "Xuất ",
                }}
                rows={data.orderDetails.map((item) => ({
                  id: item.id,
                  name: item.product.productName,
                  price: item.product.price,
                  quantity: item.quantity,
                }))}
                columns={columns}
                sx={{ flex: 1 }}
                hideFooter
              />
            ) : (
              <></>
            )}
          </Stack>
        </Paper>
      );
    } else {
      return (
        <Box
          sx={{
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      );
    }
  };

  return (
    <Box sx={{ justifyContent: "center", minHeight: "100%", height: "100%" }}>
      <Stack direction="row">
        {show && <Left />}
        <Box sx={{ width: "100%" }}>
          <Header setShow={setShow} show={show} />
          {checkData()}
        </Box>
      </Stack>
    </Box>
  );
};

export default InvoiceDetails;
