import React from "react";
import styled from "styled-components";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Grid } from "../elements";
import logo from "../images/logo.png";

const Spinner = (props) => {
  return <Outer>{/* <Logo src={logo} alt="Logo" /> */}</Outer>;
};

const Outer = styled.div`
  background: white;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 100;
  left: 0;
  display: flex;
  /* align-items: center; // 세로로 센터 */
  justify-content: center; // 가로로 센터
`;

const Logo = styled.img`
  width: 258px;
  height: 150px;
`;

export default Spinner;
