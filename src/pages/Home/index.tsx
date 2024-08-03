import PromoBox from "../../components/PromoBox";
import ScrollProduct from "../../components/ScrollProduct";
import Slideshow from "../../components/SlideShow";

const Home = () => {
  return (
    <div>
      <Slideshow />
      <PromoBox
        imageSrc="https://picsum.photos/1000/500"
        title="NIKE AIR FORCE 1"
        description="Air force 1"
        buttonLabel="Shop Now"
        buttonLink="/shop"
      />
      <ScrollProduct href={true} />
    </div>
  );
};

export default Home;
