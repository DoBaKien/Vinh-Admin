import { Box, Grid, Modal, Paper, Stack, Typography } from "@mui/material";

import { style } from "../../Component/Style";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";

function ModalDetail({ setModal, modal, id }) {
  const [data, setData] = useState("");
  const toggleModal = () => {
    setModal(false);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },

    {
      field: "name",
      headerName: "Tên",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Giá",
      flex: 0.5,
    },
  ];

  useEffect(() => {
    axios
      .get(`http://localhost:8521/api/v1/orders/getOrderById/${id}`)
      .then((res) => {
        setData(res.data.orderDetails);
        console.log(res.data.orderDetails);
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <Modal
      open={modal}
      onClose={toggleModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack
          sx={{ py: 2, height: "100%", boxSizing: "border-box" }}
          direction="column"
        >
          <Paper sx={{ flex: 1, mx: "auto", width: "90%", p: 1 }}>
            <Stack direction="column" spacing={1} sx={{ height: 1 }}>
              <Typography variant="h6">{`Order #id`}</Typography>
              <Grid container>
                <Grid item md={6}>
                  <Typography variant="body2" color="textSecondary">
                    Customer information
                  </Typography>
                  <Typography variant="body1">tên khách hàng</Typography>
                  <Typography variant="body1">email</Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography
                    variant="body2"
                    align="right"
                    color="textSecondary"
                  >
                    Shipping address
                  </Typography>
                  <Typography variant="body1" align="right">
                    Dia chi
                  </Typography>
                  <Typography variant="body1" align="right">
                    Dia chi
                  </Typography>
                </Grid>
              </Grid>
              {data !== "" ? (
                <DataGrid
                  rows={data.map((item) => ({
                    id: item.id,
                    name: item.product.productName,
                    price: item.product.price,
                    quantity: item.quantity,
                  }))}
                  columns={columns}
                  sx={{ flex: 1 }}
                  hideFooter
                />
              ) : (
                <></>
              )}
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </Modal>
  );
}

export default ModalDetail;
