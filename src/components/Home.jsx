import {useSelector} from 'react-redux';
import {selectUser} from '../features/auth/userSlice';

const Home = () => {
  const user = useSelector(selectUser);
  return (
    <div>
      <img
        src={user.avatar}
        style={{
          width: '100px',
          height: '100px',
          border: '2px solid green',
          borderRadius: '50%',
        }}
      />
      <p>id: {user._id}</p>
      <p>username: {user.username}</p>
      <p>email: {user.email}</p>
      <p>authorizationToken: {user.authorizationToken}</p>
      <br />
      <p>
        {user.givenName} {user.familyName}
      </p>
    </div>
  );
};

export default Home;
