import React from "react";

import { useSelector } from "react-redux";

const Permit = (props) => {
  const is_login = useSelector((state) => state.user.user);

  const is_session = document.cookie ? true : false;

  if (document.cookie) {
    return <>{props.children}</>;
  }
  return null;
};

export default Permit;
