// RenterHome.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Slider } from "antd";
import "./UserHome.css";

import UserLayout from "../../../layouts/UserLayout";
import MetaDataPageInfo from "../../../utils/metaDataInfo";
import { Col, Form, InputGroup, ListGroup, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import removeAuthenticationToken from "../../../utils/removeAuthenticationToken";
import { getAllItems } from "../../../ReduxToolkit/items/itemsSlice";

const UserHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showFilter, setShowFilter] = useState(false);

  const handleToggle = () => {
    setShowFilter(!showFilter);
    document.body.style.overflow = !showFilter ? "hidden" : "unset";
  };

  const [sliderValues, setSliderValues] = useState([20, 50]);

  const handleSliderChange = (values) => {
    setSliderValues(values);
  };

  useEffect(() => {
    const fetchAllItems = async () => {
      const response = await dispatch(getAllItems()).unwrap();
      // console.log(response);
      if (response.data.status === 200) {
        // toast.success(response.data.message);
      } else if (response.data.status === 401) {
        toast.error(response.data.message);
        removeAuthenticationToken();
        navigate("/signin");
      } else {
        toast.error(response.data.message);
      }
    };
    fetchAllItems();
  }, [dispatch, navigate]);

  return (
    <>
      <MetaDataPageInfo
        title="Rent91 - Shop Home"
        description="Your page description"
        keywords="React, JavaScript, Web Development"
        favicon="/path/to/favicon.png"
      />

      <UserLayout>
        <main className="fluid-container">
          <div className="featured_product pt-5 pb-2">
            <h1 className="text-center fw-bolder pb-2">Renting Products</h1>
            <Row>
              <Col md={3} sm={4}></Col>
              <Col md={9} sm={12} className="pt-3">
                <Row>
                  <Col xs={4} md={8} sm={8}>
                    <button
                      onClick={handleToggle}
                      className="toggle-button shopLeftSidebar"
                    >
                      <span className="material-symbols-outlined">tune</span>
                    </button>
                  </Col>
                  <Col xs={8} md={4} sm={4}>
                    <Form.Select aria-label="Default select example">
                      <option>Default sorting</option>
                      <option value="1">Sort by popularity</option>
                      <option value="2">Sort by average rating</option>
                      <option value="3">Sort by latest</option>
                      <option value="4">Sort by price: low to high</option>
                      <option value="5">Sort by price: high to low</option>
                    </Form.Select>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row className="p-3 m-auto">
              <Col
                md={3}
                sm={4}
                className={`filter-container ${showFilter ? "visible" : ""}`}
              >
                <div className="Filter_box ">
                  <div className="card px-3 pt-3 pb-5 left_sidebar_card">
                    <button
                      onClick={handleToggle}
                      className="toggle-button shopLeftSidebar text-left"
                    >
                      <span className="material-symbols-outlined">close</span>
                    </button>
                    <Form>
                      <h5 className="pt-3 pb-3">
                        <strong>Product Categories</strong>
                      </h5>
                      <InputGroup className="mb-2 w-100 cat_inputGropu">
                        <InputGroup.Checkbox
                          aria-label="Checkbox for following text input"
                          className="cat_checkbox"
                        />
                        <InputGroup.Text className="cat_label">
                          Cellphones & Accessories
                        </InputGroup.Text>
                      </InputGroup>
                      <InputGroup className="mb-2 w-100 cat_inputGropu">
                        <InputGroup.Checkbox
                          aria-label="Checkbox button for following text input"
                          className="cat_checkbox"
                        />
                        <InputGroup.Text className="cat_label">
                          Cameras & Photo
                        </InputGroup.Text>
                      </InputGroup>
                      <InputGroup className="mb-2 w-100 cat_inputGropu">
                        <InputGroup.Checkbox
                          aria-label="Checkbox button for following text input"
                          className="cat_checkbox"
                        />
                        <InputGroup.Text className="cat_label">
                          Computers & Tablets
                        </InputGroup.Text>
                      </InputGroup>
                      <InputGroup className="mb-2 w-100 cat_inputGropu">
                        <InputGroup.Checkbox
                          aria-label="Checkbox button for following text input"
                          className="cat_checkbox"
                        />
                        <InputGroup.Text className="cat_label">
                          Audio & Surveillance
                        </InputGroup.Text>
                      </InputGroup>
                      <InputGroup className="mb-2 w-100 cat_inputGropu">
                        <InputGroup.Checkbox
                          aria-label="Checkbox button for following text input"
                          className="cat_checkbox"
                        />
                        <InputGroup.Text className="cat_label">
                          Video Games & Consoles
                        </InputGroup.Text>
                      </InputGroup>
                      {/* end Product Categories */}
                      <h5 className="pt-5 pb-3">
                        <strong>Price</strong>
                      </h5>
                      <div className="rangeSlider">
                        {/* antd slider */}
                        <Slider
                          range
                          defaultValue={[20, 50]}
                          onChange={handleSliderChange}
                        />
                        <p className="rangePrice">
                          Price: ₹
                          <span className="minPrice">{sliderValues[0]}</span>- ₹
                          <span className="maxPrice">{sliderValues[1]}</span>
                        </p>
                        <button className="priceFilterBtn btn mt-3">
                          Filter
                        </button>
                      </div>
                      <h5 className="pt-5 pb-3">
                        <strong>Product Brand</strong>
                      </h5>
                      <InputGroup className="mb-2 w-100 cat_inputGropu">
                        <InputGroup.Checkbox
                          aria-label="Checkbox for following text input"
                          className="cat_checkbox"
                        />
                        <InputGroup.Text className="cat_label">
                          Apple
                        </InputGroup.Text>
                      </InputGroup>
                      <InputGroup className="mb-2 w-100 cat_inputGropu">
                        <InputGroup.Checkbox
                          aria-label="Checkbox button for following text input"
                          className="cat_checkbox"
                        />
                        <InputGroup.Text className="cat_label">
                          Google
                        </InputGroup.Text>
                      </InputGroup>
                      <InputGroup className="mb-2 w-100 cat_inputGropu">
                        <InputGroup.Checkbox
                          aria-label="Checkbox button for following text input"
                          className="cat_checkbox"
                        />
                        <InputGroup.Text className="cat_label">
                          LG
                        </InputGroup.Text>
                      </InputGroup>
                      <InputGroup className="mb-2 w-100 cat_inputGropu">
                        <InputGroup.Checkbox
                          aria-label="Checkbox button for following text input"
                          className="cat_checkbox"
                        />
                        <InputGroup.Text className="cat_label">
                          Microsoft
                        </InputGroup.Text>
                      </InputGroup>
                      <InputGroup className="mb-2 w-100 cat_inputGropu">
                        <InputGroup.Checkbox
                          aria-label="Checkbox button for following text input"
                          className="cat_checkbox"
                        />
                        <InputGroup.Text className="cat_label">
                          Nokia
                        </InputGroup.Text>
                      </InputGroup>
                      {/* end Product Brand */}
                      <h5 className="pt-5 pb-3">
                        <strong>Gender </strong>
                      </h5>
                      <ListGroup
                        className="d-flex flex-wrap sizeFilter"
                        horizontal
                      >
                        <ListGroup.Item className="mr-2 active">
                          Male
                        </ListGroup.Item>
                        <ListGroup.Item className="mr-2">Female</ListGroup.Item>
                        <ListGroup.Item className="mr-2">Other</ListGroup.Item>
                      </ListGroup>
                      {/* Gender */}
                      <h5 className="pt-5 pb-3">
                        <strong>Size</strong>
                      </h5>
                      <ListGroup
                        className="d-flex flex-wrap sizeFilter"
                        horizontal
                      >
                        <ListGroup.Item className="mr-2 active">
                          L
                        </ListGroup.Item>
                        <ListGroup.Item className="mr-2">M</ListGroup.Item>
                        <ListGroup.Item className="mr-2">S</ListGroup.Item>
                        <ListGroup.Item className="mr-2">XL</ListGroup.Item>
                      </ListGroup>
                      {/* end Size */}
                      <h5 className="pt-5 pb-3">
                        <strong>Color</strong>
                      </h5>
                      <ListGroup
                        className="d-flex flex-wrap colorFilter"
                        horizontal
                      >
                        <ListGroup.Item
                          className="mr-2 active"
                          style={{ background: "red" }}
                        ></ListGroup.Item>
                        <ListGroup.Item
                          className="mr-2 "
                          style={{ background: "pink" }}
                        ></ListGroup.Item>
                        <ListGroup.Item
                          className="mr-2 "
                          style={{ background: "black" }}
                        ></ListGroup.Item>
                        <ListGroup.Item
                          className="mr-2 "
                          style={{ background: "green" }}
                        ></ListGroup.Item>
                      </ListGroup>
                      {/* end Color */}
                      <h5 className="pt-5 pb-3">
                        <strong>Product Rating</strong>
                      </h5>
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
                        <span className="star-rating-txt fw-bold pl-2">
                          (50)
                        </span>
                      </div>
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
                        <span className="material-symbols-outlined star-rating">
                          star
                        </span>
                        <span className="star-rating-txt fw-bold pl-2">
                          (60)
                        </span>
                      </div>
                      <div className="rating d-flex align-items-center pb-2">
                        <span className="material-symbols-outlined star-rating star-rating-fill">
                          star
                        </span>
                        <span className="material-symbols-outlined star-rating star-rating-fill">
                          star
                        </span>
                        <span className="material-symbols-outlined star-rating star-rating-fill">
                          star
                        </span>
                        <span className="material-symbols-outlined star-rating">
                          star
                        </span>
                        <span className="material-symbols-outlined star-rating">
                          star
                        </span>
                        <span className="star-rating-txt fw-bold pl-2">
                          (70)
                        </span>
                      </div>
                    </Form>
                  </div>
                </div>
              </Col>
              <style jsx>
                {`
                  .filter-container {
                    display: none;
                  }

                  @media (max-width: 1024px) {
                    .filter-container.visible {
                      display: ${showFilter ? "block" : "none"};
                    }
                  }

                  @media (min-width: 1025px) {
                    .filter-container {
                      display: block;
                    }
                  }
                `}
              </style>
              <Col md={9} sm={12}>
                <div className="ShopProduct-list">
                  <div className="ShopProduct-list-box card pb-3 pl-3 pr-3 pb-2">
                    <Row>
                      {Array.from({ length: 12 }, (_, index) => (
                        <ProductItem key={index} />
                      ))}
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </main>
      </UserLayout>
    </>
  );
};

export default UserHome;

// product item
const ProductItem = () => {
  return (
    <Col md={4} sm={6} xs={12} className="pt-4 pb-4 ShopProduct_items">
      <div className="ShopProduct-block px-4">
        <div className="product-transition">
          <div className="product-image">
            <img
              loading="lazy"
              width="1000"
              height="1081"
              src="https://demo2.pavothemes.com/matico/wp-content/uploads/2022/03/p_h4_20_1.jpg"
              className="attachment-shop_catalog size-Shop_catalog"
              alt="product img"
              decoding="async"
              srcSet="https://demo2.pavothemes.com/matico/wp-content/uploads/2022/03/p_h4_20_1.jpg 1000w, https://demo2.pavothemes.com/matico/wp-content/uploads/2022/03/p_h4_20_1-278x300.jpg 278w, https://demo2.pavothemes.com/matico/wp-content/uploads/2022/03/p_h4_20_1-947x1024.jpg 947w, https://demo2.pavothemes.com/matico/wp-content/uploads/2022/03/p_h4_20_1-768x830.jpg 768w, https://demo2.pavothemes.com/matico/wp-content/uploads/2022/03/p_h4_20_1-600x649.jpg 600w"
              sizes="(max-width: 1000px) 100vw, 1000px"
            />
          </div>
          <div className="group-action">
            <div className="shop-action">
              <div className="rating d-flex align-items-center">
                <span className="material-symbols-outlined star-rating">
                  star
                </span>
                <span className="material-symbols-outlined star-rating">
                  star
                </span>
                <span className="material-symbols-outlined star-rating">
                  star
                </span>
                <span className="material-symbols-outlined star-rating">
                  star
                </span>
                <span className="material-symbols-outlined star-rating">
                  star
                </span>
                <span className="star-rating-txt fw-bold pl-2">
                  (5 reviews)
                </span>
              </div>
              <div className="product_name fw-normal">
                Lorem Ipsum is simply dummy
              </div>
              <div className="product_price fw-bolder pb-3">₹128.22</div>
              <div className="product_buttons">
                <button className="rental_btn btn btn-primary">Rent</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
};
