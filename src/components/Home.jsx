import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';
import Sidebar from './Sidebar';
import ProfileDialog from './ProfileDialog';
import TodoItem from './TodoData';
import AddTaskDialog from './AddTaskDialog';
import { Box, Container } from '@mui/material';

const Home = () => {
  const user = useSelector(selectCurrentUser);
  console.log('user', user);
  return (
    <Box sx={{ display: 'flex', width: '100%', margin: '0', padding: '0' }}>
      <Sidebar />
      <ProfileDialog />
      <AddTaskDialog />
      <Container maxWidth="lg">
        <TodoItem />
      </Container>
    </Box>
  );
};

export default Home;
