import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import Header from "../../Component/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";

import { CheckStatus, ValueDate } from "../../Component/Style";
import Left from "../../Component/Left";
import axios from "axios";

function CheckOut() {
  const [show, setShow] = useState(true);

  const [data, setData] = useState("");

  useEffect(() => {
    axios
      .get(`/api/v1/orders/getAllOrder`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleOnCellClick = (params) => {
    // navigate(`/CheckOut/${params.id}`);
    window.open(`/DoAnTotNghiep/#/CheckOut/${params.id}`, "_blank");
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Người mua",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      renderCell: (params) => <CheckStatus {...params} />,
      flex: 1,
    },
    {
      field: "date",
      headerName: "Ngày lập",
      flex: 1,
      renderCell: (params) => <ValueDate {...params} />,
    },
  ];

  const datatable = () => {
    if (Array.isArray(data) && data.length !== 0) {
      return (
        <Box height="80vh" width="99%">
          <DataGrid
            localeText={{
              toolbarColumns: "Cột",
              toolbarDensity: "Khoảng cách",
              toolbarFilters: "Lọc",
              toolbarExport: "Xuất ",
            }}
            rowHeight={50}
            rows={data.map((item) => ({
              id: item.id,
              name: item.customer.firstName + " " + item.customer.lastName,
              status: item.statusOrder,
              date: item.date,
            }))}
            density="comfortable"
            columns={columns}
            pageSizeOptions={[10, 50, 100]}
            initialState={{
              ...data.initialState,
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
                csvOptions: {
                  fields: ["tid", "name", "description"],
                  utf8WithBom: true,
                  fileName: "TableTagData",
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
    <Box sx={{ justifyContent: "center" }}>
      <Stack direction="row">
        {show && <Left />}
        <Box sx={{ width: "100%", minWidth: "70%" }}>
          <Header show={show} setShow={setShow} />
          <Box
            bgcolor={"background.default"}
            sx={{
              paddingLeft: 2,
              paddingRight: 2,
            }}
          >
            <Box sx={{ padding: "5px 5px 5px" }}>
              <Typography variant="h4">Quản lý hóa đơn</Typography>
            </Box>

            {datatable()}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

export default CheckOut;
