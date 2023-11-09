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

function ImportDetail() {
  const [show, setShow] = useState(true);
  const [data, setData] = useState("");
  const [sum, setSum] = useState("");
  const id = useParams();

  useEffect(() => {
    axios
      .get(`/api/v1/importOrders/getById/${id.id}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setSum(
          res.data.importOrderDetail.reduce(
            (acc, item) => acc + item.importPrice * item.quantity,
            0
          )
        ).toFixed(2);
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
      field: "loai",
      headerName: "Loại",
      flex: 0.5,
    },
    {
      field: "brand",
      headerName: "Hãng",
      flex: 0.5,
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
              <Typography variant="subtitle1">Tổng: {sum}</Typography>
              <Typography variant="subtitle1">
                Ngày lập: {ValueDate2(data.date)}
              </Typography>
            </Stack>

            <Grid container sx={{ paddingLeft: 2, paddingRight: 2 }}>
              <Grid item md={6}>
                <Typography variant="body2" color="textSecondary">
                  Thông tin nhân viên
                </Typography>
                <Typography variant="body1">
                  {data.employee.lastName + " " + data.employee.firstName}
                </Typography>
                <Typography variant="body1">{data.employee.email}</Typography>
                <Typography variant="body1">{data.employee.phone}</Typography>
              </Grid>
              <Grid item md={6}>
                <Typography variant="body2" align="right" color="textSecondary">
                  Nhà cung cấp
                </Typography>
                <Typography variant="body1" align="right">
                  {data.supplier.name}
                </Typography>
                <Typography variant="body1" align="right">
                  {data.supplier.email}
                </Typography>
                <Typography align="right" variant="body1">
                  {data.supplier.phone}
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
                rows={data.importOrderDetail.map((item) => ({
                  id: item.id,
                  name: item.product.productName,
                  price: item.importPrice,
                  quantity: item.quantity,
                  brand: item.product.brand.name,
                  loai: item.product.category.categoryName,
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
}

export default ImportDetail;
