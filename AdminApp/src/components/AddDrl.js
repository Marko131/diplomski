import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import Navbar from "./Navbar";
import { Paper } from "@material-ui/core";
import FormTitle from "./FormTitle";
const AddDrl = () => {
  const [fileName, setFileName] = useState("");
  const [text, setText] = useState("");

  const submit = () => {
    Axios.post("http://localhost:8080/drl", {
      fileName: fileName,
      text: text,
    }).then((response) => alert("Rule has been successfully added"));
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          width: "50%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 100,
        }}
      >
        <Paper elevation={3}>
          <FormTitle>Add Drools file</FormTitle>
          <form style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              className="input"
              label="File name"
              variant="outlined"
              value={fileName}
              onChange={(event) => setFileName(event.target.value)}
            />
            <TextField
              className="input"
              label="Drools..."
              variant="outlined"
              multiline
              rows={4}
              value={text}
              onChange={(event) => setText(event.target.value)}
            />

            <Button
              onClick={submit}
              className="input"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </form>
        </Paper>
      </div>
    </>
  );
};

export default AddDrl;
