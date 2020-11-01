import React, { useState } from "react";
import { TextField, Button, Paper, Container } from "@material-ui/core";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import FormTitle from "./FormTitle";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const submitForm = () => {
    const payload = {
      email: email,
      password: password,
    };
    /*
    Axios.post("https://localhost:8444/login", payload).then((response) => {
      localStorage.setItem("access_token", response.data);
      
    });
    */
    history.push("/");
  };
  return (
    <Container className="form-container">
      <Paper elevation={3}>
        <FormTitle>Login</FormTitle>
        <form>
          <TextField
            label="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            label="Password"
            value={password}
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button variant="contained" color="primary" onClick={submitForm}>
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
