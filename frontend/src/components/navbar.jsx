import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2>AlphaPulse</h2>
      <div>
        <Link to="/" style={styles.link}>Dashboard</Link>
        <Link to="/login" style={styles.link}>Login</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 24px",
    background: "#1f2933",
    color: "#fff",
  },
  link: {
    color: "#fff",
    marginLeft: "16px",
    textDecoration: "none",
  },
};

export default Navbar;
