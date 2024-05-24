import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectCurrentUser, setCredentials} from '../features/auth/authSlice';
import {useSelfQuery} from '../api/auth/authApiSlice';

const useFetchUserData = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const [loading, setLoading] = useState(true); // Add loading state
  const authorizationToken = localStorage.getItem('authorizationToken');
  const skip = authorizationToken === null;
  console.log(skip);
  const {data, error, isLoading} = useSelfQuery(undefined, {
    skip: !authorizationToken,
  });

  useEffect(() => {
    const fetchUserData = () => {
      if (authorizationToken && !user.isLoggedIn && !isLoading) {
        if (data && !error) {
          dispatch(
            setCredentials({
              ...data.data,
              authorizationToken,
              isLoggedIn: true,
            }),
          );
        } else if (error) {
          console.error('Failed to fetch user data: ', error);
        }
      }

      if (!isLoading) {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [
    authorizationToken,
    user.isLoggedIn,
    isLoading,
    error,
    data,
    user.authorizationToken,
    dispatch,
  ]);

  return loading;
};

export default useFetchUserData;
