import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import Header from "../../Component/Header";
import Left from "../../Component/Left";

import { TextInputAd } from "../../Component/Style";
import ModalNcc from "./ModalNcc";
import Table from "./Table";
import axios from "axios";
import TableProduct from "./TableProduct";

const ImportOrder = () => {
  const [show, setShow] = useState(true);
  const [idP, setP] = useState("");
  const [checkQ, setCheckQ] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState("");
  const [ncc, setNcc] = useState("");
  const [nccD, setNccD] = useState("");
  const [products, setProducts] = useState("");
  const [price, setPrice] = useState("");
  const [priceImport, setPriceImport] = useState("");
  const [checkP, setCheckP] = useState(false);
  console.log(products);
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`/api/v1/importOrders/saveOrUpdate`, {
        supplier: {
          id: 1,
        },
        employee: {
          id: "NV7545",
        },
        importOrderDetail: products.map((item) => ({
          quantity: item.quantity,
          product: {
            id: item.id,
            productName: item.name,
          },
        })),
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleFind = () => {
    axios
      .get(`/api/v1/suppliers/getByEmailOrPhone/${ncc}`)
      .then(function (response) {
        console.log(response.data);
        if (response.data !== `${ncc} not found!!`) {
          setNccD(response.data);
        } else {
          setOpen(!open);
          setNccD("");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const checkQuantity = (e) => {
    if (e < 0) {
      setCheckQ(true);
    } else {
      setCheckQ(false);
      setQuantity(e);
    }
  };

  const checkPrice = (e, v) => {
    if (e < 0) {
      setCheckP(true);
    } else {
      setCheckP(false);
      if (v === "gia") {
        setPrice(e);
      } else {
        setPriceImport(e);
      }
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setProducts((prev) => {
      const newJob = [...prev, { id: idP, name: product, quantity: quantity }];
      return newJob;
    });

    setProduct("");
    setQuantity("");
    setPrice("");
    setPriceImport("");
  };

  return (
    <Box sx={{ justifyContent: "center" }}>
      <ModalNcc setModal={setOpen} modal={open} />
      <Stack direction="row">
        {show && <Left />}
        <Box sx={{ width: "100%", minWidth: "70%" }}>
          <Header setShow={setShow} show={show} />
          <Box
            sx={{
              paddingLeft: 2,
              paddingRight: 2,
            }}
          >
            <Stack direction={"row"} spacing={10}>
              <Box sx={{ flex: 1 }}>
                <form noValidate onSubmit={handleSubmit}>
                  <Stack
                    direction={"row"}
                    spacing={5}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <TextInputAd
                      label="Nhà cung cấp"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={ncc}
                      onChange={(e) => setNcc(e.target.value)}
                    />
                    <Button
                      variant="contained"
                      sx={{ width: 120, height: 50 }}
                      onClick={handleFind}
                    >
                      Tìm
                    </Button>
                  </Stack>
                  {nccD !== "" ? (
                    <Stack sx={{ marginTop: 2, gap: 1 }}>
                      <Typography variant="body1">Tên: {nccD.name}</Typography>
                      <Stack direction="row" gap={5}>
                        <Typography variant="body1">
                          Email: {nccD.email}
                        </Typography>
                        <Typography variant="body1">
                          SDT: {nccD.phone}
                        </Typography>
                      </Stack>
                      <Typography>Địa chỉ: {nccD.address}</Typography>
                    </Stack>
                  ) : (
                    <></>
                  )}
                  {products !== "" ? (
                    <Table products={products} setProducts={setProducts} />
                  ) : (
                    <></>
                  )}
                  <Stack
                    direction="row"
                    spacing={10}
                    style={{
                      justifyContent: "center",
                      textAlign: "center",
                      marginTop: 20,
                    }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ width: 150 }}
                    >
                      Tạo
                    </Button>
                  </Stack>
                </form>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Paper
                  sx={{
                    padding: "10px 10px 10px",
                    borderTop: "1px solid black",
                  }}
                >
                  <form noValidate onSubmit={handleAdd}>
                    <TextField
                      label="ID"
                      variant="outlined"
                      fullWidth
                      value={idP}
                      size="small"
                      onChange={(e) => setP(e.target.value)}
                    />
                    <TextInputAd
                      label="Tên sản phẩm"
                      variant="outlined"
                      fullWidth
                      value={product}
                      size="small"
                      onChange={(e) => setProduct(e.target.value)}
                    />

                    <TextInputAd
                      label="Số lượng"
                      variant="outlined"
                      type="number"
                      error={checkQ}
                      value={quantity}
                      fullWidth
                      size="small"
                      onChange={(e) => checkQuantity(e.target.value)}
                    />

                    <TextInputAd
                      label="Giá nhập"
                      variant="outlined"
                      fullWidth
                      error={checkP}
                      type="number"
                      value={priceImport}
                      size="small"
                      onChange={(e) => checkPrice(e.target.value, "giaNhap")}
                    />

                    <Stack
                      direction="row"
                      spacing={10}
                      style={{
                        justifyContent: "center",
                        textAlign: "center",
                        marginTop: 20,
                      }}
                    >
                      <Button
                        variant="contained"
                        color="error"
                        sx={{ width: 150 }}
                      >
                        Xóa trắng
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{ width: 150 }}
                      >
                        Thêm
                      </Button>
                    </Stack>
                  </form>
                </Paper>
                <Box sx={{ marginTop: 5 }}>
                  <TableProduct />
                </Box>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default ImportOrder;
