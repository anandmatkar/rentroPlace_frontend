import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Breadcrumb,
  Tab,
  Tabs,
  Carousel,
  Image,
  Form,
  InputGroup,
  Button,
  Table,
} from "react-bootstrap";
import "./ProductDetails.css";
import UserLayout from "../../../layouts/UserLayout";

function ProductDetails() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };
  return (
    <>
      <UserLayout>
        <main className="fluid-container">
          <div className="singleProductData">
            <Row>
              <Col>
                <Breadcrumb>
                  <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                  <Breadcrumb.Item href="#"> Shop </Breadcrumb.Item>
                  <Breadcrumb.Item active>Electronic Items </Breadcrumb.Item>
                </Breadcrumb>
              </Col>
            </Row>
            <Row className="pb-4">
              <Col md={5} sm={6} xs={12}>
                <div className="product_details">
                  <Carousel
                    className="card"
                    activeIndex={selectedImageIndex}
                    onSelect={handleThumbnailClick}
                  >
                    <Carousel.Item>
                      <img
                        className="d-block w-100 productImage"
                        src="https://demo2.pavothemes.com/matico/wp-content/uploads/2022/03/p_h4_20_1.jpg"
                        alt="First slide"
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block w-100 productImage"
                        src="https://demo2.pavothemes.com/matico/wp-content/uploads/2022/03/p_h4_20_1.jpg"
                        alt="Second slide"
                      />
                    </Carousel.Item>
                  </Carousel>
                  <div className="pt-2">
                    <div className="d-flex">
                      <div className="p-1">
                        <img
                          src="https://demo2.pavothemes.com/matico/wp-content/uploads/2022/03/p_h4_20_1.jpg"
                          className={`img-thumbnail ${
                            selectedImageIndex === 0 && "selected-thumbnail"
                          }`}
                          alt="Thumbnail 1"
                          onClick={() => handleThumbnailClick(0)}
                        />
                      </div>
                      <div className="p-1">
                        <img
                          src="https://demo2.pavothemes.com/matico/wp-content/uploads/2022/03/p_h4_20_1.jpg"
                          className={`img-thumbnail ${
                            selectedImageIndex === 1 && "selected-thumbnail"
                          }`}
                          alt="Thumbnail 2"
                          onClick={() => handleThumbnailClick(1)}
                        />
                      </div>
                    </div>
                  </div>

                  <Card.Body></Card.Body>
                  <Card.Footer>
                    <Tab.Container
                      id="product-details-tabs"
                      defaultActiveKey="description"
                    ></Tab.Container>
                  </Card.Footer>
                </div>
              </Col>
              <Col md={7} sm={6} xs={12}>
                <div className="availability">
                  <label className="inStock">IN STOCK </label>
                </div>
                <h2 className="pt-3">
                  <strong>Lorem Ipsum is simply </strong>
                </h2>
                <div className="product_price pt-3 pb-3">
                  ₹<span className="productPrice">200</span>
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>

                <Table>
                  <tbody>
                    <tr>
                      <td>Category:</td>
                      <td>
                        <strong>Electronic</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>Deposit Price:</td>
                      <td>
                        <strong>₹500</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>Rental Price:</td>
                      <td>
                        <strong>₹200</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>Availability Status:</td>
                      <td>
                        <strong>Available</strong>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row className="pb-4">
              <Col xs={12} className="text-center m-auto tabsContent">
                <div className="card text-left p-5 productCard">
                  <Row>
                    <Col md={12}>
                      <Tabs
                        defaultActiveKey="description"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                      >
                        <Tab
                          eventKey="description"
                          title="Description"
                          className="pl-5 pr-5 pt-3 pb-3"
                        >
                          <p className="productDescription">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                          </p>
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                          </p>
                        </Tab>
                        <Tab eventKey="reviews" title="Reviews (2)">
                          <div className="allRating pb-5">
                            <Row>
                              <Col md={1} sm={2} xs={3}>
                                <div>
                                  <Image
                                    src="https://secure.gravatar.com/avatar/8eb1b522f60d11fa897de1dc6351b7e8?s=120&d=mm&r=g"
                                    className=" m-auto reviewAvtar"
                                    alt="Review Avtar"
                                    height="60"
                                    width="60"
                                  />
                                </div>
                              </Col>
                              <Col md={11} sm={10} xs={9}>
                                <div className="ratingBox">
                                  <div className="rating d-flex align-items-center  pb-2">
                                    <span className="material-symbols-outlined star-rating star-rating-fill">
                                      star
                                    </span>
                                    <span className="material-symbols-outlined star-rating star-rating-fill">
                                      star
                                    </span>
                                    <span className="material-symbols-outlined star-rating star-rating-fill">
                                      star
                                    </span>
                                    <span className="material-symbols-outlined star-rating star-rating-fill">
                                      star
                                    </span>
                                    <span className="material-symbols-outlined star-rating star-rating-fill">
                                      star
                                    </span>
                                  </div>
                                  <div className="d-flex reviewNameDate">
                                    <div className="review_name">
                                      <strong>Join Hiddleston</strong>
                                    </div>
                                    <div className="review_date px-3">
                                      March 14, 2022
                                    </div>
                                  </div>
                                  <br />
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col md={1} sm={2} xs={0}></Col>
                              <Col md={11} sm={10} xs={12}>
                                <div className="reviewTxt">
                                  Lorem Ipsum is simply dummy text of the
                                  printing and typesetting industry. Lorem Ipsum
                                  has been the industry's standard dummy text
                                  ever since the 1500s, when an unknown printer
                                  took a galley of type and scrambled it to make
                                  a type specimen book.
                                </div>
                              </Col>
                            </Row>
                          </div>
                          <div className="allRating pb-5">
                            <Row>
                              <Col md={1} sm={2} xs={3}>
                                <div>
                                  <Image
                                    src="https://secure.gravatar.com/avatar/8eb1b522f60d11fa897de1dc6351b7e8?s=120&d=mm&r=g"
                                    className=" m-auto reviewAvtar"
                                    alt="Review Avtar"
                                    height="60"
                                    width="60"
                                  />
                                </div>
                              </Col>
                              <Col md={11} sm={10} xs={9}>
                                <div className="ratingBox">
                                  <div className="rating d-flex align-items-center  pb-2">
                                    <span className="material-symbols-outlined star-rating star-rating-fill">
                                      star
                                    </span>
                                    <span className="material-symbols-outlined star-rating star-rating-fill">
                                      star
                                    </span>
                                    <span className="material-symbols-outlined star-rating star-rating-fill">
                                      star
                                    </span>
                                    <span className="material-symbols-outlined star-rating star-rating-fill">
                                      star
                                    </span>
                                    <span className="material-symbols-outlined star-rating star-rating-fill">
                                      star
                                    </span>
                                  </div>
                                  <div className="d-flex reviewNameDate">
                                    <div className="review_name">
                                      <strong>Join Hiddleston</strong>
                                    </div>
                                    <div className="review_date px-3">
                                      March 14, 2022
                                    </div>
                                  </div>
                                  <br />
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col md={1} sm={2} xs={0}></Col>
                              <Col md={11} sm={10} xs={12}>
                                <div className="reviewTxt">
                                  Lorem Ipsum is simply dummy text of the
                                  printing and typesetting industry. Lorem Ipsum
                                  has been the industry's standard dummy text
                                  ever since the 1500s, when an unknown printer
                                  took a galley of type and scrambled it to make
                                  a type specimen book.
                                </div>
                              </Col>
                            </Row>
                          </div>

                          <div className="ratingForm">
                            <Row>
                              <Col className="ratingCol">
                                <Form>
                                  <Row>
                                    <Col md={12}>
                                      <div className="rating d-flex align-items-center  pb-3">
                                        <span className="ratingText pr-4">
                                          <strong>Your Rating*</strong>
                                        </span>
                                        <span className="material-symbols-outlined star-rating star-rating-fill">
                                          star
                                        </span>
                                        <span className="material-symbols-outlined star-rating star-rating-fill">
                                          star
                                        </span>
                                        <span className="material-symbols-outlined star-rating star-rating-fill">
                                          star
                                        </span>
                                        <span className="material-symbols-outlined star-rating star-rating-fill">
                                          star
                                        </span>
                                        <span className="material-symbols-outlined star-rating star-rating-fill">
                                          star
                                        </span>
                                      </div>
                                    </Col>
                                    <Col md={12} className="pb-3">
                                      <Form.Control
                                        as="textarea"
                                        placeholder="Your Review*"
                                        rows={5}
                                      />
                                    </Col>
                                    <Col md={6} className="pb-3">
                                      <Form.Control
                                        type="text"
                                        placeholder="Name*"
                                      />
                                    </Col>
                                    <Col md={6}>
                                      <Form.Control
                                        type="email"
                                        placeholder="Email*"
                                      />
                                    </Col>
                                    <Col md={12} className="pt-3">
                                      <InputGroup className="mb-3 checkboxGroup">
                                        <InputGroup.Checkbox
                                          aria-label="Checkbox for following text input"
                                          className="confirmCheckbox"
                                        />
                                        <span className="pl-4">
                                          Save my name, email, and website in
                                          this browser for the next time I
                                          comment.
                                        </span>
                                      </InputGroup>
                                    </Col>
                                    <Col md={12}>
                                      <Button className="btn reviewBtn">
                                        Submit
                                      </Button>
                                    </Col>
                                  </Row>
                                </Form>
                              </Col>
                            </Row>
                          </div>
                        </Tab>
                      </Tabs>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </main>
      </UserLayout>
    </>
  );
}

export default ProductDetails;
