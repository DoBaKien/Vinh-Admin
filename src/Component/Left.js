import {
  Box,
  Collapse,
  Divider,
  List,
  ListItem,
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
import { MenuBtn } from "./Style";
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

  const handleExcel = () => {
    navigate("/ImportExcel");
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
              <MenuBtn onClick={handleDB}>
                <ListItemIcon>
                  <DashboardIcon sx={{ color: "#b9b9b9" }} />
                </ListItemIcon>
                <ListItemText primary="Trang chủ" />
              </MenuBtn>
            </ListItem>

            <MenuBtn onClick={handleClickA}>
              <ListItemIcon>
                <PaidIcon sx={{ color: "#b9b9b9" }} />
              </ListItemIcon>
              <ListItemText primary="Quản lý hóa đơn" />
              {openA ? <ExpandLess /> : <ExpandMore />}
            </MenuBtn>

            <Collapse in={openA} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <MenuBtn sx={{ pl: 4 }} onClick={handleQuestionA}>
                  <ListItemIcon>
                    <NoteAddIcon sx={{ color: "#b9b9b9" }} />
                  </ListItemIcon>
                  <ListItemText primary="Tạo hóa đơn" />
                </MenuBtn>

                <MenuBtn sx={{ pl: 4 }} onClick={handleQuestion}>
                  <ListItemIcon>
                    <RequestQuoteIcon sx={{ color: "#b9b9b9" }} />
                  </ListItemIcon>
                  <ListItemText primary="Danh sách hóa đơn" />
                </MenuBtn>
              </List>
            </Collapse>

            <MenuBtn onClick={handleClick}>
              <ListItemIcon>
                <InputIcon sx={{ color: "#b9b9b9" }} />
              </ListItemIcon>
              <ListItemText primary="Quản lý nhập hàng" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </MenuBtn>

            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <MenuBtn sx={{ pl: 4 }} onClick={handleUser}>
                  <ListItemIcon>
                    <NoteAddIcon sx={{ color: "#b9b9b9" }} />
                  </ListItemIcon>
                  <ListItemText primary="Phiếu nhập" />
                </MenuBtn>

                <MenuBtn sx={{ pl: 4 }} onClick={handleExcel}>
                  <ListItemIcon>
                    <NoteAddIcon sx={{ color: "#b9b9b9" }} />
                  </ListItemIcon>
                  <ListItemText primary="Phiếu nhập excel" />
                </MenuBtn>

                <MenuBtn sx={{ pl: 3 }} onClick={handleReportC}>
                  <ListItemIcon>
                    <Inventory2Icon sx={{ color: "#b9b9b9" }} />
                  </ListItemIcon>
                  <ListItemText primary="Danh sách đơn nhập" />
                </MenuBtn>
              </List>
            </Collapse>

            <ListItem disablePadding>
              <MenuBtn onClick={handleSP}>
                <ListItemIcon>
                  <CategoryIcon sx={{ color: "#b9b9b9" }} />
                </ListItemIcon>
                <ListItemText primary="Quản lý sản phẩm" />
              </MenuBtn>
            </ListItem>

            <ListItem disablePadding>
              <MenuBtn>
                <ListItemIcon>
                  <ReportIcon sx={{ color: "#b9b9b9" }} />
                </ListItemIcon>
                <ListItemText primary="Quản lý phản hồi" />
              </MenuBtn>
            </ListItem>
          </List>
        </Box>
      </Box>
    </BoxSide>
  );
}

export default memo(LeftAdmin);
