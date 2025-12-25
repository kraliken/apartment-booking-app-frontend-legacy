import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.scss'
import Navigation from './components/Navigation'
import Landing from './pages/Landing'
import GoogleRedirect from './pages/GoogleRedirect'
import Reservation from './pages/Reservation'
import CurrentReservations from './pages/CurrentReservations'
import PrivateRouteUser from './utils/PrivateRouteUser';
import { useContext, useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode';
import checkJwtToken from './utils/checkJwtToken'
import About from './pages/About';
import UserContext from './context/user-context'
import ReservationsPublic from './pages/ReservationsPublic';
import ReservationForAdmin from './pages/ReservationForAdmin';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap'
import reservationApi from './api/reservationApi'


function App() {

  const { getAuthUser } = useContext(UserContext)

  const [pathname, setPathname] = useState("/")

  useEffect(() => {

    if(checkJwtToken()){
      const decoded = jwt_decode(localStorage.jwtToken)
      getAuthUser(decoded)
      reservationApi.authorize(localStorage.jwtToken)
    }

  }, [])

  return (
    <Router>
      <Container fluid className={pathname === "/" ? "app-container dark d-flex flex-column position-relative" : "app-container d-flex flex-column position-relative"}>
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Landing setPathname={setPathname} />
          </Route>
          <Route exact path="/reservations">
            <ReservationsPublic setPathname={setPathname} />
          </Route>
          <Route path="/auth/google">
            <GoogleRedirect 
              setPathname={setPathname} 
            />
          </Route>
          <Route exact path="/about">
            <About setPathname={setPathname} />
          </Route>
          <PrivateRouteUser 
            exact path='/auth/reservation' 
            component={Reservation}
            setPathname={setPathname}
          />
          <PrivateRouteUser 
            exact path='/auth/reservation_to_user' 
            component={ReservationForAdmin}
            setPathname={setPathname}
          />
          <PrivateRouteUser 
            exact path='/auth/current_reservation' 
            component={CurrentReservations}
            setPathname={setPathname}
          />
        </Switch>
        <Footer />
      </Container>
    </Router>
  );
}

export default App;
