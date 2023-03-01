import styled from "styled-components";

const textContainerHighlight = {
  borderStyle: "dashed",
  borderWidth: "1px",
  width: "calc(100% - 2px)",
  height: "calc(100% - 10px)"
};

const Highlight = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;

  border-style: dashed;
  border-width: 1px;
`;


export const Styles = {
  textContainerHighlight,
  Highlight
};
