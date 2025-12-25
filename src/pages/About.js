import React, { useEffect } from 'react'
import { Container, Row, Col, Carousel } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const About = ({ setPathname }) => {

  const history = useHistory()

  useEffect(() => {

    setPathname(history.location.pathname)

  }, [])

  return (
    <Container>
      <Row className="justify-content-between align-items-start">
        <Col lg={5} className="about mt-4">
          <h4 className="mt-0 mb-4">Bemutatkozás</h4>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident officiis ratione labore exercitationem ex, qui inventore harum accusantium totam deleniti facilis consequatur dolor sunt quas pariatur perspiciatis nisi, reprehenderit maiores aliquam cupiditate repellat delectus. Id corporis rem ex reprehenderit, asperiores rerum optio delectus aut. Quis tempore facilis accusamus nemo ipsa.</p>
        </Col>
        <Col lg={6} className="mt-4">
          <Carousel fade>
            <Carousel.Item>
              <img
                className="d-block w-100 rounded"
                src="http://localhost:5000/images/apartman_01.jpg"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 rounded"
                src="http://localhost:5000/images/apartman_02.jpg"
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 rounded"
                src="http://localhost:5000/images/apartman_03.jpg"
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 rounded"
                src="http://localhost:5000/images/apartman_05.jpg"
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 rounded"
                src="http://localhost:5000/images/apartman_06.jpg"
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 rounded"
                src="http://localhost:5000/images/apartman_07.jpg"
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 rounded"
                src="http://localhost:5000/images/apartman_08.jpg"
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 rounded"
                src="http://localhost:5000/images/apartman_09.jpg"
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </Container>
  )
}

export default About
