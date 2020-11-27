import React, { useEffect, useState } from "react";
import "./ProductDetail.css";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "./actions";
import { useParams } from "react-router-dom";
import Product from "./Product";
import { Grid } from "@material-ui/core";
import CheckoutProduct from "./CheckoutProduct.js";
import ProductDetailComponent from "./ProductDetailComponent";
function ProductDetail() {
  const { id } = useParams();

  const products = useSelector((state) => state.products);
  const product = products.find((i) => i.id === id);
  const productsFilter = products.filter(
    (i) => i.category === product.category
  );
  return (
    <div className="productdetail">
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="center"
        spacing={2}
      >
        <Grid item xs={10}>
          <div className="productdetail__breadcrumbs">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link color="inherit" href="/" underline="none">
                Home
              </Link>
              <Link color="inherit" to={`/product/${id}`} underline="none">
                ProductDetail
              </Link>
              <Typography color="textPrimary">{product.title}</Typography>
            </Breadcrumbs>
          </div>
        </Grid>
        <Grid item xs={10}>
          <div className="productdetail__product">
            <ProductDetailComponent
              id={product.id}
              title={product.title}
              price={product.price}
              rating={product.rating}
              pic={product.pic}
              sizes={product.sizes}
              des={product.des}
              srcs={product.src}
            />
          </div>
        </Grid>
        <Grid item xs={10}>
          <Typography variant="h6" gutterBottom>
            SẢN PHẨM TƯƠNG TỰ
          </Typography>
        </Grid>
        <Grid
          item
          xs={10}
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={3}
        >
          {productsFilter.slice(0, 3).map((product) => (
            <Grid item xs={12} sm={4}>
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
    </div>
  );
}

export default ProductDetail;
