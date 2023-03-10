import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    type: "dark",
},
});

export const CustomPagination = ({ setPage, numOfPages = 10 }) => {

  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  }
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <Pagination 
          style={{ color:"white" }}
          onChange={(e) => handlePageChange(e.target.textContent)}
          count={numOfPages}
          hideNextButton
          hidePrevButton
          color="primary"
        />
      </ThemeProvider>

    </div>
  );
};
