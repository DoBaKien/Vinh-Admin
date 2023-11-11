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
import ThongSoKyThuat from "../../Component/TsoKyThuat";

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
  const [categoryName, setCategoryName] = useState("");
  const [data, setData] = useState("");
  const [checkQ, setCheckQ] = useState(false);

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
        console.log(response.data.specifications);
        setImage(response.data.imageProducts);
        setName(response.data.productName);
        setQuantity(response.data.quantity);
        setBrand(response.data.brand.id);
        setCategoryName(response.data.category.categoryName);
        setDescription(response.data.description);
        setPrice(response.data.price);
        setLoai(response.data.category.id);
        if (response.data.specifications.length > 0) {
          setData(response.data.specifications);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
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
        specifications: data.map((item) => ({
          specificationValue: item.value,
          specificationName: item.name,
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
                width: "100%",
              }}
            >
              <Typography variant="h4">Thông tin sản phẩm #{id.id}</Typography>
              <form noValidate onSubmit={handleSubmit}>
                <Stack direction={"row"} gap={1}>
                  <Stack direction={"row"} sx={{ overflow: "auto" }} gap={1}>
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

              <ThongSoKyThuat
                categoryName={categoryName}
                setData={setData}
                data={data}
              />
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default ProductEdit;
