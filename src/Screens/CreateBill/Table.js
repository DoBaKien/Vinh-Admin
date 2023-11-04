import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import axios from "axios";

const Table = (props) => {
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
      field: "quantity",
      headerName: "Số lượng",
    },
    {
      field: "price",
      headerName: "Giá",
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
        <GridToolbarDensitySelector />
        <GridToolbarQuickFilter />
      </GridToolbarContainer>
    );
  }
  return (
    <Box sx={{ height: "80vh", width: "100%" }}>
      {data !== "" ? (
        <DataGrid
          rowHeight={100}
          localeText={{
            toolbarColumns: "Cột",
            toolbarDensity: "Khoảng cách",
            toolbarFilters: "Lọc",
          }}
          rows={data.map((item) => ({
            id:
              item.id +
              "/" +
              item.productName +
              "/" +
              item.price +
              "/" +
              item.quantity,
            name: item.productName,
            description: item.description,
            quantity: item.quantity,
            category: item.category.categoryName,
            price: item.price,
            importPrice: item.priceImport,
          }))}
          slots={{
            toolbar: CustomToolbar,
          }}
          checkboxSelection
          columns={columns}
          onRowSelectionModelChange={(id) => {
            props.setSelect(id);
          }}
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
};

export default Table;
