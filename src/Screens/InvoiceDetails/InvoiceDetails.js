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
  const id = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8521/api/v1/orders/getOrderById/${id.id}`)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
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

  const checkData = () => {
    if (data !== "") {
      return (
        <Paper sx={{ flex: 1, mx: "auto", width: "95%", p: 1 }}>
          <Stack direction="column" spacing={1} sx={{ height: 1 }}>
            <Typography variant="h6">{`Hóa đơn ${id.id}`}</Typography>
            <Stack direction={"row"} sx={{ gap: 20 }}>
              <Typography variant="subtitle1">{`Trạng thái: ${data.statusOrder}`}</Typography>
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
                  {data.customer.firstName + " " + data.customer.lastName}
                </Typography>
                <Typography variant="body1">{data.customer.email}</Typography>

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
                  Tên
                </Typography>
                <Typography variant="body1" align="right">
                  Thông tin
                </Typography>
              </Grid>
            </Grid>
            {data !== "" ? (
              <DataGrid
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
