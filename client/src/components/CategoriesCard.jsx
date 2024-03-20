import { useState } from 'react';
import { Tabs, Col } from 'antd';
import Do from './Do';
import Eat from './Eat';
import Stay from './Stay';

const App = () => {
  const [activeTab, setActiveTab] = useState('1');

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const renderContent = (key) => {
    switch (key) {
      case '1':
        return <Do />;
      case '2':
        return <Eat />;
      case '3':
        return <Stay />;
      default:
        return null;
    }
  };

  return (
    <>
      <Tabs
        defaultActiveKey="1"
        centered
        activeKey={activeTab}
        onChange={handleTabChange}
      >
        <Tabs.TabPane tab="Do" key="1" />
        <Tabs.TabPane tab="Eat" key="2" />
        <Tabs.TabPane tab="Stay" key="3" />
      </Tabs>


      {renderContent(activeTab)}

    </>
  );
};

export default App;
