import React from "react";

import "./Footer.css";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";
import TwitterIcon from "@material-ui/icons/Twitter";

import { IconButton } from "@material-ui/core";
function Footer() {
  return (
    <div className="footer">
      <Grid container direction="row" alignItems="flex-start" spacing={2}>
        <Grid item xs={6} sm={3} direction="column" container>
          <Typography variant="h5" component="h2" style={{ marginBottom: 15 }}>
            Công Ty
          </Typography>
          <Link
            to="#"
            color="inherit"
            underline="hover"
            style={{ marginBottom: 5 }}
          >
            Giới Thiệu Về Amazon
          </Link>
          <Link
            to="#"
            color="inherit"
            underline="hover"
            style={{ marginBottom: 5 }}
          >
            Tuyển Dụng
          </Link>
          <Link
            to="#"
            color="inherit"
            underline="hover"
            style={{ marginBottom: 5 }}
          >
            Hệ Thống Cửa Hàng
          </Link>
          <Link
            to="#"
            color="inherit"
            underline="hover"
            style={{ marginBottom: 5 }}
          >
            Chăm Sóc Khách Hàng
          </Link>
        </Grid>
        <Grid item xs={6} sm={3} direction="column" container>
          <Typography variant="h5" component="h2" style={{ marginBottom: 15 }}>
            Chính Sách Khách Hàng
          </Typography>
          <Link
            to="#"
            color="inherit"
            underline="hover"
            style={{ marginBottom: 5 }}
          >
            Chính Sách Khách Hàng Thân Thiết
          </Link>
          <Link
            to="#"
            color="inherit"
            underline="hover"
            style={{ marginBottom: 5 }}
          >
            Chính Sách Đổi Trả
          </Link>
          <Link
            to="#"
            color="inherit"
            underline="hover"
            style={{ marginBottom: 5 }}
          >
            Chính Sách Bảo Hành
          </Link>
          <Link
            to="#"
            color="inherit"
            underline="hover"
            style={{ marginBottom: 5 }}
          >
            Câu Hỏi Thường Gặp
          </Link>
        </Grid>
        <Grid item xs={6} sm={3} direction="column" container>
          <Typography variant="h5" component="h2" style={{ marginBottom: 10 }}>
            Kết nối với Amazon
          </Typography>
          <Grid item direction="row" container>
            <IconButton color="primary">
              <FacebookIcon />
            </IconButton>
            <IconButton color="primary">
              <InstagramIcon />
            </IconButton>
            <IconButton color="primary">
              <YouTubeIcon />
            </IconButton>
            <IconButton color="primary">
              <TwitterIcon />
            </IconButton>
          </Grid>
          <img
            src="//theme.hstatic.net/1000341789/1000533258/14/logo-bct.png?v=636"
            className="header__pic"
            style={{ margin: 0, padding: 8 }}
          />
        </Grid>
        <Grid item xs={6} sm={3} direction="column" container>
          <Typography variant="h5" component="h3" style={{ marginBottom: 15 }}>
            Thông Tin Cửa Hàng
          </Typography>
          <Typography variant="h6" component="h4" style={{ marginBottom: 5 }}>
            Cửa Hàng Thứ 1:
          </Typography>
          <Typography variant="body2" gutterBottom>
            14-16 Quốc Hương, Phường Thảo Điền, Quận 2
          </Typography>
          <Typography variant="h6" component="h4" style={{ marginBottom: 5 }}>
            Cửa Hàng Thứ 2:
          </Typography>
          <Typography variant="body2" gutterBottom>
            Tầng 2, T-231, Aeon Hà Đông
          </Typography>
          <Typography variant="body2" gutterBottom>
            Khu dân cư Hoàng Văn Thụ, Phường Dương Nội, Quận Hà Đông, Hà Nội
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Footer;
