import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { TextInputAd, style } from "../../Component/Style";

function ModalUser({ setModal, modal }) {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [sdt, setSdt] = useState("");
  const [dc, setDc] = useState("");
  const toggleModal = () => {
    setModal(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
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
          <Typography id="modal-modal-title" variant="h6">
            Khách hàng mới, vui lòng thêm thông tin
          </Typography>
        </Box>
        <Box>
          <form noValidate onSubmit={handleSubmit}>
            <Stack direction={"row"} gap={3}>
              <TextField
                label="Họ"
                variant="outlined"
                fullWidth
                value={first}
                onChange={(e) => setFirst(e.target.value)}
              />
              <TextField
                label="Tên"
                variant="outlined"
                fullWidth
                value={last}
                onChange={(e) => setLast(e.target.value)}
              />
            </Stack>
            <TextInputAd
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextInputAd
              label="Số điện thoại"
              variant="outlined"
              fullWidth
              value={sdt}
              onChange={(e) => setSdt(e.target.value)}
            />
            <TextInputAd
              label="Số điện thoại"
              variant="outlined"
              fullWidth
              value={dc}
              onChange={(e) => setDc(e.target.value)}
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

export default ModalUser;
