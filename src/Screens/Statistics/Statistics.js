import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Header from "../../Component/Header";

import React, { useEffect, useState } from "react";

import Left from "../../Component/Left";
import axios from "axios";

function CheckOut() {
  const [show, setShow] = useState(true);
  const [dataIm, setDataIm] = useState("");
  const [dataSale, setDataSale] = useState("");
  const [monthI, setMonthI] = useState(new Date().getMonth() + 1);
  const [monthS, setMonthS] = useState(new Date().getMonth() + 1);
  const [yearI, setYearI] = useState(new Date().getFullYear());
  const [yearS, setYearS] = useState(new Date().getFullYear());

  const handleMonthI = (e, loai) => {
    if (loai === "nhập") {
      setMonthI(e.target.value);
    } else {
      setMonthS(e.target.value);
    }
  };
  const handleYeaI = (e, loai) => {
    if (loai === "nhập") {
      setYearI(e.target.value);
    } else {
      setYearS(e.target.value);
    }
  };

  useEffect(() => {
    axios
      .get(
        `/api/v1/shoppingCarts/thong_ke_product_import_by_month/${
          monthI + "-" + yearI
        }`
      )
      .then((res) => {
        setDataIm(res.data);
      })
      .catch((error) => {
        if (error.response.data === "not found!!") {
          setDataIm("sd");
        }
      });
    axios
      .get(
        `/api/v1/shoppingCarts/thong_ke_product_sale_by_moth/${
          monthS + "-" + yearS
        }`
      )
      .then((res) => {
        setDataSale(res.data);
      })
      .catch((error) => {
        if (error.response.data === "not found!!") {
          setDataSale("sd");
        }
      });
  }, [monthI, yearI, monthS, yearS]);

  const dataImport = (data, loai, mon, yea) => {
    if (data !== "") {
      return (
        <Box sx={{ backgroundColor: "white", padding: 2 }}>
          <Stack direction={"row"} gap={5}>
            <FormControl fullWidth sx={{ backgroundColor: "white" }}>
              <InputLabel id="demo-simple-select-label">Tháng</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={mon}
                label="Age"
                onChange={(e) => handleMonthI(e, loai)}
              >
                {Array.from(Array(12)).map((_, i) => (
                  <MenuItem key={i} value={i + 1}>
                    {i + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ backgroundColor: "white" }}>
              <InputLabel id="demo-simple-select-label">Năm</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={yea}
                label="Age"
                onChange={(e) => handleYeaI(e, loai)}
              >
                {Array.from(Array(5)).map((_, i) => (
                  <MenuItem key={i} value={2023 - i}>
                    {2023 - i}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <TableContainer
            component={Paper}
            sx={{ marginTop: 2, border: "1px solid black", borderRadius: 5 }}
          >
            <Table sx={{ minWidth: 500 }} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={3}>
                    Danh sách hàng {loai} vào tháng 12 - 2023
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left" colSpan={2}>
                    Loại
                  </TableCell>
                  <TableCell align="right">Số lượng </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data !== "sd" ? (
                  data.productTKS.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>{row.type}</TableCell>
                      <TableCell colSpan={1} />
                      <TableCell align="right">{row.sl}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      Không có dữ liệu
                    </TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell colSpan={1} />
                  <TableCell>Tổng</TableCell>
                  <TableCell align="right">{data?.tongSP}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      );
    } else {
      return <CircularProgress />;
    }
  };

  return (
    <Box sx={{ justifyContent: "center" }}>
      <Stack direction="row">
        {show && <Left />}
        <Box sx={{ width: "100%", minWidth: "70%" }}>
          <Header show={show} setShow={setShow} />
          <Box
            bgcolor={"#E3EFFD"}
            sx={{
              height: "91vh",
              paddingLeft: 2,
              paddingRight: 2,
            }}
          >
            <Box sx={{ padding: "5px 5px 5px" }}>
              <Typography variant="h4">Thống kê dữ liệu</Typography>
            </Box>
            <Stack
              direction={"row"}
              sx={{ justifyContent: "space-between" }}
            ></Stack>
            <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
              {dataImport(dataIm, "nhập", monthI, yearI)}
              {dataImport(dataSale, "bán", monthS, yearS)}
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

export default CheckOut;
