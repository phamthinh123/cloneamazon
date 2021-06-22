import React from "react";
import "./ProductDetail.css";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import Product from "./Product";
import ProductDetailComponent from "./ProductDetailComponent";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

function ProductDetail() {
  const { id } = useParams();

  const products = useSelector((state) => state.products);
  const product = products.find((i) => i.id === id);
  const productsFilter = products.filter(
    (i) => i.category === product.category && i.id !== product.id
  );
  return (
    <div className="productdetail">
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="center"
        spacing={2}
        xs={12}
      >
        <Grid item xs={10} style={{ margin: "auto" }}>
          <ProductDetailComponent
            id={product.id}
            title={product.title}
            price={product.price}
            rating={product.rating}
            pic={product.pic}
            sizes={product.sizes}
            des={product.des}
            srcs={product.src}
            product={product}
          />
        </Grid>
        <Grid item xs={10}>
          <Typography variant="h6" gutterBottom style={{ marginLeft: 30 }}>
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
    </div>
  );
}

export default ProductDetail;
