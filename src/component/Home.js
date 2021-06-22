import "./Home.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Product from "./Product.js";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Container } from "@material-ui/core";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home(props) {
  const products = useSelector((state) => state.products);

  const dispatch = useDispatch();

  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,

          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const settings2 = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,

          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="home">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <img
            className="home__pic"
            src="https://holame.net/wp-content/uploads/2020/12/Merry-Chrismas.jpg"
          />
        </Grid>
        <Grid
          item
          xs={10}
          container
          direction="row"
          alignItems="flex-start"
          justify="space-around"
          style={{ padding: "50px", margin: "auto" }}
        >
          <Grid
            container
            item
            xs={12}
            sm={4}
            justify="center"
            alignItems="flex-start"
            direction="row"
            style={{
              color: "orange",
            }}
          >
            <Grid item xs={12} md={2}>
              <Typography variant="h3" gutterBottom style={{ fontWeight: 800 }}>
                1.
              </Typography>
            </Grid>
            <Grid item xs={12} md={10}>
              <Typography variant="h5" gutterBottom style={{ fontWeight: 600 }}>
                Giao hàng.
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                style={{ width: "60%" }}
              >
                Giao hàng COD thu tiền tại nhà, kiểm tra khi nhận hàng.
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={4}
            justify="center"
            alignItems="flex-start"
            direction="row"
            style={{ color: "orange" }}
          >
            <Grid item xs={12} md={2}>
              <Typography variant="h3" gutterBottom style={{ fontWeight: 800 }}>
                2.
              </Typography>
            </Grid>
            <Grid item xs={12} md={10}>
              <Typography variant="h5" gutterBottom style={{ fontWeight: 600 }}>
                Đổi trả.
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                style={{ width: "60%" }}
              >
                Miễn phí đổi trả hàng lỗi, sai mẫu, vỡ hỏng khi vận chuyển.
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={4}
            justify="center"
            alignItems="flex-start"
            direction="row"
            style={{ color: "orange" }}
          >
            <Grid item xs={12} md={2}>
              <Typography variant="h3" gutterBottom style={{ fontWeight: 800 }}>
                3.
              </Typography>
            </Grid>
            <Grid item xs={12} md={10}>
              <Typography variant="h5" gutterBottom style={{ fontWeight: 600 }}>
                Hỗ trợ.
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                style={{ width: "60%" }}
              >
                Luôn sẵn lòng hỗ trợ khách hàng nhiệt tình 7 ngày trong tuần.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={10}
          container
          direction="row"
          alignItems="center"
          justify="space-evenly"
          style={{ margin: "auto" }}
        >
          <Grid item xs={12} md={6} style={{ padding: "10px" }}>
            <Link to="/category/kitchenUtensils" exact>
              <img
                src="https://i.imgur.com/kDfzA85.jpg"
                style={{ width: "100%" }}
              ></img>
            </Link>
          </Grid>
          <Grid item xs={12} md={6} style={{ padding: "10px" }}>
            <Link to="/category/homeDecor" exact>
              <img
                src="https://i.imgur.com/KLWJUh3.jpg"
                style={{ width: "100%" }}
              ></img>
            </Link>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          justify="center"
          direction="row"
          style={{ marginBottom: "20px" }}
        >
          <Grid item xs={12}>
            <Typography
              variant="h4"
              gutterBottom
              style={{ fontWeight: 800, marginBottom: "25px" }}
              align="center"
            >
              Sản Phẩm Mới Nhất
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={10}
            direction="row"
            spacing={2}
            style={{ margin: "auto" }}
          >
            {products.slice(0, 6).map((product) => (
              <Grid item xs={12} sm={6} md={4}>
                <Product
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  pic={product.pic}
                  rating={product.rating}
                  sizes={product.sizes}
                  des={product.des}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid
          item
          xs={10}
          container
          direction="row"
          alignItems="center"
          style={{ margin: "auto", marginBottom: "60px" }}
        >
          <Grid item xs={12}>
            <Typography
              variant="h4"
              gutterBottom
              style={{ fontWeight: 800, marginBottom: "25px" }}
              align="center"
            >
              Dành cho fan Yêu Bếp
            </Typography>
          </Grid>
          <Grid
            container
            item
            direction="row"
            spacing={2}
            style={{ margin: "auto" }}
          >
            <Slider {...settings2} className="home__slider">
              {products
                .filter((i) => i.category === "Đồ Dùng Nhà Bếp")
                .map((product) => (
                  <Grid item xs={12}>
                    <Product
                      id={product.id}
                      title={product.title}
                      price={product.price}
                      pic={product.pic}
                      rating={product.rating}
                      sizes={product.sizes}
                      des={product.des}
                    />
                  </Grid>
                ))}
            </Slider>
          </Grid>
        </Grid>
        <Grid
          item
          xs={10}
          container
          direction="row"
          alignItems="center"
          style={{ margin: "auto", marginBottom: "60px" }}
        >
          <Grid item xs={12}>
            <Typography
              variant="h4"
              gutterBottom
              style={{ fontWeight: 800, marginBottom: "25px" }}
              align="center"
            >
              Dành cho fan Nghiện Nhà
            </Typography>
          </Grid>
          <Grid
            container
            item
            direction="row"
            spacing={2}
            style={{ margin: "auto" }}
          >
            <Slider {...settings2} className="home__slider">
              {products
                .filter((i) => i.category === "Trang Trí Nhà Cửa")
                .map((product) => (
                  <Grid item xs={12}>
                    <Product
                      id={product.id}
                      title={product.title}
                      price={product.price}
                      pic={product.pic}
                      rating={product.rating}
                      sizes={product.sizes}
                      des={product.des}
                    />
                  </Grid>
                ))}
            </Slider>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          container
          direction="row"
          alignItems="center"
          style={{ margin: "auto", marginBottom: "35px" }}
        >
          <Grid item xs={12}>
            <Typography
              variant="h4"
              gutterBottom
              style={{ fontWeight: "bold", marginBottom: "25px" }}
              align="center"
            >
              #Feedback từ trái tim
            </Typography>
          </Grid>
          <Slider {...settings} className="home__slider">
            <Grid item xs={12}>
              <img
                className="home__pic"
                src="https://holame.net/wp-content/uploads/2020/11/am-chen-600x600.jpg"
              ></img>
            </Grid>
            <Grid item xs={12}>
              <img
                className="home__pic"
                src="https://holame.net/wp-content/uploads/2020/11/binh-hoa-su-men-decor-hinh-chan-vay-1-600x600.jpg"
              />
            </Grid>
            <Grid item xs={12}>
              <img
                className="home__pic"
                src="https://holame.net/wp-content/uploads/2020/11/binh-gu-nhiet-600x600.jpg"
              />
            </Grid>
            <Grid item xs={12}>
              <img
                className="home__pic"
                src="https://holame.net/wp-content/uploads/2020/11/bo-bat-dia-cao-cap-pinapple-4-600x600.jpg"
              />
            </Grid>

            <Grid item xs={12}>
              <img
                className="home__pic"
                src="https://holame.net/wp-content/uploads/2020/11/chen-gia-vi-hoa-trai-1-600x600.jpg"
              />
            </Grid>
            <Grid item xs={12}>
              <img
                className="home__pic"
                src="https://holame.net/wp-content/uploads/2020/11/coc-ly-600x600.jpg"
              />
            </Grid>

            <Grid item xs={12}>
              <img
                className="home__pic"
                src="https://holame.net/wp-content/uploads/2020/11/tho-nuong-600x600.jpg"
              />
            </Grid>
            <Grid item xs={12}>
              <img
                className="home__pic"
                src="https://holame.net/wp-content/uploads/2020/11/noi-gom-600x600.jpg"
              />
            </Grid>
            <Grid item xs={12}>
              <img
                className="home__pic"
                src="https://holame.net/wp-content/uploads/2020/11/ong-dua-su-cherry-do-6-600x600.jpg"
              />
            </Grid>
          </Slider>
        </Grid>

        <Grid
          item
          xs={12}
          container
          direction="row"
          alignItems="flex-start"
          justify="space-around"
          style={{ backgroundColor: "whitesmoke" }}
        >
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            style={{ paddingTop: 20, paddingLeft: 50 }}
          >
            <Typography variant="h6" gutterBottom style={{ fontWeight: 400 }}>
              Triết lý của Holame Store
            </Typography>
            <Typography
              variant="h4"
              gutterBottom
              style={{ fontWeight: "bold" }}
            >
              We Choose Kindness
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Chúng tôi chọn sự tử tế.
            </Typography>
            <Button
              variant="contained"
              fullWidth="false"
              style={{
                backgroundColor: "orange",
                width: "fit-content",
                color: "white",
                boxShadow: "none",
                marginTop: 10,
                borderRadius: 0,
              }}
            >
              Về Holame
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            align="center"
            style={{ padding: 20 }}
          >
            <img src="https://holame.net/wp-content/uploads/2020/02/san-pham-90x90.png"></img>
            <Typography variant="h6" gutterBottom style={{ fontWeight: 600 }}>
              Phân phối sản phẩm chất lượng
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Giá thành đi đôi với chất lượng của sản phẩm
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            direction="column"
            align="center"
            style={{ padding: 20 }}
          >
            <img src="https://holame.net/wp-content/uploads/2020/02/giao-hang-90x90.png"></img>
            <Typography variant="h6" gutterBottom style={{ fontWeight: 600 }}>
              Quy trình hoạt động được tối ưu hóa
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Đặt hàng, thanh toán và vận chuyển đơn giản, nhanh chóng
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            direction="column"
            align="center"
            style={{ padding: 30 }}
          >
            <img src="https://holame.net/wp-content/uploads/2020/02/tu-van-90x90.png"></img>
            <Typography variant="h6" gutterBottom style={{ fontWeight: 600 }}>
              Chăm sóc khách hàng tận tâm
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Tư vấn viên nhiệt tình, năng động, Hỗ trợ 24/7
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
