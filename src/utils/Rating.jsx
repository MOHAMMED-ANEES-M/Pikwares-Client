
import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ rating }) => {
  const stars = [];
  const floorRating = Math.floor(rating);

  for (let i = 0; i < floorRating; i++) {
    stars.push(<FaStar key={i} color="#FFD700" />);
  }

  if (rating % 1 !== 0) {
    stars.push(<FaStarHalfAlt key='half' color="#FFD700" />);
  }

  const remainingStars = 5 - Math.ceil(rating);
  for (let i = 0; i < remainingStars; i++) {
    stars.push(<FaRegStar key={`empty${i}`} color="#FFD700" />);
  }

  return <>{stars}</>;
};

export default Rating;
