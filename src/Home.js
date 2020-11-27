import React, { useEffect, useState } from "react";

import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import Product from "./Product.js";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";
import queryString from "query-string";
import * as actions from "./actions";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function Home(props) {
  const products = useSelector((state) => state.products);
  const data = useSelector((state) => state.data);
  const query = useSelector((state) => state.query);
  const filter = useSelector((state) => state.filter);
  const sort = useSelector((state) => state.sort);
  const select = useSelector((state) => state.select);
  const number = useSelector((state) => state.number);
  const lengthData = useSelector((state) => state.lengthData);

  const dispatch = useDispatch();
  const total = Math.ceil(lengthData / filter._limit);
  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleChange4 = (event) => {
    const name = event.target.name;
    if (name == "price_lte" && !event.target.value) {
      dispatch(
        actions.setNumber({
          ...number,
          [name]: 9999,
        })
      );
    } else if (name == "price_gte" && !event.target.value) {
      dispatch(
        actions.setNumber({
          ...number,
          [name]: 0,
        })
      );
    } else {
      dispatch(
        actions.setNumber({
          ...number,
          [name]: event.target.value,
        })
      );
    }
  };
  const operatorNumber = () => {
    if (select.category != "" && select.rating != "") {
      const stringified = queryString.stringify(select);

      const stringified2 = queryString.stringify(sort);
      const stringified3 = queryString.stringify(number);
      dispatch(
        actions.fetchProductsNumber(
          stringified,
          filter._page,
          query,
          stringified2,
          stringified3
        )
      );
    } else if (select.category != "" && select.rating == "") {
      const stringified2 = queryString.stringify(sort);
      const stringified3 = queryString.stringify(number);
      dispatch(
        actions.fetchProductsNumber(
          `category=${select.category}`,
          filter._page,
          query,
          stringified2,
          stringified3
        )
      );
    } else if (select.category == "" && select.rating != "") {
      const stringified2 = queryString.stringify(sort);
      const stringified3 = queryString.stringify(number);
      dispatch(
        actions.fetchProductsNumber(
          `rating=${select.rating}`,
          filter._page,
          query,
          stringified2,
          stringified3
        )
      );
    } else {
      const stringified2 = queryString.stringify(sort);
      const stringified3 = queryString.stringify(number);
      dispatch(
        actions.fetchProductsNumber(
          null,
          filter._page,
          query,
          stringified2,
          stringified3
        )
      );
    }
  };

  const handleChange2 = (event) => {
    const name = event.target.name;

    dispatch(
      actions.setSelect({
        ...select,
        [name]: event.target.value,
      })
    );
  };

  useEffect(() => {
    const fetch = async () => {
      if (select.category != "" && select.rating != "") {
        const stringified = queryString.stringify(select);

        const stringified2 = queryString.stringify(sort);
        const stringified3 = queryString.stringify(number);
        dispatch(
          actions.fetchProductsSelect(
            stringified,
            filter._page,
            query,
            stringified2,
            stringified3
          )
        );
      } else if (select.category != "" && select.rating == "") {
        const stringified2 = queryString.stringify(sort);
        const stringified3 = queryString.stringify(number);
        dispatch(
          actions.fetchProductsSelect(
            `category=${select.category}`,
            filter._page,
            query,
            stringified2,
            stringified3
          )
        );
      } else if (select.category == "" && select.rating != "") {
        const stringified2 = queryString.stringify(sort);
        const stringified3 = queryString.stringify(number);
        dispatch(
          actions.fetchProductsSelect(
            `rating=${select.rating}`,
            filter._page,
            query,
            stringified2,
            stringified3
          )
        );
      } else {
        const stringified2 = queryString.stringify(sort);
        const stringified3 = queryString.stringify(number);
        dispatch(
          actions.fetchProductsSelect(
            null,
            filter._page,
            query,
            stringified2,
            stringified3
          )
        );
      }
    };

    fetch();
  }, [select]);

  const handleChange3 = (event) => {
    const name = event.target.name;
    if (event.target.value != "") {
      dispatch(
        actions.setSort({
          [name]: event.target.value,
          _sort: "price",
        })
      );
    } else {
      dispatch(
        actions.setSort({
          [name]: event.target.value,
          _sort: "",
        })
      );
    }
  };

  useEffect(() => {
    const fetch = async () => {
      if (select.category != "" && select.rating != "") {
        const stringified = queryString.stringify(sort);
        const stringified3 = queryString.stringify(select);
        const stringified4 = queryString.stringify(number);
        dispatch(
          actions.fetchProductsSort(
            stringified,
            filter._page,
            query,
            stringified3,
            stringified4
          )
        );
      } else if (select.category != "" && select.rating == "") {
        const stringified = queryString.stringify(sort);
        const stringified4 = queryString.stringify(number);
        dispatch(
          actions.fetchProductsSort(
            stringified,
            filter._page,
            query,
            `category=${select.category}`,
            stringified4
          )
        );
      } else if (select.category == "" && select.rating != "") {
        const stringified = queryString.stringify(sort);
        const stringified4 = queryString.stringify(number);
        dispatch(
          actions.fetchProductsSort(
            stringified,
            filter._page,
            query,
            `rating=${select.rating}`,
            stringified4
          )
        );
      } else {
        const stringified = queryString.stringify(sort);
        const stringified4 = queryString.stringify(number);
        dispatch(
          actions.fetchProductsSort(
            stringified,
            filter._page,
            query,
            null,
            stringified4
          )
        );
      }
    };

    fetch();
  }, [sort]);

  const handleChange = (event, value) => {
    dispatch(
      actions.setFilter({
        ...filter,
        _page: value,
        title_like: query,
      })
    );
  };

  useEffect(() => {
    const fetch = async () => {
      if (select.category != "" && select.rating != "") {
        const stringified = queryString.stringify(filter);

        const stringified2 = queryString.stringify(sort);
        const stringified3 = queryString.stringify(select);
        const stringified4 = queryString.stringify(number);
        dispatch(
          actions.fetchProductsPagination(
            stringified,
            stringified2,
            stringified3,
            stringified4
          )
        );
      } else if (select.category != "" && select.rating == "") {
        const stringified = queryString.stringify(filter);

        const stringified2 = queryString.stringify(sort);
        const stringified4 = queryString.stringify(number);
        dispatch(
          actions.fetchProductsPagination(
            stringified,
            stringified2,
            `category=${select.category}`,
            stringified4
          )
        );
      } else if (select.category == "" && select.rating != "") {
        const stringified = queryString.stringify(filter);

        const stringified2 = queryString.stringify(sort);
        const stringified4 = queryString.stringify(number);
        dispatch(
          actions.fetchProductsPagination(
            stringified,
            stringified2,
            `rating=${select.rating}`,
            stringified4
          )
        );
      } else {
        const stringified = queryString.stringify(filter);

        const stringified2 = queryString.stringify(sort);
        const stringified4 = queryString.stringify(number);
        dispatch(
          actions.fetchProductsPagination(
            stringified,
            stringified2,
            null,
            stringified4
          )
        );
      }
    };

    fetch();
  }, [filter]);

  return (
    <div className="home">
      <Slider {...settings} className="home__slider">
        <div>
          <img
            className="home__pic"
            src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2020/Holiday/GiftGuide/Fuji_TallHero_GG2_en_US_1x._CB418256337_.jpg"
          />
        </div>
        <div>
          <img
            className="home__pic"
            src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Computers_1x._CB432469755_.jpg"
          />
        </div>
        <div>
          <img
            className="home__pic"
            src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Toys_en_US_1x._CB431858161_.jpg"
          />
        </div>
        <div>
          <img
            className="home__pic"
            src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Home_v2_en_US_1x._CB429090084_.jpg"
          />
        </div>

        <div>
          <img
            className="home__pic"
            src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2020/BlackFriday/Fuji_TallHero_BFWeek_v1_en_US_1x._CB415746974_.jpg"
          />
        </div>
      </Slider>

      {/* <img
        className="home__pic"
        src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
      /> */}
      <div className="home__sort">
        <Typography variant="subtitle1" component="h2" align="center">
          Sắp xếp theo
        </Typography>
        <div>
          <TextField
            id="standard-number"
            label="Min"
            type="number"
            onChange={handleChange4}
            inputProps={{
              name: "price_gte",
              min: 0,
            }}
            variant="outlined"
            style={{ width: 100, marginRight: 20 }}
          />
          <TextField
            id="standard-number"
            label="Max"
            type="number"
            onChange={handleChange4}
            inputProps={{
              name: "price_lte",
              min: 0,
            }}
            variant="outlined"
            style={{ width: 100, marginRight: 20 }}
          />
          <Button
            variant="contained"
            color="primary"
            disabled={!number.price_gte && !number.price_lte}
            style={{ width: 130, marginRight: 20, height: 60 }}
            onClick={operatorNumber}
          >
            Áp dụng
          </Button>
        </div>
        <div>
          <FormControl>
            <InputLabel shrink htmlFor="_order-native-label-placeholder">
              Giá
            </InputLabel>
            <NativeSelect
              onChange={handleChange3}
              inputProps={{
                name: "_order",
                id: "_order-native-label-placeholder",
              }}
              style={{ width: 150, marginRight: 20 }}
            >
              <option value="">None</option>
              <option value="asc">Thấp đến cao</option>
              <option value="desc">Cao đến thấp</option>
            </NativeSelect>
          </FormControl>
          <FormControl>
            <InputLabel shrink htmlFor="category-native-label-placeholder">
              Thể loại
            </InputLabel>
            <NativeSelect
              value={select.category}
              onChange={handleChange2}
              inputProps={{
                name: "category",
                id: "category-native-label-placeholder",
              }}
              style={{ width: 150, marginRight: 20 }}
            >
              <option value="">None</option>
              <option value="rutrum">Rutrum</option>
              <option value="libero">Libero</option>
              <option value="risus">Risus</option>
            </NativeSelect>
          </FormControl>
          <FormControl>
            <InputLabel shrink htmlFor="rating-native-label-placeholder">
              Đánh giá
            </InputLabel>
            <NativeSelect
              value={select.rating}
              onChange={handleChange2}
              inputProps={{
                name: "rating",
                id: "rating-native-label-placeholder",
              }}
              style={{ width: 160, marginRight: 20 }}
            >
              <option value="">None</option>
              <option value="1">⭐</option>
              <option value="2">⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="5">⭐⭐⭐⭐⭐</option>
            </NativeSelect>
          </FormControl>
        </div>

        <div className="home__pagination">
          <Pagination
            count={total}
            onChange={handleChange}
            color="primary"
            shape="rounded"
            showFirstButton
            showLastButton
            showPrevButton
            showNextButton
          />
        </div>
      </div>
      <div className="home__content">
        <Grid container direction="row" alignItems="center" spacing={2}>
          {data.map((product) => (
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
      </div>
    </div>
  );
}

export default Home;
