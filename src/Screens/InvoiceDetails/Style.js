import { Box, Grid, Stack, styled } from "@mui/material";

export const StackNav = styled(Stack)({
  width: "80%",
  backgroundColor: "white",
  justifyContent: "space-between",
  padding: 10,
  paddingLeft: 20,
  paddingRight: 20,
  borderRadius: 20,
  border: "1px solid black",
  marginTop: 10,
});

export const GridBox = styled(Grid)({
  border: "1px solid black",
  borderRadius: 20,
  paddingTop: 2,
  paddingBottom: 10,
  backgroundColor: "white",
});
export const BoxBtn = styled(Box)({
  backgroundColor: "white",
  padding: 10,
  border: "1px solid black",
  borderRadius: 20,
  width: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 20,
});
