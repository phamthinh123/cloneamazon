import React, { useEffect, useState } from "react";
import "./ProductDetailComponent.css";
import * as actions from "../redux/actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { Grid, Typography } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ReactImageMagnify from "react-image-magnify";
function ProductDetailComponent({
  id,
  title,
  price,
  pic,
  rating,
  sizes,
  des,
  srcs,
  product,
}) {
  const [size, setSize] = useState("");

  const [src, setSrc] = useState(srcs[0]);
  useEffect(() => {
    setSrc(srcs[0]);
  }, [id]);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const addBasket = () => {
    dispatch(
      actions.addToBasket(
        {
          id,
          title,
          price,
          pic,
          rating,
          size,
          des,
        },
        quantity
      )
    );
  };
  const updateQuantityBasket = (value) => {
    if (value > 0) {
      setQuantity(value);
    }
  };
  const handleClick = (i) => {
    setSize(i);
    setQuantity(1);
  };
  return (
    <div className="productdetailcomponent">
      <Grid container direction="row" spacing={2} style={{ padding: 30 }}>
        <Grid
          item
          container
          xs={12}
          md={6}
          direction="row"
          alignItems="flex-start"
          justify="center"
        >
          <Grid
            item
            xs={12}
            container
            direction="row"
            alignItems="flex-start"
            justify="center"
          >
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,

                  src: src,
                },
                largeImage: {
                  src: src,

                  width: 1200,
                  height: 1800,
                },

                lensStyle: {
                  cursor: "pointer",
                  width: 0,
                  height: 0,
                },
                isHintEnabled: true,
                shouldHideHintAfterFirstActivation: false,
                shouldUsePositiveSpaceLens: true,
                enlargedImageContainerStyle: {
                  left: 0,
                  marginLeft: 0,
                },
              }}
            />

            {srcs.map((i, key) => (
              <Grid item xs={3}>
                <img
                  src={i}
                  className={`pic__size ${src == i && "pic__active"}`}
                  onClick={() => setSrc(i)}
                  index={key}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          direction="column"
          container
          style={{
            padding: 30,
            marginTop: 7,
            border: "1.5px solid rgba(0,0,0,0.1)",
            borderRadius: 10,
            boxShadow: "0px 0px 2px rgba(0,0,0,0.1)",
          }}
        >
          <Grid item xs={12}>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
              style={{ marginBottom: 10 }}
            >
              <Link
                color="inherit"
                to="/"
                underline="none"
                style={{
                  fontWeight: 800,
                }}
              >
                Trang Chủ
              </Link>
              <Link
                color="inherit"
                to={`/category/${product.category}`}
                underline="none"
              >
                {product.category}
              </Link>
              <Typography variant="h6" gutterBottom color="textPrimary">
                {product.title}
              </Typography>
            </Breadcrumbs>
          </Grid>
          <Grid item xs={12} container direction="column">
            <Grid item xs={12}>
              <Link to={`/product/${id}`} style={{ textDecoration: "none" }}>
                <Typography
                  variant="h4"
                  gutterBottom
                  color="textPrimary"
                  className="productdetailcomponent__title"
                >
                  {title}
                </Typography>
              </Link>
            </Grid>

            <Grid
              item
              container
              direction="row"
              alignItems="center"
              style={{ marginBottom: 20 }}
            >
              {Array(rating)
                .fill()
                .map((_, i) => (
                  <p>⭐</p>
                ))}
            </Grid>
            <Grid item xs={12} className="productdetailcomponent__price">
              ${price}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom color="textPrimary">
                Mô tả sản phẩm
              </Typography>
              <Typography variant="subtitle1" gutterBottom color="textPrimary">
                {des}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                gutterBottom
                color="textPrimary"
                className="productdetailcomponent__select"
              >
                Chọn size: <span>{size}</span>
              </Typography>
            </Grid>

            <Grid item xs={12} container alignItems="center" direction="row">
              {sizes.map((i, key) => (
                <Grid item>
                  <button
                    style={{ margin: 0, marginRight: 15 }}
                    className={`product__size ${
                      size == i && "product__active"
                    }`}
                    index={key}
                    onClick={() => handleClick(i)}
                  >
                    {i}
                  </button>
                </Grid>
              ))}
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                gutterBottom
                color="textPrimary"
                className="productdetailcomponent__select"
              >
                Số Lượng
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              container
              direction="row"
              alignItems="center"
              style={{ marginBottom: 20 }}
            >
              <AddIcon
                className="product__plus"
                onClick={() => updateQuantityBasket(quantity + 1)}
              />
              <span className="product__value">{quantity}</span>
              <RemoveIcon
                className="product__minius"
                onClick={() => updateQuantityBasket(quantity - 1)}
              />
            </Grid>
            <Grid item xs={12}>
              <button
                className="productdetailcomponent__button"
                onClick={addBasket}
                disabled={!size}
              >
                Thêm Vào Giỏ Hàng
              </button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <img
              className="productdetailcomponent__row"
              src="https://holame.net/wp-content/uploads/2020/10/Giao-hàng-COD-toàn-quốc-1.png"
            />
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          direction="column"
          container
          style={{
            padding: 40,
            border: "1.5px solid rgba(0,0,0,0.1)",
            borderRadius: 10,
            boxShadow: "0px 0px 2px rgba(0,0,0,0.1)",
            marginTop: 30,
            marginBottom: 30,
          }}
        >
          <Typography
            variant="h5"
            style={{ marginBottom: 15, fontWeight: "800" }}
            align="center"
          >
            CHÍNH SÁCH MUA HÀNG
          </Typography>
          <Typography
            variant="h6"
            style={{ marginBottom: 15, fontWeight: "800" }}
          >
            HÌNH THỨC THANH TOÁN
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            style={{ marginBottom: 15, fontWeight: 400 }}
          >
            Hiện tại, HOLAME hỗ trợ 2 hình thức thanh toán đơn hàng:
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            style={{ display: "flex", alignItem: "center" }}
          >
            <NavigateNextIcon />
            Thanh toán chuyển khoản ngân hàng
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            style={{ display: "flex", alignItem: "center" }}
          >
            <NavigateNextIcon />
            Thanh toán tiền mặt khi nhận hàng (COD)
          </Typography>
          <Typography
            variant="h6"
            style={{ marginBottom: 15, fontWeight: "800" }}
          >
            CHÍNH SÁCH VẬN CHUYỂN
          </Typography>
          <Typography variant="h6" gutterBottom style={{ marginBottom: 15 }}>
            Phí vận chuyển
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            style={{ display: "flex", alignItem: "center" }}
          >
            <NavigateNextIcon />
            Đồng giá 30K đơn hàng dưới 500K
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            style={{ display: "flex", alignItem: "center" }}
          >
            <NavigateNextIcon />
            Miễn phí vận chuyển đơn hàng từ 500K
          </Typography>
          <Typography variant="h6" gutterBottom style={{ marginBottom: 15 }}>
            Thời gian giao hàng
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            style={{ display: "flex", alignItem: "center" }}
          >
            <NavigateNextIcon />
            Khu vực nội thành Hà Nội và các tỉnh lân cận: Từ 1 – 2 ngày
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            style={{ display: "flex", alignItem: "center" }}
          >
            <NavigateNextIcon />
            Khu vực khác trên cả nước: 3 – 5 ngày
          </Typography>
          <Typography
            variant="h6"
            style={{ marginBottom: 15, fontWeight: "800" }}
          >
            CHÍNH SÁCH ĐỔI TRẢ
          </Typography>
          <Typography variant="body1" gutterBottom style={{ width: "50%" }}>
            Holame Store chịu 100% phí ship đổi trả trong trường hợp sản phẩm
            nhận về sai mẫu, sai màu sắc, kích thước, dung tích …. so với quảng
            cáo, bill chốt đơn hoặc rơi vỡ, biến dạng do quá trình vận chuyển.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProductDetailComponent;
