import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { workspaceTabs } from "./workspaceTabs";
import { useState } from "react";


export default function Workspace() {
  const defaultTab = workspaceTabs[0];
  const [activeTab, setActiveTab] = useState(defaultTab);

  const renderTabs = (tabs) => {
    return tabs.map((t) => {
      const { id, title, jsx } = t;
      const TabElement = jsx;

      return (
        <Tab
          key={id}
          eventKey={id}
          title={title}
        >
          <TabElement />
        </Tab>
      );
    });
  };

  return (
    <Tabs
      activeKey={activeTab}
      defaultActiveKey={defaultTab}
      onSelect={setActiveTab}
    >
      {renderTabs(workspaceTabs)}
    </Tabs>
  );
}
