// with material ui
import React from 'react';

const InfoWindow = ({ content }) => {
  return (
    <div>
      <h1>{content ? content : 'Hello!!!'}</h1>
    </div>
  );
};

export default InfoWindow;
