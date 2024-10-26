import React, { useState } from 'react';
import Tab from './Tab';

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const handleTabClick = (tabLabel) => {
    setActiveTab(tabLabel);
  };

  return (
    <div className="tabs">
      <div id='tabs_divider'>
        {children.map((child) => (
          <Tab
            key={child.props.label}
            label={child.props.label}
            onClick={handleTabClick}
            activeTab={activeTab}
          />
        ))}
       
        
      </div>

      <div className="tab-content">
        {children.map((child) =>
          child.props.label === activeTab ? child.props.children : null
        )}
      </div>

    </div>
  );
};

export default Tabs;