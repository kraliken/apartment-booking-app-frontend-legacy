import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom'
import userContext from '../context/user-context';
// import checkJwtToken from './checkJwtToken';


const PrivateRouteUser = ({ component: Component, ...rest }) => {

  const { isAuth } = useContext(userContext)

  return(
    <Route
      {...rest}
      render={props =>
        isAuth ? (
          <Component {...rest} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  )

};

export default PrivateRouteUser;
