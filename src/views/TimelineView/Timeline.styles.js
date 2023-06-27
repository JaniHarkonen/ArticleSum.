import styled from "styled-components";


const TimelineContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  user-select: none;
`;

const SlotCarouselContainer = styled.div`
  position: relative;
  /* width found in Timeline.js */
  height: 100%;
`;

const SlotContainer = styled.div`
  position: relative;
  display: inline-block;
  vertical-align: top;
  /* width found in Timeline.js */
  height: 100%;
`;

export const Styles = {
  TimelineContainer,
  SlotContainer,
  SlotCarouselContainer
};
