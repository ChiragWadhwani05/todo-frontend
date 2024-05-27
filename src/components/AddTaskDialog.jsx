import { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  IconButton,
  Box,
  Avatar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { useCreateTodoMutation } from '../api/auth/todoApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAddTaskDialog } from '../features/misc/dialogs';
const AddTaskDialog = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    coverImage: '',
  });
  const [{ isLoading }] = useCreateTodoMutation();
  const addTaskDialog = useSelector((state) => state.dialogs.addTaskDialog);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        coverImage: URL.createObjectURL(file),
      }));
    }
  };

  const handleSave = () => {};
  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      coverImage: '',
    });
    dispatch(toggleAddTaskDialog());
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={addTaskDialog}
      aria-labelledby="responsive-dialog-title"
      maxWidth="md"
      fullWidth
      onClose={handleClose}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Add New Task
        <IconButton
          aria-label="close"
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={handleClose}
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
            gap: 2,
            mt: 2,
          }}
        >
          <TextField
            name="title"
            label="Title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              sx={{ width: 80, height: 80 }}
              src={formData.coverImage || 'https://via.placeholder.com/80'}
              alt="Cover"
            />
            <Button variant="contained" component="label">
              Upload Cover Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 2 }}>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          disabled={isLoading}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskDialog;
