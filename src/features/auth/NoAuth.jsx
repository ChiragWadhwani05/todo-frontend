import {useSelector} from 'react-redux';
import {selectCurrentUser} from './authSlice';
import {Outlet} from 'react-router-dom';
import Home from '../../components/Home';

const NoAuth = () => {
  const user = useSelector(selectCurrentUser);

  return user.authorizationToken ? <Home /> : <Outlet />;
};

export default NoAuth;
