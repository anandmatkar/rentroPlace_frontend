import React, { useEffect } from "react";

import CommonLayout from "../../layouts/CommonLayout";
import MetaDataPageInfo from "../../utils/metaDataInfo";
import { Col, Image, Row } from "react-bootstrap";
import "./Home.css";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getAllItems } from "../../ReduxToolkit/items/itemsSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllItems = async () => {
      const response = await dispatch(getAllItems()).unwrap();
      if (response.data.status === 200) {
        // toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    };
    fetchAllItems();
  }, [dispatch]);

  return (
    <>
      <MetaDataPageInfo
        title="Rent91 - Rent, Buy, Sell Products"
        description="Your page description"
        keywords="React, JavaScript, Web Development"
        favicon="/path/to/favicon.png"
      />

      <CommonLayout>
        <main className="fluid-container">
          <div className="home_banner">
            <Image
              src="/assets/images/banner_rent2.png"
              alt="Home_banner"
              className="desktop_banner"
              height={200}
            />
            <Image
              src="/assets/images/mobile_banner_rent.png"
              className="mobile_banner"
            />
          </div>
          <div className="featured_product pt-5 pb-2">
            <h1 className="text-center fw-bolder">Feature Renting Product</h1>
            <div className="product-list-main">
              <div className="product-list-box card pb-3 pl-4 pr-4 pb-2">
                <Row>
                  {Array.from({ length: 12 }, (_, index) => (
                    <ProductItem key={index} />
                  ))}
                </Row>
              </div>
            </div>
          </div>
        </main>
      </CommonLayout>
    </>
  );
};

export default Home;

const ProductItem = () => (
  <Col md={3} sm={4} xs={12} className="pt-5 pb-5 product_items">
    <div className="product-block px-4">
      <div className="product-transition">
        <div className="product-image">
          <img
            loading="lazy"
            width="1000"
            height="1081"
            src="https://demo2.pavothemes.com/matico/wp-content/uploads/2022/03/p_h4_20_1.jpg"
            className="attachment-shop_catalog size-shop_catalog"
            alt=""
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
              <span className="star-rating-txt fw-bold pl-2">(5 reviews)</span>
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
