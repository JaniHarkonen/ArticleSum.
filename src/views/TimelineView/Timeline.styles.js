import styled from "styled-components";


const TimelineContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  user-select: none;
`;

const SlotCarouselContainer = styled.div`
  position: relative;
  width: 150%;
  height: 100%;
`;

const SlotContainer = styled.div`
  position: relative;
  display: inline-block;
  vertical-align: bottom;
  height: 100%;
`;

export const Styles = {
  TimelineContainer,
  SlotContainer,
  SlotCarouselContainer
};
