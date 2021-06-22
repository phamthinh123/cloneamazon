import React from "react";
import "./SubTotal.css";
import { total } from "../redux/reducer";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import {
  FormControlLabel,
  Grid,
  Typography,
  Checkbox,
} from "@material-ui/core";

function SubTotal(props) {
  const basket = useSelector((state) => state.basket);
  const user = useSelector((state) => state.user);
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <Grid container item xs={12} direction="column" alignItems="center">
            <div className="subtotal__form">
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  className="subtotal__lineone"
                  style={{ fontWeight: "bold" }}
                >
                  Tổng Tiền ({basket.length} sản phẩm): <span>{value}</span>
                </Typography>
              </Grid>

              <FormControlLabel
                control={<Checkbox name="checkedB" color="primary" />}
                label="Miễn Phí Vận Chuyển"
              />

              <Grid item xs={12}>
                <Link to="/payment">
                  <button
                    className="subtotal__button"
                    disabled={!basket.length || !user}
                  >
                    Tiến Hành Thanh Toán
                  </button>
                </Link>
              </Grid>
            </div>
          </Grid>
        )}
        decimalScale={2}
        value={total(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </div>
  );
}

export default SubTotal;
