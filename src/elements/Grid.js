import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const { children, is_flex, width, padding, margin, bg, relative, _onClick, is_main, center, is_post, align, border } = props;

  const styles = {
    is_flex,
    width,
    margin,
    padding,
    bg,
    relative,
    is_main,
    center,
    is_post,
    align,
    border,
  };

  if (is_post) {
    return (
      <PostContainer {...styles} onClick={_onClick}>
        {children}
      </PostContainer>
    );
  }

  return (
    <GridContainer {...styles} onClick={_onClick}>
      {children}
    </GridContainer>
  );
};

Grid.defaultProps = {
  children: null,
  is_flex: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
  relative: false,
  center: false,
  _onClick: () => {},
  align: null,
  border: null,
};

const GridContainer = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  border-radius: 10px;
  box-sizing: border-box;
  ${(props) => (props.is_flex ? `display: flex; justify-content: space-between; align-items: center;` : "")};
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")};
  ${(props) => (props.relative ? `position: relative;` : "")};
  ${(props) => (props.center ? `text-align: center;` : "")}
  ${(props) => (props.border ? `border: ${props.border};` : "")}
`;

const PostContainer = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  border-radius: 10px;
  box-sizing: border-box;
  ${(props) => (props.is_flex ? `display: flex;` : "")};
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")};
  ${(props) => (props.center ? `text-align: center;` : "")}
  ${(props) => (props.border ? `border: ${props.border};` : "")}
`;

export default Grid;
