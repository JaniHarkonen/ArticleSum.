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
  const { languageManager: lm, workspaceManager: wm } = useContext(GlobalContext);

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
              style={{
                overflowY: "auto",
                overflowX: "hidden"
              }}
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
    <>
      {
        wm.checkWorkspaceOpen() ? 
        <Tabs
          activeKey={activeTab}
          defaultActiveKey={defaultTab}
          onSelect={setActiveTab}
          unmountOnExit={true}
        >
          {renderTabs(workspaceTabs)}
        </Tabs>
        :
        <div className="d-flex justify-content-center align-items-center h-100">
          <h1 className="text-secondary">{lm.translate("workspace.no-workspace")}</h1>
        </div>
      }
    </>
  );
}
