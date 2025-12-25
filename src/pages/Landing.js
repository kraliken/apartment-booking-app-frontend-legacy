import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import { useHistory, NavLink, Link } from 'react-router-dom';

const Landing = ({ setPathname }) => {

  let history = useHistory();

  useEffect(() => {

    setPathname(history.location.pathname)

  }, [])


  return (
    <>
      <Container className="landing-container">
        <div className=" position-absolute bg-image" style={{ backgroundImage: `url(https://apartment-booking-app-backend-legacy.azurewebsites.net/images/apartman.jpg)` }}></div>
        <Row>
          <Col className="landing-content">
            <h1 className="landing-title text-uppercase mt-4">panoráma<br /> apartman</h1>
            <p className="landing-subtitle fst-italic">Pilisszantó</p>
          </Col>
        </Row>
        <Row>
          <Col className="landing-content">
            {/* <Button variant="dark" className="rounded-0 text-lowercase mt-4 landinng-button"> */}
            <NavLink as={Link} className="btn btn-outline-light rounded-0 text-lowercase px-4 py-2 mt-5 landinng-button" exact to='/reservations'>Foglalás</NavLink>
            {/* </Button> */}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Landing
