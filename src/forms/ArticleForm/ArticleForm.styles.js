import styled from "styled-components";


const ItemIdContainer = styled.div`
  color: #C1C1C1;
`;

const LinkContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 5px;

  &:hover {
    cursor: pointer;
  }
`;

const LinkPopupButton = styled.button`
  position: relative;
  display: inline-block;
  aspect-ratio: 1 / 1;
  height: 24px;
  vertical-align: middle;

  border-style: none;

  &:hover {
    cursor: pointer;
  }
`;

const LinkPopupIcon = styled.img`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
`;

const SourceContainer = styled.div`
  position: relative;
`;

const EditableTextPlaceholder = styled.span`
  color: #CCCCCC;
`;

const TagRemovalHint = styled.span`
  color: #808080;
  font-size: 14px;
`;

export const Styles = {
  ItemIdContainer,
  LinkContainer,
  LinkPopupButton,
  LinkPopupIcon,
  SourceContainer,
  EditableTextPlaceholder,
  TagRemovalHint
};
