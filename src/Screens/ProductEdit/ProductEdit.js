import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";

import { useState } from "react";
import Header from "../../Component/Header";
import Left from "../../Component/Left";
import { TextInputAd } from "../../Component/Style";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { v4 as uuidv4 } from "uuid";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
function ProductEdit() {
  const [show, setShow] = useState(true);
  const [imageP, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loai, setLoai] = useState("");
  const [loais, setLoais] = useState("");
  const [brand, setBrand] = useState("");
  const [brands, setBrands] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const [checkQ, setCheckQ] = useState(false);

  const [arr, setArr] = useState([
    { id: uuidv4(), specificationName: "", specificationValue: "" },
  ]);
  const id = useParams();
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
      .get(`/api/v1/products/getById/${id.id}`)
      .then(function (response) {
        setImage(response.data.imageProducts);
        setName(response.data.productName);
        setQuantity(response.data.quantity);
        setBrand(response.data.brand.id);
        setDescription(response.data.description);
        setPrice(response.data.price);
        setLoai(response.data.category.id);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/v1/products/saveOrUpdate", {
        id: id.id,
        productName: name,
        quantity,
        brand: {
          id: brand,
        },
        description,
        price,
        category: {
          id: loai,
        },
        specifications: arr.map((item) => ({
          specificationValue: item.specificationValue,
          specificationName: item.specificationName,
        })),
      })
      .then(function () {
        Swal.fire({
          title: "Thành công",
          icon: "success",
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    // Xử lý tệp đã chọn ở đây
    console.log("Đã chọn tệp:", selectedFile);
  };

  const checkQuantity = (e) => {
    if (e < 0) {
      setCheckQ(true);
    } else {
      setCheckQ(false);
      setQuantity(e);
    }
  };
  const handleChange = (event) => {
    setLoai(event.target.value);
  };
  const handleChange2 = (event) => {
    setBrand(event.target.value);
  };

  const handleAdd = (e) => {
    setArr([...arr, { id: uuidv4(), title: e, content: "" }]);
  };
  function handleInputChange(event, index, key) {
    const updatedUsers = [...arr];
    updatedUsers[index][key] = event;
    setArr(updatedUsers);
  }

  function deleteUser(id) {
    const newPost = arr.filter((user) => user.id !== id);
    setArr(newPost);
  }

  const Arrttkt = (id, i) => {
    return (
      <Stack direction={"row"} gap={2}>
        <TextInputAd
          label="Tên sản phẩm"
          variant="outlined"
          sx={{ width: 250 }}
          multiline
          // value={language || ""}
          rows={2}
          onChange={(e) =>
            handleInputChange(e.target.value, i, "specificationName")
          }
        />
        <TextInputAd
          label="Tên sản phẩm"
          variant="outlined"
          fullWidth
          multiline
          // value={language || ""}
          rows={2}
          onChange={(e) =>
            handleInputChange(e.target.value, i, "specificationValue")
          }
        />
        {arr.length !== 1 ? (
          <Box sx={{ alignItems: "center", display: "flex", marginTop: 2 }}>
            <IconButton sx={{ height: 50 }} onClick={() => deleteUser(id)}>
              <RemoveCircleIcon fontSize="large" color="primary" />
            </IconButton>
          </Box>
        ) : null}
      </Stack>
    );
  };
  return (
    <Box sx={{ justifyContent: "center", minHeight: "100%" }}>
      <Stack direction="row">
        {show && <Left />}
        <Box sx={{ width: "100%", minWidth: "70%" }}>
          <Header setShow={setShow} show={show} />
          <Stack
            direction={"row"}
            gap={2}
            sx={{
              paddingLeft: 2,
              paddingRight: 2,
            }}
          >
            <Box
              sx={{
                flex: 1,
                border: "1px solid black",
                borderRadius: 10,
                padding: 2,
              }}
            >
              <Typography variant="h4">Thông tin sản phẩm #{id.id}</Typography>
              <form noValidate onSubmit={handleSubmit}>
                <Stack direction={"row"} gap={2}>
                  <Stack
                    direction={"row"}
                    gap={1}
                    sx={{ overflow: "auto", width: "60%" }}
                  >
                    {imageP !== ""
                      ? imageP.map((item) => (
                          <Card key={item.id} sx={{ width: 200 }}>
                            <CardActionArea
                              onClick={() =>
                                window.open(item.imageLink, "_blank")
                              }
                            >
                              <CardMedia
                                sx={{ height: 200, width: 200 }}
                                image={item.imageLink}
                                title="product image"
                              />
                            </CardActionArea>
                          </Card>
                        ))
                      : null}
                  </Stack>
                  <Card sx={{ width: 200 }}>
                    <Box
                      sx={{
                        height: 200,
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#DDDDDD",
                      }}
                    >
                      <IconButton aria-label="upload picture" component="label">
                        <input
                          hidden
                          accept="image/*"
                          type="file"
                          onChange={handleFileSelect}
                        />
                        <AddCircleIcon sx={{ fontSize: 80 }} />
                      </IconButton>
                    </Box>
                  </Card>
                </Stack>
                <TextInputAd
                  label="Tên sản phẩm"
                  variant="outlined"
                  fullWidth
                  value={name}
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
                    // disabled
                    type="number"
                    value={quantity}
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
                <TextInputAd
                  label="Mô tả"
                  rows={3}
                  multiline
                  value={description || ""}
                  fullWidth
                  variant="outlined"
                  onChange={(e) => setDescription(e.target.value)}
                />

                <TextInputAd
                  label="Giá"
                  variant="outlined"
                  fullWidth
                  value={price || ""}
                  onChange={(e) => setPrice(e.target.value)}
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
                    onClick={() => navigate(-1)}
                  >
                    Hủy
                  </Button>
                  <Button type="submit" variant="contained" sx={{ width: 150 }}>
                    Sửa
                  </Button>
                </Stack>
              </form>
            </Box>
            <Box
              sx={{
                flex: 1,
                border: "1px solid black",
                borderRadius: 10,
                padding: 2,
              }}
            >
              <Typography variant="h4">Thông số kỹ thuật #{id.id}</Typography>
              <IconButton sx={{ height: 50 }} onClick={handleAdd}>
                <AddCircleIcon fontSize="large" color="primary" />
              </IconButton>
              <Box sx={{ overflow: "auto", height: "60vh" }}>
                {arr.map((data, i) => {
                  return <Box key={i}>{Arrttkt(data.id, i, data.content)}</Box>;
                })}
              </Box>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default ProductEdit;
