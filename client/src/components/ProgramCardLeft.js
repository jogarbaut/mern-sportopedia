import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ProgramCardLeft = (props) => {
  const { title, subtitle, description, image, imageAlt } = props;
  return (
    <div>
      <Container className="program-card">
        <Row>
          <Col sm={4}>
            <img src={image} alt={imageAlt} />
          </Col>
          <Col sm={8}>
            <h2>{title}</h2>
            <h4>{subtitle}</h4>
            <p>{description}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProgramCardLeft;
