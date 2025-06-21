import React from 'react';
import { Card } from '@mui/material';

interface HoverCardProps {
  content: React.ReactNode;
}

const HoverCard = (props: HoverCardProps) => {
  const { content } = props;
  const cardStyle = {
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
      zIndex: 2,
    },
  };

  return (
    <Card sx={cardStyle} elevation={3}>
      {content}
    </Card>
  );
};

export default HoverCard;
