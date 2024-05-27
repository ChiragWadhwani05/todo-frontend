import { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Button,
  useMediaQuery,
  Box,
  Avatar,
  Grid,
  Tooltip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { toggleProfileDialog } from '../features/misc/dialogs';
import { selectCurrentUser } from '../features/auth/authSlice';

const ProfileDialog = () => {
  const dispatch = useDispatch();
  const profileDialog = useSelector((state) => state.dialogs.profileDialog);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setIsEditing(false);
    dispatch(toggleProfileDialog());
  };

  const user = useSelector(selectCurrentUser);
  const [formData, setFormData] = useState({
    givenName: user.givenName,
    familyName: user.familyName,
    username: user.username,
    email: user.email,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Add logic to save changes
    console.log('Saved:', formData);
    setIsEditing(false);
    handleClose();
  };

  const handleDiscard = () => {
    setFormData({
      givenName: user.givenName,
      familyName: user.familyName,
      username: user.username,
      email: user.email,
    });
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          avatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={profileDialog}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      maxWidth="md"
      fullWidth
      sx={{ m: 0, p: 2 }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        My Profile
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            mt: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                }}
              >
                <Avatar
                  sx={{ width: 120, height: 120, background: '#eee' }}
                  src={formData.avatar || user.avatar}
                />
                {isEditing && (
                  <Tooltip
                    title="Edit"
                    sx={{ position: 'absolute', backgroundColor: '#000000' }}
                  >
                    <IconButton
                      color="primary"
                      component="label"
                      sx={{ position: 'absolute' }}
                    >
                      <PhotoCameraIcon color="primary" />
                      <input type="file" hidden onChange={handleImageChange} />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="First name"
                    name="givenName"
                    value={formData.givenName}
                    onChange={handleChange}
                    fullWidth
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last name"
                    name="familyName"
                    value={formData.familyName}
                    onChange={handleChange}
                    fullWidth
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    fullWidth
                    disabled
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ m: 0, p: 2 }}>
        {isEditing ? (
          <>
            <Button onClick={handleDiscard} variant="outlined">
              Discard
            </Button>
            <Button onClick={handleSave} variant="contained" color="primary">
              Save
            </Button>
          </>
        ) : (
          <Button onClick={handleEdit} variant="contained">
            Edit
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ProfileDialog;
