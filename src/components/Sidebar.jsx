import React from 'react';
import {
  Drawer,
  Avatar,
  IconButton,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ContrastOutlinedIcon from '@mui/icons-material/ContrastOutlined';
import ListItemButton from '@mui/material/ListItemButton';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';
import { toggleProfileDialog } from '../features/misc/dialogs';

const drawerWidth = 300;

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const Sidebar = () => {
  const user = useSelector(selectCurrentUser);
  const [checked, setChecked] = React.useState([0]);
  const dummyTodos = [
    {
      coverImage: 'https://source.unsplash.com/random/400x200?sig=1',
      title: 'Finish React Project',
      description:
        'Complete the frontend for the new React project by the end of the week.',
      isComplete: false,
    },
    {
      coverImage: 'https://source.unsplash.com/random/400x200?sig=2',
      title: 'Grocery Shopping',
      description:
        'Buy groceries for the week including fruits, vegetables, and dairy products.',
      isComplete: true,
    },
    {
      coverImage: 'https://source.unsplash.com/random/400x200?sig=3',
      title: 'Workout Session',
      description:
        'Attend the gym for a workout session focusing on strength training and cardio.',
      isComplete: false,
    },
    {
      coverImage: 'https://source.unsplash.com/random/400x200?sig=4',
      title: 'Read a Book',
      description: 'Read at least 50 pages of the current book I am reading.',
      isComplete: true,
    },
    {
      coverImage: 'https://source.unsplash.com/random/400x200?sig=5',
      title: 'Team Meeting',
      description:
        'Participate in the weekly team meeting to discuss project updates and next steps.',
      isComplete: false,
    },
    {
      coverImage: 'https://source.unsplash.com/random/400x200?sig=6',
      title: 'Call with Client',
      description:
        'Have a conference call with the client to discuss their requirements and feedback.',
      isComplete: true,
    },
    {
      coverImage: 'https://source.unsplash.com/random/400x200?sig=7',
      title: 'Plan Weekend Trip',
      description:
        'Plan the itinerary and book accommodations for the weekend trip.',
      isComplete: false,
    },
    {
      coverImage: 'https://source.unsplash.com/random/400x200?sig=8',
      title: 'Complete Online Course',
      description:
        'Finish the modules and assignments for the online course on Data Science.',
      isComplete: true,
    },
    {
      coverImage: 'https://source.unsplash.com/random/400x200?sig=9',
      title: 'Cook Dinner',
      description: 'Prepare a healthy dinner for the family with a new recipe.',
      isComplete: false,
    },
    {
      coverImage: 'https://source.unsplash.com/random/400x200?sig=10',
      title: 'Update Resume',
      description:
        'Revise and update my resume with the latest work experience and skills.',
      isComplete: true,
    },
  ];
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const dispatch = useDispatch();
  const handleProfileClick = () => {
    dispatch(toggleProfileDialog());
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <Button
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            textTransform: 'none',
          }}
          onClick={handleProfileClick}
        >
          {user.avatar ? (
            <Avatar src={user.avatar} sx={{ width: 30, height: 30, mr: 1 }} />
          ) : (
            <Avatar
              {...stringAvatar(
                `${user.givenName} ${user.familyName ? user.familyName : ''}`
              )}
              sx={{ width: 30, height: 30, mr: 1 }}
            />
          )}
          <Typography variant="h6" component="div" sx={{ color: '#FFFFFF' }}>
            {user.givenName} {user.familyName}
          </Typography>
        </Button>
        <IconButton sx={{ marginLeft: 'auto' }}>
          <ContrastOutlinedIcon />
        </IconButton>
      </Box>

      <Box sx={{ p: 2 }}>
        <Button
          startIcon={<AddCircleIcon />}
          sx={{ width: '100%', textTransform: 'none' }}
        >
          <Typography variant="body1" fontWeight={700}>
            Add Task
          </Typography>
        </Button>
      </Box>

      <Box>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          {dummyTodos.map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem
                key={value.title}
                secondaryAction={
                  <IconButton edge="end" aria-label="comments">
                    <DeleteIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton role={undefined} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={value.isComplete}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                      onClick={handleToggle(value)}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={value.title} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
