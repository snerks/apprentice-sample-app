import React from 'react';
import { Grid, Card, CardContent, Typography, Paper, styled } from '@mui/material';
import { Vacancy } from '@/models/vacancies';

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
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {vacancies.map((vacancy, index) => (
        <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
          <Item>
            <Card>
              <CardContent>
                <Typography variant="h6">{vacancy.title}</Typography>
                <Typography variant="body2">{vacancy.description}</Typography>
              </CardContent>
            </Card>
          </Item>
        </Grid>
      ))}
    </Grid>
    //     {
    //       /* <Grid container spacing={2}>
    //   {cards.map((card, index) => (
    //     <Grid item xs={12} sm={6} md={4} key={index}>
    //       <Card>
    //         <CardContent>
    //           <Typography variant="h6">{card.title}</Typography>
    //           <Typography variant="body2">{card.description}</Typography>
    //         </CardContent>
    //       </Card>
    //     </Grid>
    //   ))}
    // </Grid> */
    //     }
  );
}

export default ResponsiveCardGrid;
