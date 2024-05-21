import {useSelector} from 'react-redux';
import {selectUser} from '../features/auth/userSlice';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';

const Home = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isLoggedIn) {
      navigate('/login');
    }
  }, [navigate, user.isLoggedIn]);

  return (
    <Card sx={{maxWidth: 345}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={user.avatar || 'https://source.unsplash.com/random'}
          alt={user.username}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {user.username} -- {user.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Welcome {user.givenName} {user.familyName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Home;
