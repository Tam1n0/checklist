// src/StarRating.tsx
import React from 'react';

type StarRatingProps = {
  rating: number;
  onRatingChange: (rating: number) => void;
  maxRating?: number;
};

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange, maxRating = 5 }) => {
  return (
    <div className="flex space-x-1 cursor-pointer">
      {[...Array(maxRating)].map((_, i) => {
        const starNumber = i + 1;
        return (
          <svg
            key={starNumber}
            onClick={() => onRatingChange(starNumber)}
            xmlns="http://www.w3.org/2000/svg"
            fill={starNumber <= rating ? "gold" : "none"}
            viewBox="0 0 24 24"
            stroke="gold"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.18 6.71a1 1 0 00.95.69h7.06c.969 0 1.371 1.24.588 1.81l-5.712 4.15a1 1 0 00-.364 1.118l2.18 6.71c.3.921-.755 1.688-1.54 1.118l-5.712-4.15a1 1 0 00-1.176 0l-5.712 4.15c-.784.57-1.838-.197-1.54-1.118l2.18-6.71a1 1 0 00-.364-1.118L2.28 11.137c-.783-.57-.38-1.81.588-1.81h7.06a1 1 0 00.95-.69l2.18-6.71z"
            />
          </svg>
        );
      })}
    </div>
  );
};

export default StarRating;
