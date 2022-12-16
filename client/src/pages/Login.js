import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <>
      <Container className="mt-3">
        <Form className="login" onSubmit={handleSubmit}>
          <h4>Demo Login</h4>
          <Form.Group className="mb-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <Form.Text muted>
              Demo email is: <strong>demo-user@demo-email.com</strong>
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <Form.Text muted>
              Demo password is: <strong>Demo-Password123?</strong>
            </Form.Text>
          </Form.Group>

          <Button type="submit">Login</Button>

          {/* <h3>Login</h3>
          <label>Email: </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label>Password: </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button disabled={isLoading}>Login</button>
          {error && <div className="error">{error}</div>} */}
        </Form>
      </Container>
    </>
  );
};

export default Login;
