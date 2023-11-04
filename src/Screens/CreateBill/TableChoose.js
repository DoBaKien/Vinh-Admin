import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import SplitArray from "./Item";

function TableChoose(props) {
  return (
    <Box sx={{ height: 360, width: "100%" }}>
      <Stack direction={"row"}>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <Typography>Tên</Typography>
        </Box>
        <Box sx={{ width: 80, display: "flex", justifyContent: "center" }}>
          <Typography>Số lượng</Typography>
        </Box>
        <Box sx={{ width: 100, display: "flex", justifyContent: "center" }}>
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
    </Box>
  );
}

export default TableChoose;
