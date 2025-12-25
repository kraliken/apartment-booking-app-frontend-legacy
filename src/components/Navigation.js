import './Navigation.scss'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa"
import UserContext from '../context/user-context'
import { useContext } from 'react'
import { NavDropdown } from 'react-bootstrap'
import useLoginApi from '../hook/useLoginApi'

// import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
// import { BsFillHouseDoorFill } from "react-icons/bs";
// import Sidebar from './Sidebar';


const Navigation = () => {

  const { 
    getGoogleAuthUrl
  } = useLoginApi()


  const { isAuth, user } = useContext(UserContext)

  const handleLoginWithGoogle = async () => {
    getGoogleAuthUrl()
  }

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    window.location.href = '/';
  }

  return (
    <>
      <Navbar expand="md" bg="dark" variant="dark" className="position-fixed top-0 start-0 w-100 text-lowercase">
        <Container fluid="md" className="justify-content-between">
          <Link to='/' className="logo text-center navbar-brand position-relative d-flex align-items-center text-uppercase">
            Panoráma Apartman<br />
            Pilisszántó
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <NavLink as={Link} exact to='/' className="nav-link mr-4">Kezdőlap</NavLink>
              {!isAuth  && <NavLink as={Link} exact to='/reservations' className="nav-link mr-4">Foglalás</NavLink>}              
              <NavLink as={Link} exact to='/about' className="nav-link mr-4">Bemutatkozás</NavLink>
              {(isAuth && !user.admin) ? (
                <>
                  <NavDropdown title={`${user.last_name} ${user.first_name}`} id="collasible-nav-dropdown">
                    <NavDropdown.Item >
                      <NavLink as={Link} to='/auth/reservation' className="nav-link">Online foglalás</NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item >
                      <NavLink as={Link} to='/auth/current_reservation' className="nav-link">Aktuális foglalásaim</NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item >
                      <p 
                        variant="outline-light" 
                        size="sm" 
                        className="nav-link m-0"
                        onClick={handleLogout}
                      >                  
                        Kilépés
                      </p>
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (isAuth && user.admin) ? (
                <>
                  <NavDropdown title={`${user.last_name} ${user.first_name}`} id="collasible-nav-dropdown">
                    <NavDropdown.Item >
                      <NavLink as={Link} to='/auth/reservation' className="nav-link">Foglalás vendégnek</NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item >
                      <NavLink as={Link} to='/auth/reservation_to_user' className="nav-link">Foglalás adminként</NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item >
                      <NavLink as={Link} to='/auth/current_reservation' className="nav-link">Foglalások</NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item >
                      <p 
                        variant="outline-light" 
                        size="sm" 
                        className="nav-link m-0"
                        onClick={handleLogout}
                      >                  
                        Kilépés
                      </p>
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) :
              (<Button 
                variant="outline-light" 
                size="sm" 
                className="btn btn-outline-light my-2 my-md-0 ms-md-3 w-50 text-lowercase login-btn rounded-0"
                onClick={handleLoginWithGoogle}
              >
                <FaGoogle className="me-2"/>
                Bejelentkezés
              </Button>)
            }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Navigation
