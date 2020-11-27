import React, { useState } from "react";
import "./ProductDetailComponent.css";
import { useStateValue } from "./StateProvider";
import * as actions from "./actions";
import { useDispatch } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { Link } from "react-router-dom";
import ReactImageMagnify from "react-image-magnify";
import ReactSlick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function ProductDetailComponent({
  id,
  title,
  price,
  pic,
  rating,
  sizes,
  des,
  srcs,
}) {
  const [size, setSize] = useState("");
  const [src, setSrc] = useState(srcs[0]);
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
      <div className="productdetailcomponent__contentleft">
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
        <div className="productdetailcomponent__pic">
          {srcs.map((i, key) => (
            <img
              src={i}
              className={`pic__size ${src == i && "pic__active"}`}
              onClick={() => setSrc(i)}
              index={key}
            />
          ))}
        </div>
      </div>
      <div className="productdetailcomponent__contentright">
        <Link to={`/product/${id}`} style={{ textDecoration: "none" }}>
          <h2 className="productdetailcomponent__title">{title}</h2>
        </Link>
        <p className="productdetailcomponent__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </p>

        <div className="productdetailcomponent__price"> ${price}</div>
        <p className="productdetailcomponent__select">Mô tả sản phẩm</p>
        <p className="productdetailcomponent__des">{des}</p>
        <p className="productdetailcomponent__select">
          Chọn size: <span>{size}</span>
        </p>
        <div>
          {sizes.map((i, key) => (
            <button
              style={{ margin: 0, marginRight: 15 }}
              className={`product__size ${size == i && "product__active"}`}
              index={key}
              onClick={() => handleClick(i)}
            >
              {i}
            </button>
          ))}
        </div>
        <p className="productdetailcomponent__select">Số Lượng</p>
        <div className="productdetailcomponent__option">
          <p className="productdetailcomponent__quantity">
            <AddIcon
              className="productdetailcomponent__plus"
              onClick={() => updateQuantityBasket(quantity + 1)}
            />
            <span className="productdetailcomponent__value">{quantity}</span>
            <RemoveIcon
              className="productdetailcomponent__minius"
              onClick={() => updateQuantityBasket(quantity - 1)}
            />
          </p>
        </div>

        <button
          className="productdetailcomponent__button"
          onClick={addBasket}
          disabled={!size}
        >
          Add to basket
        </button>
      </div>
    </div>
  );
}

export default ProductDetailComponent;
