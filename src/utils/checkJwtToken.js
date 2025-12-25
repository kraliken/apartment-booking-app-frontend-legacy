import jwt_decode from 'jwt-decode';

const checkJwtToken = () => {

  if (localStorage.jwtToken) {

    const decoded = jwt_decode(localStorage.jwtToken);

    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      
      localStorage.removeItem("jwtToken")
      return false

    } else {

      return true

    }
  }

};

export default checkJwtToken;