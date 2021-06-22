import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./Checkout.css";
import * as actions from "../redux/actions";

import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

import SubTotal from "./SubTotal";
// import { useStateValue } from "./StateProvider";

function Checkout(props) {
  // const [{ basket }, dispatch] = useStateValue();
  const basket = useSelector((state) => state.basket);
  console.log(basket);
  const dispatch = useDispatch();
  const removeFromBasket = (id, size) => {
    dispatch(actions.removeFromBasket(id, size));
  };
  const updateQuantityBasket = (id, quantity, size) => {
    console.log(quantity, size);
    if (quantity > 0) {
      dispatch(actions.updateQuantityBasket(id, quantity, size));
    }
  };
  return (
    <div className="checkout">
      <Grid
        container
        direction="row"
        spacing={2}
        xs={12}
        alignItems="flex-start"
        justify="center"
      >
        <Grid
          item
          container
          xs={12}
          lg={9}
          direction="column"
          style={{ padding: "20px", paddingRight: 0, marginTop: "20px" }}
        >
          <Grid
            item
            style={{
              position: "relative",
              display: "inline-block",
            }}
          >
            <img
              className="checkout__pic"
              src="https://holame.net/wp-content/uploads/2017/06/dummy-wood-title.jpg"
            />

            <Typography variant="h4" className="checkout__title">
              TÀI KHOẢN
            </Typography>
          </Grid>
          <Grid
            item
            container
            xs={10}
            style={{ margin: "auto", paddingTop: 40 }}
          >
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell width="20%">HÌNH ẢNH</TableCell>
                    <TableCell width="30%">SẢN PHẨM</TableCell>
                    <TableCell width="10%">SIZE</TableCell>
                    <TableCell width="20%">SỐ LƯỢNG</TableCell>
                    <TableCell width="10%">TỔNG</TableCell>
                    <TableCell width="10%">ACTION</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {basket.map((i) => (
                    <ProductTable
                      id={i.product.id}
                      title={i.product.title}
                      price={i.product.price}
                      pic={i.product.pic}
                      quantity={i.quantity}
                      size={i.product.size}
                    />
                  ))} */}
                  {basket.map((i) => (
                    <TableRow>
                      <TableCell width="20%">
                        <Link to={`/product/${i.product.id}`}>
                          <img
                            src={i.product.pic}
                            className="checkout__productpic"
                          />
                        </Link>
                      </TableCell>

                      <TableCell width="30%">
                        <Link
                          to={`/product/${i.product.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Typography
                            variant="h6"
                            gutterBottom
                            color="textPrimary"
                            className="checkout__producttitle"
                          >
                            {i.product.title}
                          </Typography>
                        </Link>
                      </TableCell>

                      <TableCell width="10%">
                        <div className="checkout__productsize">
                          {i.product.size}
                        </div>
                      </TableCell>

                      <TableCell width="20%">
                        <AddIcon
                          className="product__plus"
                          onClick={() =>
                            updateQuantityBasket(
                              i.product.id,
                              i.quantity + 1,
                              i.product.size
                            )
                          }
                        />
                        <span className="checkout__productvalue">
                          {i.quantity}
                        </span>
                        <RemoveIcon
                          className="product__minius"
                          onClick={() =>
                            updateQuantityBasket(
                              i.product.id,
                              i.quantity - 1,
                              i.product.size
                            )
                          }
                        />
                      </TableCell>

                      <TableCell width="10%">
                        <Typography
                          variant="body1"
                          gutterBottom
                          color="textPrimary"
                          className="checkout__productprice"
                          style={{ fontWeight: "bold" }}
                        >
                          ${i.product.price * i.quantity}
                        </Typography>
                      </TableCell>

                      <TableCell width="10%">
                        <DeleteIcon
                          onClick={() => {
                            removeFromBasket(
                              i.product.id,

                              i.product.size
                            );
                          }}
                          style={{
                            fontSize: 35,
                            cursor: "pointer",
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* <Grid item xs={12}>
            {basket.map((i) => (
              <CheckoutProduct
                id={i.product.id}
                title={i.product.title}
                price={i.product.price}
                rating={i.product.rating}
                pic={i.product.pic}
                quantity={i.quantity}
                size={i.product.size}
                des={i.product.des}
                hiddenButton={true}
              />
            ))}
          </Grid> */}
        </Grid>

        <Grid
          item
          xs={12}
          lg={3}
          direction="column"
          container
          style={{ padding: "40px" }}
        >
          <SubTotal />
        </Grid>
      </Grid>
    </div>
  );
}

export default Checkout;
