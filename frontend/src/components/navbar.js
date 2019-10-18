import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { GoogleLogin, GoogleLogout } from "react-google-login";

const NavBar = props => {
  const { onSigninSuccess, onSigninFail, onSignout, user } = props;
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand as={Link} to="/">
        Short URL
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/">
          Home
        </Nav.Link>
        {user ? (
          <GoogleLogout
            render={renderProps => (
              <Nav.Link
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Sign Out
              </Nav.Link>
            )}
            buttonText="Sign Out"
            clientId={process.env.REACT_APP_CLIENT_ID}
            onLogoutSuccess={onSignout}
          />
        ) : (
          <GoogleLogin
            render={renderProps => (
              <Nav.Link
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Sign In
              </Nav.Link>
            )}
            clientId={process.env.REACT_APP_CLIENT_ID}
            buttonText="Sign In"
            onSuccess={onSigninSuccess}
            onFailure={onSigninFail}
            cookiePolicy="single_host_origin"
          />
        )}
        {user && (
          <Nav.Link as={Link} to="/me">
            {user.name}
          </Nav.Link>
        )}
      </Nav>
    </Navbar>
  );
};

export default NavBar;
