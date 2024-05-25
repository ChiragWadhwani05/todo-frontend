// src/OtpPage.js
import {useState, useRef} from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {selectCurrentUser, setCredentials} from '../features/auth/authSlice';
import {useRegisterMutation} from '../api/auth/authApiSlice';

const OtpPage = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const [register, {isLoading}] = useRegisterMutation();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus on next input if current input is filled
    if (element.value !== '' && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const {email, password, username, givenName, familyName} = user;

      const data = await register({
        email,
        password,
        username,
        givenName,
        familyName,
        otp: parseInt(otp.join('')),
      });

      if (data) {
        localStorage.setItem(
          'authorizationToken',
          data.data.authorizationToken,
        );
        dispatch(setCredentials({...data.data, password: null}));

        navigate('/');
      }
    } catch (err) {
      console.error('Failed to register: ', err);
    }
  };

  if (isLoading) {
    return 'Loading...';
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
        }}>
        <Typography variant="h4" gutterBottom>
          Enter OTP
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          We have sent you a One Time Password to your email.
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
          <Grid container spacing={2}>
            {otp.map((data, index) => (
              <Grid item xs={2} key={index}>
                <TextField
                  variant="outlined"
                  inputProps={{maxLength: 1, style: {textAlign: 'center'}}}
                  value={data}
                  onChange={e => handleChange(e.target, index)}
                  onKeyDown={e => handleKeyDown(e, index)}
                  inputRef={el => (inputRefs.current[index] = el)}
                  onFocus={e => e.target.select()}
                />
              </Grid>
            ))}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{mt: 3}}>
            Verify OTP
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default OtpPage;
