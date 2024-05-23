import {useSelector} from 'react-redux';
import {selectCurrentUser} from './authSlice';
import {Home} from '@mui/icons-material';
import {Outlet} from 'react-router-dom';

const NoAuth = () => {
  const user = useSelector(selectCurrentUser);

  return user.authorizationToken ? <Home /> : <Outlet />;
};

export default NoAuth;
