import React from 'react';

const Tab = ({ label, activeTab, onClick }) => {
  const handleClick = () => {
    onClick(label);
  };

  return (
    <div
      className={`tab${activeTab === label ? 'active' : ''}`}
      onClick={handleClick}
    >
      {label}
    </div>
  );
};

export default Tab;