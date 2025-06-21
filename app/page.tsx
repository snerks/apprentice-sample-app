'use client';
// import Image from 'next/image';

// HomePage.tsx
import React, { useEffect, useState } from 'react';
// import { Container, Typography, Box, Button } from '@mui/material';
// import { Vacancy } from './api/vacancies/route';
// import { PostcodeLookupResult } from '@/models/postcodes';
import { VacanciesResponse, VacancySchema } from '@/models/vacancies';
// import BasicGrid from '@/components/BasicGrid';
import ResponsiveCardGrid from '@/components/ResponsiveCardGrid';
import Pager from '@/components/Pager';
// import z from 'zod/v4';

const Home = () => {
  const [vacanciesResponse, setVacanciesResponse] = useState<VacanciesResponse | null>(null);
  // const [postcodeLookupResult, setPostcodeLookupResult] = useState<PostcodeLookupResult | null>(
  //   null,
  // );

  async function fetchVacanciesCore(pageNumber?: number) {
    const pageNumberQuery = pageNumber ? `PageNumber=${pageNumber}` : '';
    const response = await fetch(`/api/vacancies?Sort=AgeAsc&PageSize=25&${pageNumberQuery}`);
    const vacanciesResponse = (await response.json()) as VacanciesResponse;

    const validated = VacancySchema.parse(vacanciesResponse.vacancies[0]);
    console.log(validated.postedDate instanceof Date); // <-- "true"

    const transformedVacancies = vacanciesResponse.vacancies.map(v => VacancySchema.parse(v));

    const transformedVacanciesResponse = { ...vacanciesResponse, vacancies: transformedVacancies };

    setVacanciesResponse(transformedVacanciesResponse);
    return vacanciesResponse;
  }

  useEffect(() => {
    async function fetchVacancies() {
      await fetchVacanciesCore();
      // setVacanciesResponse(data);
      // setPostcodeLookupResult(data);
    }

    fetchVacancies();
  }, []);

  return (
    <div>
      {/* <h1>Vacancies</h1> */}
      {vacanciesResponse && (
        // <ul>
        //   {vacanciesResponse.vacancies.map(vacancy => (
        //     <li key={vacancy.vacancyReference}>{vacancy.title}</li>
        //   ))}
        // </ul>
        <>
          <Pager vacanciesResponse={vacanciesResponse} fetchPage={fetchVacanciesCore} />
          <ResponsiveCardGrid vacancies={vacanciesResponse.vacancies} />
        </>
      )}

      {/* <BasicGrid /> */}
      {/* <pre>{JSON.stringify(postcodeLookupResult, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(vacanciesResponse, null, 2)}</pre> */}
    </div>
  );

  // return (
  //   <Container maxWidth="md">
  //     <Box
  //       display="flex"
  //       flexDirection="column"
  //       alignItems="center"
  //       justifyContent="center"
  //       minHeight="100vh"
  //       textAlign="center"
  //     >
  //       <Typography variant="h2" component="h1" gutterBottom>
  //         Welcome to My App
  //       </Typography>
  //       <Typography variant="h5" component="p" gutterBottom>
  //         A clean and simple starter page built with React and Material UI.
  //       </Typography>
  //       <Button variant="contained" size="large" sx={{ mt: 4 }}>
  //         Get Started
  //       </Button>
  //     </Box>
  //   </Container>
  // );
};

export default Home;
