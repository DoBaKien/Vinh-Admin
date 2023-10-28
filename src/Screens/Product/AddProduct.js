import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { TextInputAd, style } from "../../Component/Style";
import { useEffect } from "react";
import axios from "axios";

function ModalBox({ setModal, modal }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loai, setLoai] = useState("");
  const [loais, setLoais] = useState("");
  const [quantity, setQuantity] = useState("");
  const [checkQ, setCheckQ] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8521/api/v1/brands/getAllBrand")
      .then(function (response) {
        setLoais(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const toggleModal = () => {
    setModal(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (event) => {
    setLoai(event.target.value);
  };

  const checkQuantity = (e) => {
    if (e < 0) {
      setCheckQ(true);
    } else {
      setCheckQ(false);
      setQuantity(e);
    }
  };
  return (
    <Modal
      open={modal}
      onClose={toggleModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}
        >
          <Typography id="modal-modal-title" variant="h4">
            Thêm sản phẩm
          </Typography>
        </Box>
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
                sx={{ width: 200, marginTop: 3 }}
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
                  {loais !== "" ? (
                    loais.map((item, index) => (
                      <MenuItem key={index} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))
                  ) : (
                    <></>
                  )}
                </Select>
              </FormControl>
            </Stack>

            <TextInputAd
              label="Mô tả"
              rows={3}
              multiline
              fullWidth
              variant="outlined"
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextInputAd
              label="Nhà cung cấp"
              variant="outlined"
              fullWidth
              onChange={(e) => setName(e.target.value)}
            />
            <TextInputAd
              label="Giá"
              variant="outlined"
              fullWidth
              onChange={(e) => setName(e.target.value)}
            />
            <TextInputAd
              label="Giá nhập"
              variant="outlined"
              fullWidth
              onChange={(e) => setName(e.target.value)}
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
                onClick={() => setModal(!modal)}
                sx={{ width: 150 }}
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
    </Modal>
  );
}

export default ModalBox;
