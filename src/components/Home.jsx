import {useSelector} from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import {selectCurrentUser} from '../features/auth/authSlice';
import Logout from './Logout';

const Home = () => {
  const user = useSelector(selectCurrentUser);

  return (
    <div>
      <Card sx={{maxWidth: 345}}>
        <Typography variant="h3">Welcome {user.givenName}</Typography>
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
      <Logout />
    </div>
  );
};

export default Home;
