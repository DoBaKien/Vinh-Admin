import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import Header from "../../Component/Header";
import Left from "../../Component/Left";

import { TextInputAd } from "../../Component/Style";

const ImportOrder = () => {
  const [show, setShow] = useState(true);
  const [asd, setAsd] = useState(false);
  const [checkQ, setCheckQ] = useState(false);
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
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
    <Box sx={{ justifyContent: "center" }}>
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
            <Box sx={{ padding: "5px 5px 5px" }}>
              <Typography variant="h4">Phiếu nhập</Typography>
            </Box>
            <Stack direction={"row"} spacing={10}>
              <Box sx={{ flex: 1 }}>
                <form noValidate onSubmit={handleSubmit}>
                  <Stack
                    direction={"row"}
                    spacing={5}
                    sx={{
                      display: "flex",
                      marginTop: 2.5,
                      alignItems: "center",
                    }}
                  >
                    <TextInputAd
                      label="Nhà cung cấp"
                      variant="outlined"
                      fullWidth
                    />
                    <Button
                      variant="contained"
                      sx={{ width: 120, height: 50 }}
                      onClick={() => setAsd(!asd)}
                    >
                      Tìm
                    </Button>
                  </Stack>
                  {asd ? (
                    <>
                      <TextInputAd
                        variant="outlined"
                        fullWidth
                        value="Tên nhà cung cấp"
                      />
                      <TextInputAd
                        variant="outlined"
                        fullWidth
                        value="Email nhà cung cấp"
                      />
                      <TextInputAd
                        variant="outlined"
                        fullWidth
                        value="SDT nhà cung cấp"
                      />
                    </>
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
              <Box sx={{ flex: 1, marginTop: 2 }}>
                <form noValidate onSubmit={handleSubmit}>
                  <TextInputAd
                    label="Tên sản phẩm"
                    variant="outlined"
                    fullWidth
                  />

                  <TextInputAd
                    label="Số lượng"
                    variant="outlined"
                    type="number"
                    error={checkQ}
                    fullWidth
                    onChange={(e) => checkQuantity(e.target.value)}
                  />

                  <TextInputAd label="Giá" variant="outlined" fullWidth />
                  <TextInputAd label="Giá nhập" variant="outlined" fullWidth />

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
              </Box>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default ImportOrder;
