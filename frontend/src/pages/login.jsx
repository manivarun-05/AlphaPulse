function Login() {
  return (
    <div style={{ padding: "24px" }}>
      <h1>Login</h1>

      <input placeholder="Email" style={input} />
      <br /><br />
      <input placeholder="Password" type="password" style={input} />
      <br /><br />
      <button style={button}>Login</button>
    </div>
  );
}

const input = {
  padding: "8px",
  width: "250px",
};

const button = {
  padding: "8px 16px",
};

export default Login;
