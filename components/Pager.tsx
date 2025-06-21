import React, { useState } from 'react';
import { Pagination, CircularProgress, Box } from '@mui/material';
import { VacanciesResponse } from '@/models/vacancies';
// import page from '@/app/page';
// import axios from 'axios';

interface PagerProps {
  vacanciesResponse: VacanciesResponse;
  fetchPage: (pageNumber?: number) => unknown;
}

const Pager = (props: PagerProps) => {
  // const { total, totalFiltered } = props.vacanciesResponse;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [totalPages, setTotalPages] = useState(props.vacanciesResponse.totalPages);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //   const fetchPageInfo = async () => {
  //     try {
  //       const response = await axios.get('https://your-api.com/data?page=1');
  //       const { totalItems, itemsPerPage } = response.data;
  //       setTotalPages(Math.ceil(totalItems / itemsPerPage));
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching page data:', error);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchPageInfo();
  //   }, []);

  const handlePageChange = async (_: unknown, page: number) => {
    setCurrentPage(page);
    // Trigger your page content loading logic here using the new `page`
    try {
      setLoading(true);
      await props.fetchPage(page);
      setLoading(false);
    } catch (error) {
      console.error('Attempt to fetch a page went wrong:', error);
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px' }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            showFirstButton
            showLastButton
          />
          {/* <Typography>
            Page: {currentPage} of {totalPages}
          </Typography> */}
        </Box>
      )}
    </Box>
  );
};

export default Pager;
