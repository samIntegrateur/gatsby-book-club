import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import React, {useContext} from "react";
import {FirebaseContext} from './firebase';
import styled from 'styled-components';

// This Html / css is such a shame!!!
const LogoutLink = styled.span`
  cursor: pointer;
  text-decoration: underline;
  display: block;
  color: white;
  text-align:right;
  &:hover {
    text-decoration: underline;
  }
`;

const HeaderWrapper = styled.header`
  background: rebeccapurple;
  margin-bottom: 1.45rem;
`;

const Nav = styled.div`
  white-space: nowrap;
  > a, 
  > span {
    display: inline-block;
    vertical-align:middle;
  }
`;


const HeaderContent = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h1 {
    margin: 0;
  }
  
  div {
    text-align: right;
  }
  
  a {
    cursor: pointer;
    text-decoration: underline;
    color: white;
    text-align:right;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Divider = styled.span`
  margin: 0 0.5rem;
  padding-right: 1px;
  background-color: #ddd;
  width: 1px;
  height: 1em;
`;

const Header = ({ siteTitle }) => {

  const {firebase, user} = useContext(FirebaseContext);
  console.log('user', user);

  function handleLogout() {
    firebase.logout().then(() => navigate('/login'))
  }

  return (
    <HeaderWrapper>
      <HeaderContent>
        <h1>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
        <div>
          {!!user && !!user.email &&
            <div style={{color: '#FFC107'}}>
              <div>Hello, {user.username || user.email}</div>
              <Nav>
                {!!user.isAdmin &&
                <>
                  <Link to="/add-author">
                    Add author
                  </Link>
                  <Divider />
                  <Link to="/add-book">
                    Add book
                  </Link>
                  <Divider />
                </>
                }
                <LogoutLink onClick={handleLogout}>
                  Logout
                </LogoutLink>
              </Nav>

            </div>
          }
          { (!user || !user.email) &&
            <div>
              <Link to={"/login"}>Login</Link>
              <Divider />
              <Link to={"/register"}>Register</Link>
            </div>
          }
        </div>
      </HeaderContent>
    </HeaderWrapper>
  )

}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
