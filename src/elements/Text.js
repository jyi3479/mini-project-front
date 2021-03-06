import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { children, size, margin, width, bold, _onClick, is_click, center, color, point } = props;

  const styles = {
    size,
    children,
    margin,
    width,
    bold,
    is_click,
    center,
    color,
    point,
  };
  return (
    <P {...styles} onClick={_onClick}>
      {children}
    </P>
  );
};

Text.defaultProps = {
  children: null,
  size: "14px",
  margin: false,
  bold: false,
  _onClick: () => {},
  is_click: false,
  width: false,
  center: false,
  color: null,
  point: false,
};

const P = styled.p`
  word-break: break-all;
  ${(props) => (props.is_click ? `cursor: pointer;` : "")}
  font-size: ${(props) => props.size};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  font-weight: ${(props) => (props.bold ? 700 : 400)};
  ${(props) => (props.center ? `text-align: center;` : "")};
  ${(props) => (props.width ? `width: ${props.width};` : "")};
  ${(props) => (props.color ? `color: ${props.color};` : "")};
  ${(props) => (props.point ? `cursor: pointer;` : "")};
`;

export default Text;
