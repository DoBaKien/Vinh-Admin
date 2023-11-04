import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import React, { useEffect } from "react";

import { useState } from "react";
import Header from "../../Component/Header";
import Left from "../../Component/Left";
import { TextInputAd } from "../../Component/Style";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProductCreate() {
  const [show, setShow] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loai, setLoai] = useState("");
  const [loais, setLoais] = useState("");
  const [brand, setBrand] = useState("");
  const [brands, setBrands] = useState("");
  const [quantity, setQuantity] = useState("");
  const [checkQ, setCheckQ] = useState(false);
  const [price, setPrice] = useState("");
  const [importPrice, setImportPrice] = useState("");
  const [ncc, setNcc] = useState("");
  const [nccs, setNccs] = useState("");
  const [checkP, setCheckP] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/v1/brands/getAllBrand")
      .then(function (response) {
        setBrands(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get("/api/v1/category/getAll")
      .then(function (response) {
        setLoais(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get("/api/v1/suppliers/getAll")
      .then(function (response) {
        setNccs(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(brand);
    axios
      .post("/api/v1/products/saveOrUpdate", {
        productName: name,
        quantity,
        brand: {
          id: brand,
        },
        description,
        priceImport: importPrice,
        price,
        category: {
          id: loai,
        },
        supplier: {
          id: ncc,
        },
        imageProducts: [
          {
            id: 21,
          },
        ],
      })
      .then(function (response) {
        console.log(response);
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
  const checkPrice = (e, value) => {
    if (e < 0) {
      setCheckP(true);
    } else {
      setCheckP(false);
      if (value === "gia") {
        setPrice(e);
      } else {
        setImportPrice(e);
      }
    }
  };
  const handleChange = (event) => {
    setLoai(event.target.value);
  };
  const handleChange2 = (event) => {
    setBrand(event.target.value);
  };
  const handleChange3 = (event) => {
    setNcc(event.target.value);
  };
  return (
    <Box sx={{ justifyContent: "center", minHeight: "100%" }}>
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
            <Box>
              <form noValidate onSubmit={handleSubmit}>
                <TextInputAd
                  label="Tên sản phẩm"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setName(e.target.value)}
                />
                <Stack
                  direction="row"
                  sx={{
                    gap: 3,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <TextInputAd
                    label="Số lượng"
                    variant="outlined"
                    type="number"
                    error={checkQ}
                    sx={{ width: 300, marginTop: 3 }}
                    onChange={(e) => checkQuantity(e.target.value)}
                  />
                  <FormControl fullWidth sx={{ marginTop: 3 }}>
                    <InputLabel id="demo-simple-select-label">Loại</InputLabel>
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
                  <FormControl fullWidth sx={{ marginTop: 3 }}>
                    <InputLabel id="demo-simple-select-label">Hãng</InputLabel>
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
                <FormControl fullWidth sx={{ marginTop: 3 }}>
                  <InputLabel id="demo-simple-select-label">
                    Nhà cung cấp
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={ncc}
                    label="Age"
                    onChange={handleChange3}
                  >
                    {nccs !== ""
                      ? nccs.map((item, index) => (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                </FormControl>
                <TextInputAd
                  label="Mô tả"
                  rows={3}
                  multiline
                  fullWidth
                  variant="outlined"
                  onChange={(e) => setDescription(e.target.value)}
                />

                <TextInputAd
                  label="Giá"
                  variant="outlined"
                  fullWidth
                  type="number"
                  error={checkP}
                  onChange={(e) => checkPrice(e.target.value)}
                />
                <TextInputAd
                  label="Giá nhập"
                  variant="outlined"
                  fullWidth
                  type="number"
                  error={checkP}
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
                    type="submit"
                    variant="contained"
                    color="error"
                    sx={{ width: 150 }}
                    onClick={() => navigate(-1)}
                  >
                    Hủy
                  </Button>
                  <Button type="submit" variant="contained" sx={{ width: 150 }}>
                    Tạo
                  </Button>
                </Stack>
              </form>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

export default ProductCreate;
