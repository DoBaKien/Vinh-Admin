import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Paper,
  Select,
  Stack,
  Typography,
  MenuItem,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import Header from "../../Component/Header";
import Left from "../../Component/Left";
import { v4 as uuidv4 } from "uuid";
import { TextInputAd } from "../../Component/Style";
import ModalNcc from "./ModalNcc";
import Table from "./Table";
import axios from "axios";
import TableProduct from "./TableProduct";
import Swal from "sweetalert2";

const ImportOrder = () => {
  const [show, setShow] = useState(true);
  const [checkQ, setCheckQ] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState("");
  const [ncc, setNcc] = useState("");
  const [nccD, setNccD] = useState("");
  const [products, setProducts] = useState("");
  const [priceImport, setPriceImport] = useState("");
  const [checkP, setCheckP] = useState(false);
  const [loai, setLoai] = useState("");
  const [loais, setLoais] = useState("");
  const [brand, setBrand] = useState("");
  const [brands, setBrands] = useState("");
  const [productId, setProductId] = useState("");
  const userId = localStorage.getItem("id");
  useEffect(() => {
    axios
      .get("/api/v1/category/getAll")
      .then(function (response) {
        setLoais(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get("/api/v1/brands/getAllBrand")
      .then(function (response) {
        setBrands(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();

    const importOrderDetail = products.map((item) => {
      if (item.id.length > 30) {
        return {
          quantity: item.quantity,
          importPrice: item.importPrice,
          product: {
            productName: item.name,
            category: {
              id: item.loai,
            },
            quantity: item.quantity,
            brand: {
              id: item.hang,
            },
          },
        };
      } else {
        return {
          quantity: item.quantity,
          importPrice: item.importPrice,
          product: {
            id: item.id,
            category: {
              id: item.loai,
            },
            quantity: item.quantity,
            brand: {
              id: item.hang,
            },
          },
        };
      }
    });

    axios
      .post(`/api/v1/importOrders/saveOrUpdate`, {
        supplier: {
          id: nccD.id,
        },
        employee: {
          id: userId,
        },
        importOrderDetail: importOrderDetail,
      })
      .then(function (response) {
        console.log(response.data);
        Swal.fire({
          title: "Thành công",
          icon: "success",
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleFind = () => {
    if (ncc !== "") {
      axios
        .get(`/api/v1/suppliers/getByEmailOrPhone/${ncc}`)
        .then(function (response) {
          if (response.data !== `${ncc} not found!!`) {
            setNccD(response.data);
            console.log(response.data);
          } else {
            setOpen(!open);
            setNccD("");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      Swal.fire({
        title: "Vui lòng nhập thông tin",
        icon: "error",
      });
    }
  };

  const checkQuantity = (e) => {
    if (e < 0) {
      setCheckQ(true);
    } else {
      setCheckQ(false);
      setQuantity(e);
    }
  };

  const checkPrice = (e) => {
    if (e < 0) {
      setCheckP(true);
    } else {
      setCheckP(false);
      setPriceImport(e);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setProducts((prev) => {
      const newJob = [
        ...prev,
        {
          id: productId || uuidv4(),
          name: product,
          quantity: quantity,
          importPrice: priceImport,
          loai: loai,
          hang: brand,
        },
      ];
      return newJob;
    });
    setProductId("");
    setProduct("");
    setQuantity("");
    setPriceImport("");
  };
  const handleChange = (event) => {
    setLoai(event.target.value);
  };
  const handleChange2 = (event) => {
    setBrand(event.target.value);
  };

  return (
    <Box sx={{ justifyContent: "center", backgroundColor: "#F0F2F5" }}>
      <ModalNcc setModal={setOpen} modal={open} />
      <Stack direction="row">
        {show && <Left />}
        <Box sx={{ width: "100%", minWidth: "70%" }}>
          <Header setShow={setShow} show={show} text="Thêm phiếu nhập" />
          <Box
            sx={{
              paddingLeft: 2,
              paddingRight: 2,
              paddingTop: 1,
            }}
          >
            <Stack direction={"row"} spacing={5}>
              <Box
                sx={{
                  flex: 1,
                  backgroundColor: "white",
                  padding: "20px 20px 0 20px",
                  border: "1px solid black",
                  borderRadius: 5,
                }}
              >
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
                      sx={{ width: 120, height: 40 }}
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

                  <Table products={products} setProducts={setProducts} />

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
                    padding: 2,
                    border: "1px solid black",
                    borderRadius: 5,
                  }}
                >
                  <form noValidate onSubmit={handleAdd}>
                    <TextInputAd
                      label="Tên sản phẩm"
                      variant="outlined"
                      fullWidth
                      value={product}
                      size="small"
                      onChange={(e) => setProduct(e.target.value)}
                    />
                    <Stack direction={"row"} gap={2} sx={{ marginTop: 2 }}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">
                          Loại
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={loai}
                          label="Age"
                          onChange={handleChange}
                        >
                          {loais !== ""
                            ? loais.map((item, index) => (
                                <MenuItem key={index} value={item.id}>
                                  {item.categoryName}
                                </MenuItem>
                              ))
                            : null}
                        </Select>
                      </FormControl>
                      <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">
                          Hãng
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={brand}
                          label="Age"
                          onChange={handleChange2}
                        >
                          {brands !== ""
                            ? brands.map((item, index) => (
                                <MenuItem key={index} value={item.id}>
                                  {item.name}
                                </MenuItem>
                              ))
                            : null}
                        </Select>
                      </FormControl>
                    </Stack>
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
                      onChange={(e) => checkPrice(e.target.value)}
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
                <Box sx={{ marginTop: 2 }}>
                  <TableProduct
                    setBrand={setBrand}
                    setPriceImport={setPriceImport}
                    setProduct={setProduct}
                    setLoai={setLoai}
                    setProductId={setProductId}
                  />
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
