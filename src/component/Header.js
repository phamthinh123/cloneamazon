import React, { useState } from "react";
import "./Header.css";
import Basket from "./Basket";

import { useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { SwipeableDrawer } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import ListAltIcon from "@material-ui/icons/ListAlt";
import MoreIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { auth } from "../firebase/firebase";

const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
    padding: 5,
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));
function Header() {
  let history = useHistory();
  const basket = useSelector((state) => state.basket);
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = React.useState("");
  const [state, setState] = useState({
    right: false,
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

  const signout = () => {
    auth.signOut();
  };
  const search2 = () => {
    console.log(inputValue);
    let product = products.find((i) => i.title === inputValue);
    let id = product.id;
    setInputValue("");
    history.push(`/product/${id}`);
  };
  const search1 = (e) => {
    let product = products.find((i) => i.title === inputValue);

    if (product && e.keyCode == 13) {
      let id = product.id;
      setInputValue("");
      history.push(`/product/${id}`);
    }
    return;
  };

  const classes = useStyles();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl2, setMobileMoreAnchorEl2] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const isMobileMenuOpen2 = Boolean(mobileMoreAnchorEl2);

  const handleMobileMenuClose2 = () => {
    setMobileMoreAnchorEl2(null);
  };

  const handleMobileMenuOpen2 = (event) => {
    setMobileMoreAnchorEl2(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link to={user ? "/orders" : "/"}>
        <MenuItem>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <ListAltIcon />
          </IconButton>
          <p>Đơn hàng</p>
        </MenuItem>
      </Link>
      <Link to={!user && "/login"}>
        <MenuItem onClick={signout}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p> {user ? "Đăng xuất" : "Đăng nhập"}</p>
        </MenuItem>
      </Link>
    </Menu>
  );
  const mobileMenuId2 = "primary-search-account-menu-mobile2";
  const renderMobileMenu2 = (
    <Menu
      anchorEl={mobileMoreAnchorEl2}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      id={mobileMenuId2}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={isMobileMenuOpen2}
      onClose={handleMobileMenuClose2}
    >
      <NavLink to="/" exact activeClassName="header__linkactive">
        <MenuItem>Trang Chủ</MenuItem>
      </NavLink>
      <NavLink
        to="/category/kitchenUtensils"
        exact
        activeClassName="header__linkactive"
      >
        <MenuItem>Đồ Dùng Nhà Bếp</MenuItem>
      </NavLink>
      <NavLink
        to="/category/homeDecor"
        exact
        activeClassName="header__linkactive"
      >
        <MenuItem>Trang Trí Nhà Cửa</MenuItem>
      </NavLink>
    </Menu>
  );
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__pic"
          src="https://holame.net/wp-content/uploads/2020/10/circle-cropped-2.png"
        />
      </Link>

      <div className={classes.sectionDesktop}>
        <NavLink
          to="/"
          exact
          activeClassName="header__linkactive"
          className="header__link"
        >
          Trang Chủ
        </NavLink>
        <NavLink
          to="/category/kitchenUtensils"
          exact
          activeClassName="header__linkactive"
          className="header__link"
        >
          Đồ Dùng Nhà Bếp
        </NavLink>
        <NavLink
          to="/category/homeDecor"
          exact
          activeClassName="header__linkactive"
          className="header__link"
        >
          Trang Trí Nhà Cửa
        </NavLink>
      </div>
      <div className={classes.sectionMobile}>
        <IconButton
          aria-label="show more"
          aria-controls={mobileMenuId2}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen2}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
      </div>
      <div className="header__search">
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          fullWidth
          size="small"
          autoComplete={true}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          value={value}
          options={products.map((product) => product.title)}
          renderInput={(params) => (
            <TextField
              {...params}
              margin="normal"
              variant="outlined"
              className="header__input"
              onKeyUp={search1}
            />
          )}
        />
        <SearchIcon
          fontSize="default"
          onClick={search2}
          className="header__searchicon"
        />
      </div>

      <div className={classes.sectionDesktop}>
        <Link to={!user && "/login"}>
          <div className="header__option" onClick={signout}>
            <span className="header__optionlineone">
              Chào {user ? user.displayName : "bạn"}
            </span>
            <span className="header__optionlinetwo">
              {user ? "Đăng xuất" : "Đăng nhập"}
            </span>
          </div>
        </Link>

        <Link to={user ? "/orders" : "/"}>
          <div className="header__option">
            <span className="header__optionlinetwo">Đơn hàng</span>
            <span className="header__optionlineone">của bạn</span>
          </div>
        </Link>
      </div>
      <div className={classes.sectionMobile}>
        <IconButton
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </div>

      <div className="header__nav">
        <div className="header__basket">
          <Badge
            badgeContent={basket?.length ? basket?.length : "0"}
            color="secondary"
            onClick={toggleDrawer("right", true)}
          >
            <ShoppingBasketIcon />
          </Badge>

          <SwipeableDrawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
            onOpen={toggleDrawer("right", true)}
          >
            <CloseIcon
              onClick={toggleDrawer("right", false)}
              style={{
                color: "white",
                fontSize: 30,
                right: "3%",
                top: "2%",
                position: "absolute",
              }}
            />
            <Basket />
            {/* <span className="header__basketlinetwo">{basket?.length}</span> */}
          </SwipeableDrawer>
        </div>
      </div>
      {renderMobileMenu}
      {renderMobileMenu2}
    </div>
  );
}

export default Header;
