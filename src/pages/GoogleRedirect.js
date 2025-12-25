import React, { useEffect } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import useLoginApi from '../hook/useLoginApi';

const GoogleRedirect = ({ setPathname }) => {

  const {
    getGoogleUserData,
  } = useLoginApi()

  let location = useLocation()
  const history = useHistory()

  useEffect(() => {

    setPathname(history.location.pathname)

    console.log("pathname:", location.pathname);
    console.log("search:", location.search);
    console.log("code:", new URLSearchParams(location.search).get("code"));

    const userAuthCode = new URLSearchParams(location.search).get("code");
    getGoogleUserData({ code: userAuthCode })

  }, [])

  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-center align-items-center mt-5">
          <Spinner
            className="me-2"
            as="span"
            animation="border"
            role="status"
            aria-hidden="true"
          />
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center align-items-center mt-5">
          <p>a belépés folyamatban...</p>
        </Col>
      </Row>
    </Container>
  )
}

export default GoogleRedirect