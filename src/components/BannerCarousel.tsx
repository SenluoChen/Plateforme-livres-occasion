import Slider from "react-slick";
import { IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        right: 10,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 2,
        backgroundColor: "white",
        boxShadow: 2,
        "&:hover": { backgroundColor: "#f1f1f1" },
      }}
    >
      <ArrowForwardIos fontSize="small" />
    </IconButton>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        left: 10,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 2,
        backgroundColor: "white",
        boxShadow: 2,
        "&:hover": { backgroundColor: "#f1f1f1" },
      }}
    >
      <ArrowBackIos fontSize="small" />
    </IconButton>
  );
}

export default function BannerCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dotsClass: "slick-dots slick-thumb",
  };

return (
  <div
    style={{
      width: "100%",
      height: "100%", // ✅ 統一高度
      margin: "0 auto",
      position: "relative",
    }}
  >
    <Slider {...settings}>
      {[
        "/415733e0a7dd580b2287bed8c49a.webp",
        "/09528d22be1bae5b7d70932b9a2c.webp",
        "/a93727b92980a20f17bc8258800a.webp",
      ].map((src, idx) => (
        <div key={idx}>
          <img
            src={src}
            alt={`促銷${idx + 1}`}
            style={{
              width: "100%",       // 
              height: "100%",     // 
              objectFit: "cover",  // 
            }}
          />
        </div>
      ))}
    </Slider>
  </div>
);
}
