import {useDispatch} from 'react-redux';
import {logout} from '../features/auth/authSlice';
import {Button} from '@mui/material';

const Logout = () => {
  const dispatch = useDispatch();

  return (
    <Button
      onClick={() => {
        dispatch(logout());
      }}>
      Logout
    </Button>
  );
};

export default Logout;
