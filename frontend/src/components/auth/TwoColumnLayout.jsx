import React from 'react';

const TwoColumnLayout = ({ leftContainerChildren, rightContainerChildren }) => {
  return (
    <div className="container">
      <div className="left-container">
        {leftContainerChildren}
      </div>
      <div className="right-container">
        {rightContainerChildren}
      </div>
    </div>
  );
};

export default TwoColumnLayout;
