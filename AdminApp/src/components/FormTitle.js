import React from "react";
import { useTheme } from "@material-ui/core/styles";

const FormTitle = (props) => {
  const theme = useTheme();
  return (
    <div
      style={{
        backgroundColor: theme.palette.primary.main,
        color: "white",
        padding: "15px 0px",
        fontSize: "20px",
      }}
    >
      {props.children}
    </div>
  );
};

export default FormTitle;
