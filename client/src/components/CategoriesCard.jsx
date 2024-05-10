import { useState } from "react";
import { Tabs } from "antd";
import Do from "./Do";
import Eat from "./Eat";
import Stay from "./Stay";
import { useTranslation } from "react-i18next";
import '../css/Theme.css';

const App = ({ isBlackAndWhite, isIncreased,fontFamilietwo, fontFamilyIndex }) => {
  const [activeTab, setActiveTab] = useState("1");
  const {t} = useTranslation();

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const renderContent = (key) => {
    switch (key) {
      case "1":
        return <Do />;
      case "2":
        return <Eat />;
      case "3":
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
        <Tabs.TabPane tab={t("Do")} key="1" />
        <Tabs.TabPane tab={t("Eat")} key="2" />
        <Tabs.TabPane tab={t("Stay")} key="3" />
      </Tabs>

      <div className={`nav ${isBlackAndWhite ? 'black-and-white' : ''}`} > 
        {renderContent(activeTab)}
      </div>
    </>
  );
};

export default App;
