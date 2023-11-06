import React from "react";
import { useState } from "react";
import Header from "../../Component/Header";
import Left from "../../Component/Left";
import { Button, Stack, Box, Typography } from "@mui/material";
import { ExcelRenderer } from "react-excel-renderer";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  ExpandableCell,
  TextInputAd,
  VisuallyHiddenInput,
} from "../../Component/Style";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import axios from "axios";
import ModalNcc from "../ImportOrder/ModalNcc";
import AddCircleIcon from "@mui/icons-material/AddCircle";
function ImportExcel() {
  const [show, setShow] = useState(true);
  const [nccD, setNccD] = useState("");
  const [rows, setRows] = useState([]);
  const [ncc, setNcc] = useState("");
  const [open, setOpen] = useState(false);

  const fileHandler = (event) => {
    const fileObj = event.target.files[0];
    if (!fileObj) {
      Swal.fire({
        title: "Không tìm thấy File",
        icon: "question",
      });
      return false;
    }
    if (
      !(
        fileObj.type === "application/vnd.ms-excel" ||
        fileObj.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        fileObj.type === "text/csv"
      )
    ) {
      Swal.fire({
        title: "Không đúng File",
        text: "Chỉ nhận file Excel",
        icon: "error",
      });
      return false;
    }
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        let newRows = [];
        resp.rows.slice(1).map((row, index) => {
          if (row && row !== "undefined") {
            newRows.push({
              key: index,
              id: row[0],
              name: row[1],
              category: row[2],
              brand: row[3],
              price: row[4],
              description: row[5],
            });
          }
          return null;
        });
        console.log(newRows);
        if (newRows.length === 0) {
          Swal.fire({
            title: "Không tìm thấy dữ liệu",
            icon: "error",
          });
          return false;
        } else {
          setRows(newRows);
        }
      }
    });
    return false;
  };
  const handleFind = () => {
    if (ncc !== "") {
      axios
        .get(`/api/v1/suppliers/getByEmailOrPhone/${ncc}`)
        .then(function (response) {
          if (response.data !== `${ncc} not found!!`) {
            setNccD(response.data);
          } else {
            setOpen(!open);
            setNccD("");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      Swal.fire({
        title: "Vui lòng nhập thông tin",
        icon: "error",
      });
    }
  };
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Tên",
      flex: 1,
    },
    { field: "quantity", headerName: "Số Lượng", flex: 0.5 },

    { field: "category", headerName: "Loại", flex: 0.5 },
    { field: "brand", headerName: "Thương hiệu", flex: 0.5 },
    { field: "price", headerName: "Giá", flex: 0.5 },
    {
      field: "description",
      headerName: "Mô tả",
      flex: 2,
      renderCell: (params) => {
        params !== null ? <ExpandableCell {...params} /> : <></>;
      },
    },
  ];

  return (
    <Box sx={{ justifyContent: "center", minHeight: "100%" }}>
      <ModalNcc setModal={setOpen} modal={open} />

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
            <Box>
              <Box sx={{ padding: "5px 5px 5px" }}>
                <Typography variant="h5">Thêm phiếu nhập bằng Excel</Typography>
              </Box>
              <Stack direction={"row"}>
                <Box sx={{ flex: 1 }}>
                  <Stack
                    direction={"row"}
                    spacing={5}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <TextInputAd
                      label="Nhà cung cấp"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={ncc}
                      onChange={(e) => setNcc(e.target.value)}
                    />
                    <Button
                      variant="contained"
                      sx={{ width: 120, height: 40 }}
                      onClick={handleFind}
                    >
                      Tìm
                    </Button>
                  </Stack>
                  <Stack sx={{ marginTop: 1, gap: 1 }}>
                    <Typography variant="body1">
                      Tên: {nccD.name || ""}
                    </Typography>
                    <Stack direction="row" gap={5}>
                      <Typography variant="body1">
                        Email: {nccD.email || " "}
                      </Typography>
                      <Typography variant="body1">
                        SDT: {nccD.phone || ""}
                      </Typography>
                    </Stack>
                    <Typography>Địa chỉ: {nccD.address || ""}</Typography>
                  </Stack>
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "end",
                  }}
                >
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
                  >
                    Thêm File
                    <VisuallyHiddenInput type="file" onChange={fileHandler} />
                  </Button>
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<AddCircleIcon />}
                  >
                    Tạo Phiếu nhập
                  </Button>
                </Box>
              </Stack>
            </Box>
            <Box height={520} width="99%" sx={{ marginTop: 1 }}>
              <DataGrid
                // density="comfortable"
                rowHeight={50}
                rows={rows || []}
                localeText={{
                  toolbarColumns: "Cột",
                  toolbarDensity: "Khoảng cách",
                  toolbarFilters: "Lọc",
                  toolbarExport: "Xuất ",
                }}
                columns={columns}
                pageSizeOptions={[10, 50, 100]}
                initialState={{
                  ...rows.initialState,
                  pagination: { paginationModel: { pageSize: 10 } },
                }}
                componentsProps={{
                  toolbar: {
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500 },
                    csvOptions: {
                      fields: [
                        "id",
                        "name",
                        "category",
                        "brand",
                        "description",
                        "price",
                      ],
                      utf8WithBom: true,
                      fileName: "Table-Product-Data",
                    },
                  },
                }}
                slots={{
                  toolbar: GridToolbar,
                }}
                // onCellDoubleClick={handleOnCellClick}
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
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

export default ImportExcel;
