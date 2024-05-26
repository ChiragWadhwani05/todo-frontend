import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';
import Sidebar from './Sidebar';
import ProfileDialog from './ProfileDialog';

const Home = () => {
  const user = useSelector(selectCurrentUser);
  console.log('user', user);
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <ProfileDialog />
    </div>
  );
};

export default Home;
