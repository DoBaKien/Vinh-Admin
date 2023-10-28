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

import { dataOrder } from "../../Component/data";
const ImportData = () => {
  const [show, setShow] = useState(true);

  const [tags, setTags] = useState("");
  const [value, setValue] = useState("");

  const handleOnCellClick = (params) => {};

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "nv", headerName: "Người lập", flex: 1 },
    { field: "name", headerName: "Nhà cung cấp", flex: 1 },
    { field: "date", headerName: "Ngày lập", flex: 1 },
  ];

  const datatable = () => {
    if (Array.isArray(dataOrder) && dataOrder.length !== 0) {
      return (
        <Box height="80vh" width="99%">
          <DataGrid
            rowHeight={50}
            rows={dataOrder}
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

            {datatable()}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default ImportData;
