import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectCurrentUser, setCredentials} from '../features/auth/authSlice';

const useFetchUserData = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchUserData = async () => {
      const authorizationToken = localStorage.getItem('authorizationToken');
      if (authorizationToken && !user.isLoggedIn) {
        try {
          const response = await fetch(
            'https://todo-backend-production-1fc6.up.railway.app/api/v1/users',
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authorizationToken}`,
              },
            },
          );
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            dispatch(
              setCredentials({
                ...data.data.user,
                authorizationToken,
                isLoggedIn: true,
              }),
            );
          } else {
            console.error('Failed to fetch user data: ', response.status);
          }
        } catch (err) {
          console.error('Failed to fetch user data: ', err);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, [user.isLoggedIn, user.authorizationToken, dispatch]);

  return loading;
};

export default useFetchUserData;
