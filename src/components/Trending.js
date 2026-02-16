import { Container } from "react-bootstrap";
import ModernMovieCard from "./ModernMovieCard";
import duneImage from "../assets/images/trending/dune.jpg";
import everythingImage from "../assets/images/trending/everything.jpg";
import infiniteImage from "../assets/images/trending/infinite.jpg";
import jokerImage from "../assets/images/trending/joker.jpg";
import lightyearImage from "../assets/images/trending/lightyear.jpg";
import morbiusImage from "../assets/images/trending/morbius.jpg";

const Trending = () => {
  const trendingMovies = [
    { title: "DUNE", image: duneImage, platform: "HBOMax" },
    { title: "EVERYTHING EVERWHERE", image: everythingImage, platform: "A24" },
    { title: "INFINITE", image: infiniteImage, platform: "Sky Cinema" },
    { title: "JOKER", image: jokerImage, platform: "HBOMax" },
    { title: "LIGHT YEAR", image: lightyearImage, platform: "Disney+" },
    { title: "MORBIUS", image: morbiusImage, platform: "Sony" },
  ];

  return (
    <div id="trending" className="py-5">
      <Container>
        <h3 className="text-white">TRENDING MOVIES</h3>
        <div className="horizontal-scroll-wrapper">
          {trendingMovies.map((movie, index) => (
            <div key={index} className="horizontal-scroll-item">
              <ModernMovieCard
                title={movie.title}
                image={movie.image}
                platform={movie.platform}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Trending;
