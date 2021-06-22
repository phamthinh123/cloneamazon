import React, { useEffect, useState } from "react";
import "./Kitchen.css";

// import { useStateValue } from "./StateProvider";

import { Link, useHistory, useParams } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  TextField,
  Typography,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import CloseIcon from "@material-ui/icons/Close";
import Product from "./Product.js";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import queryString from "query-string";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, useTheme } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  drawer: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
}));
function Kitchen(props) {
  // const [{ user }] = useStateValue();
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket);
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const data = useSelector((state) => state.data);
  const history = useHistory();
  const filter = useSelector((state) => state.filter);
  const sort = useSelector((state) => state.sort);
  const select = useSelector((state) => state.select);
  const number = useSelector((state) => state.number);
  const lengthData = useSelector((state) => state.lengthData);
  const total = Math.ceil(lengthData / filter._limit);
  const { category } = useParams();
  const classes = useStyles();

  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  useEffect(() => {
    if (category == "kitchenUtensils") {
      dispatch(actions.setSelectCategory("Đồ Dùng Nhà Bếp"));
    } else if (category == "homeDecor") {
      dispatch(actions.setSelectCategory("Trang Trí Nhà Cửa"));
    }
  }, [category]);
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
          // filter._page,

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
          // filter._page,

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
          // filter._page,

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
          // filter._page,

          stringified2,
          stringified3
        )
      );
    }
  };

  const handleChange2 = (event) => {
    const name = event.target.name;
    console.log(name, event.target.name);
    if (event.target.value == "Đồ Dùng Nhà Bếp") {
      history.push("/category/kitchenUtensils");
    } else if (event.target.value == "Trang Trí Nhà Cửa") {
      history.push("/category/homeDecor");
    } else {
      history.push("/category/none");
    }
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
            // filter._page,

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
            // filter._page,

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
            // filter._page,

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
            // filter._page,

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
            // filter._page,

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
            // filter._page,

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
            // filter._page,

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
            // filter._page,

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
    <div className="kitchen">
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12} direction="column" container style={{ padding: 30 }}>
          <img
            className="payment__pic"
            src="https://holame.net/wp-content/uploads/2017/06/dummy-wood-title.jpg"
          />
          <h1 className="kitchen__title">ĐỒ DÙNG NHÀ BẾP</h1>
        </Grid>

        <Grid
          item
          xs={12}
          sm={3}
          direction="row"
          container
          style={{ paddingTop: 30, paddingLeft: 30 }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer("left", true)}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
            onOpen={toggleDrawer("left", true)}
          >
            <div role="presentation" className="kitchen__sidebar">
              <div style={{ marginBottom: 30 }}>
                <CloseIcon
                  anchor={"right"}
                  onClick={toggleDrawer("left", false)}
                  style={{
                    color: "black",
                    fontSize: 30,
                    left: "90%",
                    top: "1%",
                    position: "absolute",
                  }}
                />

                <Typography variant="subtitle1" style={{ fontWeight: 800 }}>
                  DANH MỤC SẢN PHẨM
                </Typography>
                <FormControl>
                  <NativeSelect
                    value={select.category}
                    onChange={handleChange2}
                    inputProps={{
                      name: "category",
                      id: "category-native-label-placeholder",
                    }}
                    style={{ width: "100%" }}
                  >
                    <option value="">None</option>
                    <option value="Đồ Dùng Nhà Bếp">Đồ dùng nhà bếp</option>
                    <option value="Trang Trí Nhà Cửa">Trang chí nhà cửa</option>
                  </NativeSelect>
                </FormControl>
              </div>
              <div style={{ marginBottom: 30 }}>
                <Typography variant="subtitle1" style={{ fontWeight: 800 }}>
                  ĐÁNH GIÁ
                </Typography>

                <FormControl>
                  <NativeSelect
                    value={select.rating}
                    onChange={handleChange2}
                    inputProps={{
                      name: "rating",
                      id: "rating-native-label-placeholder",
                    }}
                    style={{ width: "100%" }}
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
              <div style={{ marginBottom: 30 }}>
                <Typography variant="subtitle1" style={{ fontWeight: 800 }}>
                  KHOẢNG GIÁ
                </Typography>

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
                  style={{
                    width: "40%",
                    marginRight: 20,
                    marginBottom: 20,
                  }}
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
                  style={{ width: "40%" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!number.price_gte && !number.price_lte}
                  style={{ width: "87%" }}
                  onClick={operatorNumber}
                >
                  Áp dụng
                </Button>
              </div>
              <div style={{ marginBottom: 30 }}>
                <Typography variant="subtitle1" style={{ fontWeight: 800 }}>
                  SẢN PHẨM MỚI NHẤT
                </Typography>
                {products.slice(0, 5).map((product) => (
                  <div className="kitchen__new">
                    <div>
                      <Link to={`/product/${product.id}`}>
                        <img src={product.pic} className="kitchen__img" />
                      </Link>
                    </div>
                    <div>
                      <Link
                        to={`/product/${product.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Typography variant="body2">{product.title}</Typography>
                      </Link>
                      <p className="kitchen__rating">
                        {Array(product.rating)
                          .fill()
                          .map((_, i) => (
                            <p>⭐</p>
                          ))}
                      </p>
                      <p className="kitchen__price"> ${product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 30 }}>
                <Typography variant="subtitle1" style={{ fontWeight: 800 }}>
                  TỪ KHÓA SẢN PHẨM
                </Typography>
                <Button variant="outlined" style={{ marginRight: 5 }}>
                  Bát Đĩa Sứ Lẻ
                </Button>
                <Button variant="outlined" style={{ marginRight: 5 }}>
                  Bộ Bình Nước Ombre
                </Button>
                <Button variant="outlined" style={{ marginRight: 5 }}>
                  Bộ Sưu Tập Chanh Vàng
                </Button>
                <Button variant="outlined" style={{ marginRight: 5 }}>
                  Bộ Sưu Tập Gốm Sứ Cherry
                </Button>
                <Button variant="outlined" style={{ marginRight: 5 }}>
                  Tô - Đĩa Sứ Hoa Lá Bốn Mùa
                </Button>
                <Button variant="outlined" style={{ marginRight: 5 }}>
                  Tô Salad
                </Button>
                <Button variant="outlined" style={{ marginRight: 5 }}>
                  Tô Sứ Ăn Mì
                </Button>
                <Button variant="outlined" style={{ marginRight: 5 }}>
                  Xanh Cổ Vịt
                </Button>
              </div>
            </div>
          </SwipeableDrawer>
          <div className={classes.drawer}>
            <div style={{ marginBottom: 30 }}>
              <Typography variant="subtitle1" style={{ fontWeight: 800 }}>
                DANH MỤC SẢN PHẨM
              </Typography>

              <FormControl>
                <NativeSelect
                  value={select.category}
                  onChange={handleChange2}
                  inputProps={{
                    name: "category",
                    id: "category-native-label-placeholder",
                  }}
                  style={{ width: "100%" }}
                >
                  <option value="">None</option>
                  <option value="Đồ Dùng Nhà Bếp">Đồ dùng nhà bếp</option>
                  <option value="Trang Trí Nhà Cửa">Trang chí nhà cửa</option>
                </NativeSelect>
              </FormControl>
            </div>
            <div style={{ marginBottom: 30 }}>
              <Typography variant="subtitle1" style={{ fontWeight: 800 }}>
                ĐÁNH GIÁ
              </Typography>

              <FormControl>
                <NativeSelect
                  value={select.rating}
                  onChange={handleChange2}
                  inputProps={{
                    name: "rating",
                    id: "rating-native-label-placeholder",
                  }}
                  style={{ width: "100%" }}
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
            <div style={{ marginBottom: 30 }}>
              <Typography variant="subtitle1" style={{ fontWeight: 800 }}>
                KHOẢNG GIÁ
              </Typography>

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
                style={{
                  width: "40%",
                  marginRight: 20,
                  marginBottom: 20,
                }}
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
                style={{ width: "40%" }}
              />
              <Button
                variant="contained"
                color="primary"
                disabled={!number.price_gte && !number.price_lte}
                style={{ width: "87%" }}
                onClick={operatorNumber}
              >
                Áp dụng
              </Button>
            </div>
            <div style={{ marginBottom: 30 }}>
              <Typography variant="subtitle1" style={{ fontWeight: 800 }}>
                SẢN PHẨM MỚI NHẤT
              </Typography>
              {products.slice(0, 5).map((product) => (
                <div className="kitchen__new">
                  <div>
                    <Link to={`/product/${product.id}`}>
                      <img src={product.pic} className="kitchen__img" />
                    </Link>
                  </div>
                  <div>
                    <Link
                      to={`/product/${product.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Typography variant="body2">{product.title}</Typography>
                    </Link>
                    <p className="kitchen__rating">
                      {Array(product.rating)
                        .fill()
                        .map((_, i) => (
                          <p>⭐</p>
                        ))}
                    </p>
                    <p className="kitchen__price"> ${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 30 }}>
              <Typography variant="subtitle1" style={{ fontWeight: 800 }}>
                TỪ KHÓA SẢN PHẨM
              </Typography>
              <Button variant="outlined" style={{ marginRight: 5 }}>
                Bát Đĩa Sứ Lẻ
              </Button>
              <Button variant="outlined" style={{ marginRight: 5 }}>
                Bộ Bình Nước Ombre
              </Button>
              <Button variant="outlined" style={{ marginRight: 5 }}>
                Bộ Sưu Tập Chanh Vàng
              </Button>
              <Button variant="outlined" style={{ marginRight: 5 }}>
                Bộ Sưu Tập Gốm Sứ Cherry
              </Button>
              <Button variant="outlined" style={{ marginRight: 5 }}>
                Tô - Đĩa Sứ Hoa Lá Bốn Mùa
              </Button>
              <Button variant="outlined" style={{ marginRight: 5 }}>
                Tô Salad
              </Button>
              <Button variant="outlined" style={{ marginRight: 5 }}>
                Tô Sứ Ăn Mì
              </Button>
              <Button variant="outlined" style={{ marginRight: 5 }}>
                Xanh Cổ Vịt
              </Button>
            </div>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          md={9}
          direction="row"
          container
          justify="space-between"
          style={{ padding: 30 }}
        >
          <div className="productdetail__breadcrumbs">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
              style={{ marginBottom: 30 }}
            >
              <Link
                color="inherit"
                to="/"
                underline="none"
                style={{ fontWeight: "bold" }}
              >
                Trang Chủ
              </Link>

              <Typography color="textPrimary">
                {select.category ? select.category : "Thể Loại"}
              </Typography>
            </Breadcrumbs>
          </div>
          <div className="kitchen__filterright">
            <Typography
              variant="subtitle1"
              component="h2"
              style={{ marginRight: 15 }}
            >
              Sắp xếp theo
            </Typography>
            <FormControl style={{ marginRight: 15 }}>
              <NativeSelect
                onChange={handleChange3}
                inputProps={{
                  name: "_order",
                  id: "_order-native-label-placeholder",
                }}
                style={{ width: "100" }}
              >
                <option value="">Giá: None</option>
                <option value="asc">Giá: Thấp đến cao</option>
                <option value="desc">Giá: Cao đến thấp</option>
              </NativeSelect>
            </FormControl>

            <div className="home__pagination">
              <Pagination
                count={total}
                onChange={handleChange}
                page={filter._page}
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
                <Grid item xs={12} sm={6} lg={4}>
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
        </Grid>
      </Grid>
    </div>
  );
}

export default Kitchen;
