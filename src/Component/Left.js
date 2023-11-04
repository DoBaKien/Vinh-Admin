import {
  Box,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ReportIcon from "@mui/icons-material/Report";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import logo from "../Assert/logo.png";
import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import InputIcon from "@mui/icons-material/Input";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
function LeftAdmin() {
  const navigate = useNavigate();
  const BoxSide = styled(Box)(() => ({
    backgroundColor: "#F8F9F9",
  }));

  const [open, setOpen] = useState(true);
  const [openA, setOpenA] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClickA = () => {
    setOpenA(!openA);
  };
  const handleHome = () => {
    navigate("/");
  };
  const handleDB = () => {
    navigate("/DashBoard");
  };
  const handleQuestion = () => {
    navigate("/Checkout");
  };
  const handleQuestionA = () => {
    navigate("/CreateBill");
  };

  const handleUser = () => {
    navigate("/ImportOrder");
  };
  const handleSP = () => {
    navigate("/Product");
  };

  const handleReportC = () => {
    navigate("/ImportOrderData");
  };

  return (
    <BoxSide>
      <Box p={1} sx={{ width: 250 }}>
        <Box>
          <List bgcolor="background.paper">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                onClick={handleHome}
                component="img"
                sx={{
                  height: 80,
                  cursor: "pointer",
                  marginBottom: 5,
                  marginTop: 2,
                }}
                alt="logo"
                src={logo}
              />
            </Box>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={handleDB}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Bảng điều khiển" />
              </ListItemButton>
            </ListItem>
            <Divider />

            <Divider />

            <Divider />
            <Divider />
            <ListItemButton onClick={handleClickA}>
              <ListItemIcon>
                <PaidIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý hóa đơn" />
              {openA ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Divider />
            <Divider />
            <Collapse in={openA} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 3 }} onClick={handleQuestionA}>
                  <ListItemIcon>
                    <NoteAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Tạo hóa đơn" />
                </ListItemButton>
                <Divider />
                <Divider />
                <ListItemButton sx={{ pl: 3 }} onClick={handleQuestion}>
                  <ListItemIcon>
                    <RequestQuoteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Danh sách hóa đơn" />
                </ListItemButton>
              </List>
            </Collapse>

            <Divider />
            <Divider />
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <InputIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý nhập hàng" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Divider />
            <Divider />
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 3 }} onClick={handleUser}>
                  <ListItemIcon>
                    <NoteAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Phiếu nhập" />
                </ListItemButton>
                <Divider />
                <Divider />
                <ListItemButton sx={{ pl: 3 }} onClick={handleReportC}>
                  <ListItemIcon>
                    <Inventory2Icon />
                  </ListItemIcon>
                  <ListItemText primary="Danh sách đơn nhập" />
                </ListItemButton>
              </List>
            </Collapse>
            <Divider />
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={handleSP}>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Quản lý sản phẩm" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <Divider />
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ReportIcon />
                </ListItemIcon>
                <ListItemText primary="Quản lý phản hồi" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>
    </BoxSide>
  );
}

export default memo(LeftAdmin);
