import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import axios from "axios";

function TableProduct() {
  const [data, setData] = useState("");
  useEffect(() => {
    axios
      .get("api/v1/products/getAll")
      .then(function (response) {
        setData(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
    },
    {
      field: "name",
      headerName: "Tên",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Loại",
      flex: 0.5,
    },
    {
      field: "brand",
      headerName: "Hãng",
      flex: 0.5,
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer
        sx={{
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />

        <GridToolbarQuickFilter />
      </GridToolbarContainer>
    );
  }
  return (
    <Box sx={{ height: "45vh", width: "100%" }}>
      {data !== "" ? (
        <DataGrid
          rowHeight={100}
          localeText={{
            toolbarColumns: "Cột",
            toolbarDensity: "Khoảng cách",
            toolbarFilters: "Lọc",
          }}
          rows={data.map((item) => ({
            id: item.id,
            name: item.productName,
            category: item.category.categoryName,
            brand: item.brand.name,
          }))}
          slots={{
            toolbar: CustomToolbar,
          }}
          columns={columns}
          initialState={{
            ...data.initialState,
          }}
          getRowHeight={() => "auto"}
          sx={{
            "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": {
              py: 1,
            },
            "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
              py: "10px",
            },
            "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
              py: "16px",
            },
          }}
          hideFooter
        />
      ) : (
        <></>
      )}
    </Box>
  );
}

export default TableProduct;
