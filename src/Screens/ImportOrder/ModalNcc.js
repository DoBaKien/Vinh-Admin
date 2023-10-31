import { Box, Button, Modal, Stack, Typography } from "@mui/material";

import { useState } from "react";
import { TextInputAd, style } from "../../Component/Style";

function ModalNcc({ setModal, modal }) {
  const [name, setName] = useState("");
  const [adress, setAdress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const toggleModal = () => {
    setModal(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, adress, email, phone);
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
            Thêm nhà sản xuất
          </Typography>
        </Box>
        <Box>
          <form noValidate onSubmit={handleSubmit}>
            <TextInputAd
              label="Tên nhà sản xuất"
              variant="outlined"
              fullWidth
              onChange={(e) => setName(e.target.value)}
            />
            <TextInputAd
              label="Địa chỉ"
              variant="outlined"
              fullWidth
              onChange={(e) => setAdress(e.target.value)}
            />
            <TextInputAd
              label="Số điện thoại"
              variant="outlined"
              fullWidth
              onChange={(e) => setPhone(e.target.value)}
            />

            <TextInputAd
              label="Email"
              variant="outlined"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
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

export default ModalNcc;
