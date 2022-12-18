import React, { useCallback } from "react";
import {
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import debounce from "lodash/debounce";

const DataGridCustomToolbar = ({ searchInput, setSearchInput, setSearch }) => {
  const handleChangeSearchInput = (e) => {
    setSearchInput(e.target.value);
    delayedSearch(searchInput);
  };

  const delayedSearch = useCallback(
    debounce((q) => setSearch(q), 600),
    []
  );

  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBetween>
        <TextField
          label="Search..."
          sx={{
            mb: "0.5rem",
            width: "15rem",
          }}
          onChange={(e) => handleChangeSearchInput(e)}
          value={searchInput}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setSearch(searchInput)}>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FlexBetween>
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;
