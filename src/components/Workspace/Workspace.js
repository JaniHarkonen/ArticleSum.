import Container from "react-bootstrap/Container";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import { useContext, useState } from "react";

import { workspaceTabs } from "./workspaceTabs";
import { GlobalContext } from "../../context/GlobalContext";
import { mapElements } from "../../utils/mapElements";


export default function Workspace() {
  const defaultTab = workspaceTabs[0];
  const [activeTab, setActiveTab] = useState(defaultTab);
  const { languageManager: lm } = useContext(GlobalContext);


  const renderTabs = (tabs) => {
    return mapElements(
      tabs,
      (key, tab) => {
        const { id, jsx } = tab;
        const TabElement = jsx;

        return (
          <Tab
            key={key}
            eventKey={id}
            title={lm.translate("navigation." + id)}
          >
            <Container
              className="h-100 py-3"
              style={{ overflowY: "auto" }}
            >
              <TabElement />
            </Container>
          </Tab>
        );
      },
      "workspace-tab-"
    );
  };

  return (
    <Tabs
      activeKey={activeTab}
      defaultActiveKey={defaultTab}
      onSelect={setActiveTab}
      unmountOnExit={true}
    >
      {renderTabs(workspaceTabs)}
    </Tabs>
  );
}
