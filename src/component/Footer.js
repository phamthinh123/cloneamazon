import "./Footer.css";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";
import TwitterIcon from "@material-ui/icons/Twitter";

import { Button, IconButton } from "@material-ui/core";
function Footer() {
  return (
    <div className="footer">
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          md={4}
          direction="column"
          alignItems="center"
          justify="center"
          align="center"
          style={{ marginBottom: 15, padding: "10px" }}
        >
          <img src="https://holame.net/wp-content/uploads/2020/10/circle-cropped-2.png" />
          <Typography
            variant="h5"
            component="h2"
            style={{ marginBottom: 15 }}
            align="center"
          >
            VỀ HOLAME STORE
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            align="center"
            style={{ fontStyle: "italic", width: "75%" }}
          >
            Sứ mệnh của Holame Store là đem đến những sản phẩm gia dụng, trang
            trí nhà cửa, gốm sứ cao cấp chất lượng nhất đến mọi nhà với triết lý
            kinh doanh bằng sự chân thành và tử tế.
          </Typography>
        </Grid>
        <Grid item xs={12} md={8} direction="row" container>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            direction="column"
            container
            style={{ marginBottom: 15, padding: "10px" }}
          >
            <Typography
              variant="h5"
              component="h2"
              style={{ marginBottom: 15 }}
            >
              VỀ HOLAME STORE
            </Typography>
            <Link
              to="#"
              color="inherit"
              underline="hover"
              style={{ marginBottom: 5 }}
            >
              Giới Thiệu
            </Link>
            <Link
              to="#"
              color="inherit"
              underline="hover"
              style={{ marginBottom: 5 }}
            >
              Liên hệ với chúng tôi
            </Link>
            <Link
              to="#"
              color="inherit"
              underline="hover"
              style={{ marginBottom: 5 }}
            >
              Đối tác của chúng tôi
            </Link>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            direction="column"
            container
            style={{ marginBottom: 15, padding: "10px" }}
          >
            <Typography
              variant="h5"
              component="h2"
              style={{ marginBottom: 15 }}
            >
              HỖ TRỢ KHÁCH HÀNG
            </Typography>
            <Link
              to="#"
              color="inherit"
              underline="hover"
              style={{ marginBottom: 5 }}
            >
              Hướng dẫn đặt hàng
            </Link>
            <Link
              to="#"
              color="inherit"
              underline="hover"
              style={{ marginBottom: 5 }}
            >
              Hướng dẫn áp dụng mã giảm giá
            </Link>
            <Link
              to="#"
              color="inherit"
              underline="hover"
              style={{ marginBottom: 5 }}
            >
              Câu hỏi thường gặp Hình thức thanh toán
            </Link>
            <Link
              to="#"
              color="inherit"
              underline="hover"
              style={{ marginBottom: 5 }}
            >
              Câu hỏi thường gặp
            </Link>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            direction="column"
            container
            style={{ marginBottom: 15, padding: "10px" }}
          >
            <Typography
              variant="h5"
              component="h2"
              style={{ marginBottom: 10 }}
            >
              KẾT NỐI VỚI HOLAME STORE
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
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            direction="column"
            container
            style={{ marginBottom: 15, padding: "10px" }}
          >
            <Typography
              variant="h5"
              component="h3"
              style={{ marginBottom: 15 }}
            >
              THÔNG TIN LIÊN HỆ
            </Typography>

            <Typography variant="body1" gutterBottom>
              Hotline: 0964.411.582
            </Typography>
            <Typography variant="body1" gutterBottom>
              Email: holame.cskh@gmail.com
            </Typography>
            <Typography variant="body1" gutterBottom>
              Thời gian làm việc: 07h30 – 22h00, tất cả các ngày trong tuần
            </Typography>
            <Typography variant="body1" gutterBottom>
              Địa chỉ: Đông Anh, Hà Nội
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            direction="column"
            container
            style={{ marginBottom: 15, padding: "10px" }}
          >
            <Typography
              variant="h5"
              component="h2"
              style={{ marginBottom: 15 }}
            >
              CHÍNH SÁCH & BẢO MẬT
            </Typography>
            <Link
              to="#"
              color="inherit"
              underline="hover"
              style={{ marginBottom: 5 }}
            >
              Chính sách vận chuyển
            </Link>
            <Link
              to="#"
              color="inherit"
              underline="hover"
              style={{ marginBottom: 5 }}
            >
              Chính sách đổi trả
            </Link>
            <Link
              to="#"
              color="inherit"
              underline="hover"
              style={{ marginBottom: 5 }}
            >
              Chính sách bảo hành đồ điện
            </Link>
            <Link
              to="#"
              color="inherit"
              underline="hover"
              style={{ marginBottom: 5 }}
            >
              Bảo mật thông tin
            </Link>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            direction="row"
            container
            style={{ marginBottom: 15, padding: "10px" }}
          >
            <Typography
              variant="h5"
              component="h2"
              style={{ marginBottom: 15 }}
            >
              BỘ SƯU TẬP
            </Typography>
            <div>
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
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Footer;
