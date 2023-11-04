import { Box, OutlinedInput, Stack, Typography } from "@mui/material";
import { useState } from "react";

function SplitArray(props) {
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(false);
  console.log(props);
  const [id, name, price, slg] = props.item?.split("/") || [];
  const inputQuantity = (e) => {
    if (e < 0) {
      const removeItem = props.select.filter((todo) => {
        console.log(todo);
        let splitArrayasd = todo.split("/");
        return splitArrayasd[0] !== id;
      });
      console.log(removeItem);
      return props.setSelect(removeItem);
    } else if (e < slg) {
      setQuantity(e);
    } else if (e === 0) {
      setQuantity(e);
      setError(true);
    }
  };
  return (
    <Stack direction={"row"} sx={{ marginTop: 2 }}>
      <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
        <Typography>{name}</Typography>
      </Box>
      <Box sx={{ width: 80, display: "flex", justifyContent: "center" }}>
        <OutlinedInput
          type="number"
          id="outlined-adornment-weight"
          value={quantity}
          sx={{ height: "40px" }}
          error={error}
          onChange={(e) => inputQuantity(Number(e.target.value))}
        />
      </Box>
      <Box
        sx={{
          width: 100,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>{(price * quantity).toFixed(2)}</Typography>
      </Box>
    </Stack>
  );
}

export default SplitArray;
