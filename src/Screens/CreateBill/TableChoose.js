import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";

import SplitArray from "./Item";

function TableChoose(props) {
  const sum = props.select.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Stack direction={"row"}>
        <Box sx={{ width: 230, display: "flex", justifyContent: "center" }}>
          <Typography>Tên</Typography>
        </Box>
        <Box sx={{ width: 70, display: "flex", justifyContent: "center" }}>
          <Typography>Số lượng</Typography>
        </Box>
        <Box sx={{ width: 150, display: "flex", justifyContent: "center" }}>
          <Typography>Giá</Typography>
        </Box>
      </Stack>
      <Divider />
      <Divider />
      <Box sx={{ height: 330, overflow: "scroll", width: "100%" }}>
        {props.select.map((item, i) => (
          <Box key={i}>
            <SplitArray
              item={item}
              select={props.select}
              setSelect={props.setSelect}
            />
          </Box>
        ))}
      </Box>
      <Stack
        direction={"row"}
        sx={{ marginTop: 2, display: "flex", justifyContent: "space-between" }}
      >
        <Typography>Tổng hóa đơn: </Typography>
        <Box sx={{ width: 180, display: "flex", justifyContent: "center" }}>
          <Typography>{sum}</Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default TableChoose;
