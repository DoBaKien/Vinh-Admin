import { Box, Modal, Stack, Typography } from "@mui/material";
import { styleProduct } from "../../Component/Style";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

function ModalProduct({ setModal, modal, value }) {
  const [data, setData] = useState("");
  const toggleModal = () => {
    setModal(false);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8521/api/v1/products/getById/${value}`)
      .then(function (response) {
        setData(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [value]);

  return (
    <Modal
      open={modal}
      onClose={toggleModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleProduct}>
        <Stack direction={"row"}>
          <Box sx={{ width: 500 }}>
            {data.imageProducts?.map((item) => (
              <Box
                key={item.id}
                component="img"
                onClick={() => window.open(item.imageLink, "_blank")}
                sx={{
                  height: 200,
                  cursor: "pointer",
                }}
                alt="logo"
                src={item.imageLink}
              />
            ))}
            <Typography variant="subtitle1">ID: {data.id}</Typography>
            <Typography variant="subtitle1">Tên: {data.productName}</Typography>
            <Typography variant="subtitle1">
              Số lượng: {data.quantity}
            </Typography>
            <Typography variant="subtitle1">
              Thương hiệu: {data.brand?.name}
            </Typography>
            <Typography variant="subtitle1">
              Loại: {data.category?.categoryName}
            </Typography>
            <Typography variant="subtitle1">Giá: {data.price}</Typography>
            <Typography variant="subtitle1">Giá: {data.priceImport}</Typography>
          </Box>

          <Box>
            <Typography variant="h5">Thông số kỹ thuật</Typography>
            <Typography variant="subtitle1">
              Loại card đồ họa: 10 nhân GPU
            </Typography>
            <Typography variant="subtitle1">
              Loại CPU: Apple M2 tám nhân CPU
            </Typography>
            <Typography variant="subtitle1">Dung lượng RAM 8GB</Typography>
            <Typography variant="subtitle1">Loại RAM 8GB</Typography>
            <Typography variant="subtitle1">Ổ cứng 256GB SSD</Typography>
            <Typography variant="subtitle1">Chất liệu Vỏ kim loại</Typography>
            <Typography variant="subtitle1">Màn hình cảm ứng Không</Typography>
            <Typography variant="subtitle1">
              Kích thước màn hình 13 inches
            </Typography>
            <Typography variant="subtitle1">
              Độ phân giải màn hình 2560 x 1664 pixels
            </Typography>
            <Typography variant="subtitle1">Pin 58.2Whrs</Typography>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
}

export default ModalProduct;
