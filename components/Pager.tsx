import React, { useEffect, useState } from 'react';
import { Pagination, CircularProgress, Box } from '@mui/material';
import { VacanciesResponse } from '@/models/vacancies';
// import axios from 'axios';

interface PagerProps {
  vacanciesResponse: VacanciesResponse;
  fetchPage: (pageNumber?: number) => any;
}

const Pager = (props: PagerProps) => {
  const { total, totalFiltered } = props.vacanciesResponse;

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

  const handlePageChange = (event: any, page: number) => {
    setCurrentPage(page);
    // Trigger your page content loading logic here using the new `page`
    props.fetchPage(page);
  };

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      )}
    </Box>
  );
};

export default Pager;
