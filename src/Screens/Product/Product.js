import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import Header from "../../Component/Header";
import Left from "../../Component/Left";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect } from "react";
import { ExpandableCell } from "../../Component/Style";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalBox from "./AddProduct";
import ModalProduct from "./ModalProduct";
const Product = () => {
  const [show, setShow] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalP, setModalP] = useState(false);
  const [modalE, setModalE] = useState(false);
  const [tags, setTags] = useState("");
  const [value, setValue] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:8521/api/v1/products/getAll")
      .then(function (response) {
        setTags(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleOnCellClick = (params) => {
    setModalP(!modalP);
    setValue(params.row.id);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "category", headerName: "Loại", flex: 0.5 },
    { field: "brand", headerName: "Thương hiệu", flex: 0.5 },

    {
      field: "name",
      headerName: "Tên",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Mô tả",
      flex: 2,
      renderCell: (params) => <ExpandableCell {...params} />,
    },
    {
      field: "actions",
      headerName: "Chức năng",
      type: "actions",
      flex: 0.6,
      getActions: (params) => {
        let actions = [
          <>
            <Tooltip title="Xóa" placement="left">
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Sửa" placement="right">
              <IconButton>
                <DriveFileRenameOutlineIcon />
              </IconButton>
            </Tooltip>
          </>,
        ];

        return actions;
      },
    },
  ];

  const datatable = () => {
    if (Array.isArray(tags) && tags.length !== 0) {
      return (
        <Box height="80vh" width="99%">
          <DataGrid
            rowHeight={50}
            rows={tags.map((item) => ({
              id: item.id,
              name: item.productName,
              description: item.description,
              category: item.category.categoryName,
              brand: item.brand.name,
              quantity: item.quantity,
              price: item.price,
              importPrice: item.priceImport,
              supplier: item.supplier,
            }))}
            columns={columns}
            pageSizeOptions={[10, 50, 100]}
            initialState={{
              ...tags.initialState,
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
                csvOptions: {
                  fields: [
                    "id",
                    "category",
                    "brand",
                    "name",
                    "description",
                    "price",
                    "importPrice",
                  ],
                  utf8WithBom: true,
                  fileName: "Table-Product-Data",
                },
              },
            }}
            slots={{
              toolbar: GridToolbar,
            }}
            onCellDoubleClick={handleOnCellClick}
            getRowHeight={() => "auto"}
            sx={{
              "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": {
                py: 1,
              },
              "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
                py: "8px",
              },
              "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
                py: "10px",
              },
            }}
          />
        </Box>
      );
    } else {
      return (
        <Box
          sx={{
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      );
    }
  };
  return (
    <Box sx={{ justifyContent: "center", minHeight: "100%" }}>
      <ModalBox setModal={setModal} modal={modal} />
      {value !== "" ? (
        <ModalProduct setModal={setModalP} modal={modalP} value={value} />
      ) : (
        <></>
      )}
      <Stack direction="row">
        {show && <Left />}
        <Box sx={{ width: "100%", minWidth: "70%" }}>
          <Header setShow={setShow} show={show} />
          <Box
            sx={{
              paddingLeft: 2,
              paddingRight: 2,
            }}
          >
            <Box sx={{ padding: "5px 5px 5px" }}>
              <Typography variant="h4">Quản lý sản phẩm</Typography>
            </Box>

            <Button
              size="small"
              startIcon={<AddIcon />}
              onClick={() => setModal(!modal)}
            >
              Thêm sản phẩm
            </Button>

            {datatable()}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Product;
