import Slider from "react-slick";

export default function BannerCarousel() {
  const settings = {
    dots: true,          // 底部小點
    infinite: true,      // 無限循環
    speed: 500,          // 切換速度
    autoplay: true,      // 自動輪播
    autoplaySpeed: 3000, // 3秒換一次
    slidesToShow: 1,     // 一次顯示一張
    slidesToScroll: 1,
  };

  return (
    <div className="banner-container" style={{ width: "40%", height:"50%", maxWidth: "800px", margin: "0 auto" }}>
  <Slider {...settings}>
        <img src="/book.avif" alt="促銷1" className="banner" />
        <img src="/banner2.jpg" alt="促銷2" className="banner" />
        <img src="/banner3.jpg" alt="促銷3" className="banner" />
      </Slider>
    </div>

    
  );
}
