import React, { useEffect, useState } from "react";
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
function Home(props) {
  const products = useSelector((state) => state.products);
  const data = useSelector((state) => state.data);
  const query = useSelector((state) => state.query);
  const filter = useSelector((state) => state.filter);
  const sort = useSelector((state) => state.sort);
  const select = useSelector((state) => state.select);

  const dispatch = useDispatch();

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

        dispatch(
          actions.fetchProductsSelect(
            stringified,
            filter._page,
            query,
            stringified2
          )
        );
      } else if (select.category != "" && select.rating == "") {
        const stringified2 = queryString.stringify(sort);

        dispatch(
          actions.fetchProductsSelect(
            `category=${select.category}`,
            filter._page,
            query,
            stringified2
          )
        );
      } else if (select.category == "" && select.rating != "") {
        const stringified2 = queryString.stringify(sort);

        dispatch(
          actions.fetchProductsSelect(
            `rating=${select.rating}`,
            filter._page,
            query,
            stringified2
          )
        );
      } else {
        const stringified2 = queryString.stringify(sort);
        dispatch(
          actions.fetchProductsSelect(null, filter._page, query, stringified2)
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
        dispatch(
          actions.fetchProductsSort(
            stringified,
            filter._page,
            query,
            stringified3
          )
        );
      } else if (select.category != "" && select.rating == "") {
        const stringified = queryString.stringify(sort);

        dispatch(
          actions.fetchProductsSort(
            stringified,
            filter._page,
            query,
            `category=${select.category}`
          )
        );
      } else if (select.category == "" && select.rating != "") {
        const stringified = queryString.stringify(sort);

        dispatch(
          actions.fetchProductsSort(
            stringified,
            filter._page,
            query,
            `rating=${select.rating}`
          )
        );
      } else {
        const stringified = queryString.stringify(sort);
        dispatch(
          actions.fetchProductsSort(stringified, filter._page, query, null)
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
        dispatch(
          actions.fetchProductsPagination(
            stringified,
            stringified2,
            stringified3
          )
        );
      } else if (select.category != "" && select.rating == "") {
        const stringified = queryString.stringify(filter);

        const stringified2 = queryString.stringify(sort);

        dispatch(
          actions.fetchProductsPagination(
            stringified,
            stringified2,
            `category=${select.category}`
          )
        );
      } else if (select.category == "" && select.rating != "") {
        const stringified = queryString.stringify(filter);

        const stringified2 = queryString.stringify(sort);

        dispatch(
          actions.fetchProductsPagination(
            stringified,
            stringified2,
            `rating=${select.rating}`
          )
        );
      } else {
        const stringified = queryString.stringify(filter);

        const stringified2 = queryString.stringify(sort);
        dispatch(
          actions.fetchProductsPagination(stringified, stringified2, null)
        );
      }
    };

    fetch();
  }, [filter]);

  const total = Math.ceil(products.length / filter._limit);
  console.log(data);
  return (
    <div className="home">
      <img
        className="home__pic"
        src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
      />
      <div className="home__sort">
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
          >
            <option value="">None</option>
            <option value="1">⭐</option>
            <option value="2">⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="5">⭐⭐⭐⭐⭐</option>
          </NativeSelect>
        </FormControl>
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
      <Grid container direction="row" alignItems="center" spacing={2}>
        {data.map((product) => (
          <Grid item xs={12} sm={6}>
            <Product
              id={product.id}
              title={product.title}
              price={product.price}
              pic={product.pic}
              rating={product.rating}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Home;
