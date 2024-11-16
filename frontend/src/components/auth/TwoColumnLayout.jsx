import React from 'react';
import '../../styles/auth/TwoColumnLayout.css';

const TwoColumnLayout = ({ leftContainerChildren, rightContainerChildren }) => {
  return (
    <main className='main-two-column-layout'>
      <div className="two-column-layout-container">
        <div className="two-column-layout-left-container">
          {leftContainerChildren}
        </div>
        <div className="two-column-layout-right-container">
          {rightContainerChildren}
        </div>
      </div>
    </main>
  );
};

export default TwoColumnLayout;
