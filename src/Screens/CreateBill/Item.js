import { Box, OutlinedInput, Stack, Typography } from "@mui/material";

function SplitArray(props) {
  const inputQuantity = (e) => {
    if (e > 0) {
      const newArr = props.select.map((item) => {
        if (item.id === props.item.id) {
          props.item.quantity = e;
        }

        return item;
      });
      props.setSelect(newArr);
    }
  };

  return (
    <Stack direction={"row"} sx={{ marginTop: 2 }}>
      <Box sx={{ width: 230, display: "flex", alignItems: "center" }}>
        <Typography>{props.item.product.name}</Typography>
      </Box>
      <Box
        sx={{
          width: 70,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <OutlinedInput
          type="number"
          id="outlined-adornment-weight"
          value={props.item.quantity}
          sx={{ height: "40px" }}
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
        <Typography>
          {(props.item.product.price * props.item.quantity)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
        </Typography>
      </Box>
    </Stack>
  );
}

export default SplitArray;
