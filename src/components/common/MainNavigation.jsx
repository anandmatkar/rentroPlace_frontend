import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Button,
  Col,
  Image,
  Nav,
  NavDropdown,
  Navbar,
  Row,
} from "react-bootstrap";
import "./MainNavigation.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, resetAuth } from "../../ReduxToolkit/auth/authSlice";

export default function MainNavigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(resetAuth());
    navigate("/"); // Redirect to the home page
  };

  return (
    <>
      <header className="header">
        <div className="header_box">
          <div className="row">
            <div className="col-md-2 col-sm-2 col-xs-2 logo_column">
              <NavLink to={"/"}>
                <Image
                  src="/assets/images/rent91_logo.png"
                  className="rentLogo "
                />
              </NavLink>
            </div>
            <div className="col-md-5 col-sm-6 col-xs-6 search_column">
              <div className="search_form_data">
                <form role="search" className="search_form">
                  <div className="search_box">
                    <input
                      type="text"
                      placeholder="Search"
                      className="search_input"
                    />
                    <button
                      type="reset"
                      className="search_btn"
                      aria-hidden="true"
                      aria-label="reset"
                    >
                      <span className="material-symbols-outlined">search</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-5 col-sm-4 col-xs-4 nav_column">
              <Navbar
                collapseOnSelect
                expand="lg"
                className=" header_navigation"
              >
                <Navbar.Toggle
                  aria-controls="responsive-navbar-nav"
                  className="toggle_button"
                />
                <Navbar.Collapse className="navigation-block">
                  <Nav
                    variant="pills"
                    activeKey="1"
                    className="navigation-block"
                    id="responsive-navbar-nav"
                  >
                    <Nav.Item className="navigation_logos">
                      <NavLink to={"/"} className="ps-0">
                        <Image
                          src="/assets/images/rent91_logo.png"
                          className="rentLogo "
                        />
                      </NavLink>
                      <Navbar.Toggle
                        aria-controls="responsive-navbar-nav"
                        className="toggle_button"
                      />
                    </Nav.Item>
                    <NavDropdown title="Category" id="nav-dropdown">
                      <Row className="p-3">
                        {Array.from({ length: 4 }, (_, index) => (
                          <Col key={index} sm={3} md={3} className="cat-col">
                            <div className="menu_category">
                              <div className="nav-category pb-2">
                                <strong>Electronics & Computers</strong>
                              </div>
                              <ul className="subcategory-list">
                                {categories.map((category, subIndex) => (
                                  <li key={subIndex}>
                                    <Button
                                      variant="link"
                                      className="nav-sub-category"
                                    >
                                      {category}
                                    </Button>
                                  </li>
                                ))}
                                <li>
                                  <Button
                                    variant="link"
                                    className="view_more_category"
                                  >
                                    View More
                                  </Button>
                                </li>
                              </ul>
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </NavDropdown>

                    {user && localStorage.getItem("user-token") ? (
                      <>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="4"
                            title="Sign In"
                            as={NavLink}
                            to={"/shop"}
                          >
                            Shop
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Button
                            variant="default"
                            className="mx-2 profileBtn nav-link text-left"
                            as={NavLink}
                            to={"/user/show-profile"}
                          >
                            Profile
                          </Button>
                        </Nav.Item>
                        <Nav.Item>
                          <Button
                            onClick={handleLogout}
                            className="logOutBtn nav-link"
                          >
                            Log Out
                          </Button>
                        </Nav.Item>
                      </>
                    ) : (
                      <>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="4"
                            title="Sign In"
                            as={NavLink}
                            to={"/shop"}
                          >
                            Shop
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="2"
                            title="Sign In"
                            as={NavLink}
                            to={"/signin"}
                          >
                            Sign In
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="3"
                            title="Sign Up"
                            as={NavLink}
                            to={"/signup"}
                          >
                            Sign Up
                          </Nav.Link>
                        </Nav.Item>
                      </>
                    )}

                    <Nav.Item as={NavLink} to={"/user/add-rent-item"}>
                      <button type="button" className="btn rent_btn">
                        Rent
                      </button>
                    </Nav.Item>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

const categories = [
  "Cellphones & Accessories",
  "Cameras & Photo",
  "Computers & Tablets",
  "Audio & Surveillance",
  "Video Games & Consoles",
];
