import Container from "react-bootstrap/Container";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import { useContext, useState } from "react";

import { workspaceTabs } from "./workspaceTabs";
import { GlobalContext } from "../../context/GlobalContext";
import { mapElements } from "../../utils/mapElements";

/**
 * A major component that consitutes the body of the application.
 * This component renders the tabs of the workspace as well as 
 * the contents of the currently active tab.
 * 
 * An important component of the `Workspace` is the `workspaceTabs`-
 * module which is used to store the tabs of the application. If 
 * more tabs are added, they should be declared in that module.
 */
export default function Workspace() {
  /**
   * Default visible tag.
   */
  const defaultTab = workspaceTabs[0];

  const [activeTab, setActiveTab] = useState(defaultTab);
  const { languageManager: lm, workspaceManager: wm } = useContext(GlobalContext);

  /**
   * Creates an array of Bootstrap `Tab`-elements that contain the 
   * views of the application as outlined in `workspaceTabs`. The 
   * tabs will be titled according to their translation keys.
   * 
   * @param {Array} tabs Array of tab JSONs that represent the tabs 
   * of the application (see `workspaceTabs` for more information).
   * 
   * @returns Array of `Tab`-elements.
   */
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
