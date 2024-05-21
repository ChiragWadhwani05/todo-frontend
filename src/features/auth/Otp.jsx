// src/OtpPage.js
import {useState, useRef, useEffect} from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {selectUser, setUser} from './userSlice';
import {useNavigate} from 'react-router-dom';

const OtpPage = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputRefs = useRef([]);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.password) {
      navigate('/register');
    }
  }, [navigate, user.password]);

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
    alert('Entered OTP is ' + otp.join(''));

    const res = await (
      await fetch(
        'https://todo-backend-production-1fc6.up.railway.app/api/v1/users/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({...user, otp: Number(otp.join(''))}),
        },
      )
    ).json();
    console.log(res);

    if (!res.success) return;

    dispatch(setUser({...res.data, isLoggedIn: true}));
    navigate('/');
  };

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
          We have sent you a One Time Password to your email({user.email}).
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
