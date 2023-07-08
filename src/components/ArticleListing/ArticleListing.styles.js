import styled from "styled-components";

const WarningIcon = styled.img`
  filter: invert(21%) sepia(87%) saturate(2334%) hue-rotate(336deg) brightness(101%) contrast(89%);
`;

const ArticleSourceSpan = styled.span`
  color: #0366DE;
  text-decoration: underline;

  &:hover {
    cursor: pointer;
  }
`;

export const Styles = {
  WarningIcon,
  ArticleSourceSpan
};