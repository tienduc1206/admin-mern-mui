import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar";
import Header from "../../components/Header";
import { useGetTransactionsQuery } from "../../state/api";

const Transactions = () => {
  const theme = useTheme();

  //values to be sent to the backend
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Transactions" subTitle="Entire list of Transactions" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiButton-text": {
            color: theme.palette.secondary[200],
          },
        }}
      >
        <DataGrid
          sx={{ p: "1rem" }}
          getRowId={(row) => row._id}
          loading={isLoading || !data}
          rows={data?.transactions || []}
          columns={columns}
          page={page}
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          pageSize={pageSize}
          paginationMode="server"
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          rowCount={data?.total || 0}
          sortingMode="server"
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { search, setSearch },
          }}
        />
      </Box>
    </Box>
  );
};

export default Transactions;
