import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

// Images
import brandIcon from "../assets/images/brand-icon.png";
import Button from "react-bootstrap/Button";
import InstructionsModal from "./InstructionsModal";

const CustomNavbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Navbar expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand href="/rosters">
            <img src={brandIcon} alt="Brand Icon" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="custom-navbar-nav" id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/rosters">Home</Nav.Link>
              {/* <Nav.Link href="/about">About</Nav.Link> */}
              <Nav.Link href="/rosters">Rosters</Nav.Link>
              {/* <Nav.Link href="/contact">Contact</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
          {user ? (
            <Navbar.Collapse className="justify-content-end">
              <div className="d-flex">
              <Button
                className="logout-btn"
                variant="danger"
                onClick={handleLogout}
              >
                Log Out
              </Button>
              <InstructionsModal />
              </div>
            </Navbar.Collapse>
          ) : (
            <>
              <Navbar.Collapse className="justify-content-end">
                <div className="d-flex">
                <Nav.Link href="/login">
                  <Button className="login-btn" variant="light">
                    Login
                  </Button>
                </Nav.Link>
                {/* <Nav.Link href="/signup">
                <Button className="signup-btn" variant="light">
                  Sign Up
                </Button>
              </Nav.Link> */}
                <InstructionsModal />
                </div>
              </Navbar.Collapse>
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default CustomNavbar;
