import Container from "react-bootstrap/Container";
import TeamBanner from "../assets/images/banner.png"

const Banner = () => {
  return (
    <>
      <Container fluid className="banner">
        <img className="img-fluid" src={TeamBanner} alt="Banner" />
      </Container>
    </>
  );
};

export default Banner;
