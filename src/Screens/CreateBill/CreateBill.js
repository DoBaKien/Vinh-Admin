import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

import { useState } from "react";

import Left from "../../Component/Left";
import Header from "../../Component/Header";
import { TextInputAd } from "../../Component/Style";
import Table from "./Table";
import axios from "axios";
import Swal from "sweetalert2";
import TableChoose from "./TableChoose";
import ModalUser from "./ModalUser";

const CreateBill = () => {
  const [show, setShow] = useState(true);
  const [select, setSelect] = useState("");
  const [customer, setCustomer] = useState("");
  const [customerD, setCustomerD] = useState("");
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const id = localStorage.getItem("id");

  const handleFind = () => {
    if (customer !== "") {
      axios
        .get(`/api/v1/customer/getByPhoneOrEmail/${customer}`)
        .then(function (response) {
          console.log(response.data);
          setCustomerD(response.data);
        })
        .catch(function (error) {
          if (error.response.status === 400) {
            setOpen(true);
          } else {
            Swal.fire("Lỗi", "Lỗi", "error");
          }
        });
    } else {
      Swal.fire("Lỗi", "Vui lòng điền đầy đủ thông tin", "error");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // const orderData = {
    //   note,
    //   customer: {
    //     id: customerD.id,
    //   },
    //   employee: { id: id },
    //   orderDetails: select.map((item) => ({
    //     quantity: item.quantity,
    //     product: {
    //       id: item.product.id,
    //     },
    //   })),
    // };
    // axios
    //   .post(
    //     `/api/v1/orders/saveOrUpdate/${dataUser.shoppingCart.id}`,
    //     orderData
    //   )
    //   .then(function (response) {
    //     console.log(response.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };

  return (
    <Box sx={{ justifyContent: "center", minHeight: "100%", height: "100%" }}>
      <ModalUser setModal={setOpen} modal={open} />
      <Stack direction="row">
        {show && <Left />}
        <Box sx={{ width: "100%" }}>
          <Header setShow={setShow} show={show} />
          <Box
            sx={{
              paddingLeft: 2,
              paddingRight: 2,
            }}
          >
            <Box sx={{ padding: "5px 5px 5px" }}>
              <Typography variant="h5">Tạo hóa đơn</Typography>
            </Box>
            <Stack direction={"row"} spacing={5}>
              <Box sx={{ flex: 1 }}>
                <form noValidate onSubmit={handleSubmit}>
                  <Stack
                    direction={"row"}
                    spacing={2}
                    sx={{
                      display: "flex",
                      marginTop: 2.5,
                      alignItems: "center",
                    }}
                  >
                    <TextInputAd
                      size="small"
                      label="Thông tin khách hàng"
                      variant="outlined"
                      fullWidth
                      onChange={(e) => setCustomer(e.target.value)}
                    />
                    <Button
                      variant="contained"
                      sx={{ width: 120, height: 42 }}
                      onClick={handleFind}
                    >
                      Tìm
                    </Button>
                  </Stack>
                  {customerD !== "" ? (
                    <Stack sx={{ marginTop: 2, gap: 1 }}>
                      <Typography variant="body1">
                        Họ tên: {customerD.lastName + " " + customerD.firstName}
                      </Typography>
                      <Stack direction="row" gap={5}>
                        <Typography variant="body1">
                          Email: {customerD.email}
                        </Typography>
                        <Typography variant="body1">
                          SDT: {customerD.phone}
                        </Typography>
                      </Stack>
                      <Typography>Địa chỉ: {customerD.address}</Typography>
                    </Stack>
                  ) : (
                    <></>
                  )}

                  {select !== "" ? (
                    <Box sx={{ marginTop: 1 }}>
                      <TableChoose setSelect={setSelect} select={select} />
                    </Box>
                  ) : (
                    <></>
                  )}
                  <TextInputAd
                    size="small"
                    label="Ghi chú"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setNote(e.target.value)}
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
                      sx={{ width: 150 }}
                    >
                      Tạo
                    </Button>
                  </Stack>
                </form>
              </Box>
              <Box sx={{ flex: 1.5, marginTop: 2 }}>
                <Table setSelect={setSelect} select={select} />
              </Box>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default CreateBill;
