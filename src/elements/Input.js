import React from "react";
import styled from "styled-components";
import { Text } from "../elements";

const Input = (props) => {
  const {
    label,
    type,
    placeholder,
    value,
    defaultValue,
    _onChange,
    is_submit,
    _onSubmit,
    textarea,
    margin,
    width,
  } = props;

  if (is_submit) {
    return (
      <label>
        <Text margin="5px 0" bold>
          {label}
        </Text>
        <InputField
          type={type}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={_onChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              _onSubmit(e);
            }
          }}
          style={{ margin, width }}
        />
      </label>
    );
  } else if (textarea) {
    return (
      <label>
        <Text margin="5px 0" bold>
          {label}
        </Text>
        <TextAreaField
          value={value}
          rows={10}
          placeholder={placeholder}
          onChange={_onChange}
        />
      </label>
    );
  } else {
    return (
      <label>
        <Text margin="5px 0" bold>
          {label}
        </Text>
        <InputField
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={_onChange}
          style={{ margin, width }}
        />
      </label>
    );
  }
};

Input.defaultProps = {
  label: false,
  type: "text",
  placeholder: "입력해주세용!",
  value: "",
  defaultValue: "",
  is_submit: false,
  is_upload: false,
  _onChange: () => {},
  _onSubmit: () => {},
  margin: false,
  width: false,
};

const InputField = styled.input`
  ${(props) => (props.width ? `width: ${props.width};` : `width: 100%;`)}
  min-width: 230px;
  box-sizing: border-box;
  padding: 10px;
  border: 2px solid #acacac;
  border-radius: 3px;
  ${(props) =>
    props.margin ? `margin: ${props.margin};` : `margin-bottom: 20px;`}
  font-family: inherit; // font 상속

  &:focus {
    outline: none;
    border: 2px solid #61b165;
  }

  @media (max-width: 280px) {
    min-width: 150px;
  }
`;

const TextAreaField = styled.textarea`
  ${(props) => (props.is_upload ? `display: none;` : "")}
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 2px solid #acacac;
  border-radius: 3px;
  margin-bottom: 20px;
  font-family: inherit; // font 상속
  &:focus {
    outline: none;
    border: 2px solid #61b165;
  }
`;

export default Input;
