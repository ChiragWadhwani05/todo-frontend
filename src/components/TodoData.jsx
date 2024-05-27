import { useState, useEffect, useRef } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const TodoItem = () => {
  const initialTodo = {
    id: 1,
    title: 'Todo 1',
    completed: false,
    discription: 'Here Comes the Description',
    coverImage: '../../public/Images/placeholder.png',
  };

  const [todo, setTodo] = useState(initialTodo);
  const [originalTodo, setOriginalTodo] = useState(initialTodo);
  const [isEditing, setIsEditing] = useState({
    title: false,
    discription: false,
    coverImage: false,
  });

  const fileInputRef = useRef(null);

  const handleChange = (field) => (event) => {
    setTodo({
      ...todo,
      [field]: event.target.value,
    });
  };

  const handleSave = () => {
    console.log('Saved Todo:', todo);
    setOriginalTodo(todo);
    setIsEditing({
      title: false,
      discription: false,
      coverImage: false,
    });
    // You can add your save logic here, such as making an API call to save the changes
  };

  const handleKeyDown = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
      event.preventDefault();
      handleSave();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [todo]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTodo({
          ...todo,
          coverImage: reader.result,
        });
        setIsEditing({
          ...isEditing,
          coverImage: false,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const hasChanges = JSON.stringify(todo) !== JSON.stringify(originalTodo);

  return (
    <Box
      sx={{ width: '100%', height: '100%', bgcolor: 'background.paper', mt: 2 }}
    >
      <Box
        sx={{
          height: 300,
          backgroundImage: `url(${todo.coverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
        {isEditing.coverImage ? (
          <TextField
            value={todo.coverImage}
            onChange={handleChange('coverImage')}
            onBlur={() => setIsEditing({ ...isEditing, coverImage: false })}
            sx={{ position: 'absolute', top: 10, left: 10, bgcolor: 'white' }}
          />
        ) : (
          <Button
            onClick={() => fileInputRef.current.click()}
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              bgcolor: 'rgba(255, 255, 255, 0.7)',
            }}
          >
            Edit Image
          </Button>
        )}
      </Box>
      <Box sx={{ p: 3 }}>
        {isEditing.title ? (
          <TextField
            value={todo.title}
            onChange={handleChange('title')}
            onBlur={() => setIsEditing({ ...isEditing, title: false })}
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
        ) : (
          <Typography
            variant="h3"
            sx={{ mb: 2, cursor: 'pointer' }}
            onClick={() => setIsEditing({ ...isEditing, title: true })}
          >
            {todo.title}
          </Typography>
        )}
        {isEditing.discription ? (
          <TextField
            value={todo.discription}
            onChange={handleChange('discription')}
            onBlur={() => setIsEditing({ ...isEditing, discription: false })}
            fullWidth
            variant="outlined"
            multiline
            rows={4}
          />
        ) : (
          <Typography
            variant="body1"
            sx={{ cursor: 'pointer' }}
            onClick={() => setIsEditing({ ...isEditing, discription: true })}
          >
            {todo.discription}
          </Typography>
        )}
        {hasChanges && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ mt: 10 }}
          >
            Save
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default TodoItem;
