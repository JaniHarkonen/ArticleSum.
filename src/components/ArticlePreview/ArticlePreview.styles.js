import styled from "styled-components";


const Arrow = styled.div`
  position: absolute;
  width: 64px;
  height: 100%;
  background-color: black;

  clip-path: polygon(
    50% 20%,
    100% 100%,
    0% 100%
  );
`;

const ArrowContainer = styled.div`
  position: relative;
  height: 100px;
`;

const PreviewContainer = styled.div`
  position: relative;
  border-style: solid;
  border-width: 1px;
`;

export const Style = {
  PreviewContainer,
  ArrowContainer,
  Arrow
};
