import { Box, OutlinedInput, Stack, Typography } from "@mui/material";
import { useState } from "react";

function SplitArray(props) {
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(false);

  const [id, name, price, slg] = props.item?.split("/") || [];
  // const orderDetails = Object.values(select).map((item, index) => {
  //   const itemDetails = item.split("/");
  //   return {
  //     quantity: parseInt(itemDetails[0]),
  //     product: {
  //       id: index, // Assuming the index to be the ID
  //       name: itemDetails[1],
  //       price: parseInt(itemDetails[2]),
  //       anotherProperty: parseInt(itemDetails[3]),
  //     },
  //   };
  // });
  // console.log(orderDetails);
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
      <Box sx={{ width: 70, display: "flex", justifyContent: "center" }}>
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
          width: 150,
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
