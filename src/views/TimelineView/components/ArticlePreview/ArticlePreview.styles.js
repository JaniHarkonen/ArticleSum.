import styled from "styled-components";

const Arrow = styled.div`
  width: 64px;
  height: 100px;
  background-color: black;

  clip-path: polygon(
    50% 0%,
    100% 100%,
    0% 100%
  );
`;

const PreviewContainer = styled.div`
  border-style: solid;
  border-width: 1px;
`;

export const Style = {
  PreviewContainer,
  Arrow
};
