import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Grid, Card, CardContent, Typography, Paper, styled } from '@mui/material';
import { Vacancy } from '@/models/vacancies';
import HoverCard from './HoverCard';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

// const cards = [
//   { title: 'Card 1', description: 'This is card 1.' },
//   { title: 'Card 2', description: 'This is card 2.' },
//   { title: 'Card 3', description: 'This is card 3.' },
//   // Add more cards as needed
// ];

interface ResponsiveCardGridProps {
  vacancies: Vacancy[];
}

function ResponsiveCardGrid(props: ResponsiveCardGridProps) {
  const { vacancies } = props;

  return (
    <>
      {/* <pre>{JSON.stringify(vacancies, null, 2)}</pre> */}
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {vacancies.map((vacancy, index) => (
          <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
            <Item sx={{ boxShadow: 'none' }}>
              {/* <Card>
              </Card> */}
              <HoverCard
                content={
                  <CardContent>
                    <Typography variant="h6">{vacancy.title}</Typography>
                    <Typography variant="subtitle1">{vacancy.employerName}</Typography>
                    <Typography variant="subtitle1">
                      Posted: {vacancy.postedDate.toDateString()}
                    </Typography>

                    <Typography variant="body2">{vacancy.description}</Typography>
                  </CardContent>
                }
              />
            </Item>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default ResponsiveCardGrid;
