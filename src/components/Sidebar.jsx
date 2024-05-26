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
import {useDispatch, useSelector} from 'react-redux';
import {selectCurrentUser} from '../features/auth/authSlice';
import {toggleProfileDialog} from '../features/misc/dialogs';
import {selectAllTodo} from '../features/todos/todosSlice';
import {
  useCreateTodoMutation,
  useDeleteTodoMutation,
} from '../api/auth/todoApiSlice';

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
  const todos = useSelector(selectAllTodo);
  const [createTodo, {isLoading}] = useCreateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [todosToDelete, setTodosToDelete] = React.useState(new Set());

  const handleToggle = value => () => {
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
      anchor="left">
      <Box sx={{p: 2, display: 'flex', alignItems: 'center'}}>
        <Button
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            textTransform: 'none',
          }}
          onClick={handleProfileClick}>
          {user.avatar ? (
            <Avatar src={user.avatar} sx={{width: 30, height: 30, mr: 1}} />
          ) : (
            <Avatar
              {...stringAvatar(
                `${user.givenName} ${user.familyName ? user.familyName : ''}`,
              )}
              sx={{width: 30, height: 30, mr: 1}}
            />
          )}
          <Typography variant="h6" component="div" sx={{color: '#FFFFFF'}}>
            {user.givenName} {user.familyName}
          </Typography>
        </Button>
        <IconButton sx={{marginLeft: 'auto'}}>
          <ContrastOutlinedIcon />
        </IconButton>
      </Box>

      <Box sx={{p: 2}}>
        <Button
          startIcon={<AddCircleIcon />}
          sx={{width: '100%', textTransform: 'none'}}
          onClick={async () =>
            await createTodo({title: 'New Task', description: 'desc'})
          }
          disabled={isLoading}>
          <Typography variant="body1" fontWeight={700}>
            Add Task
          </Typography>
        </Button>
      </Box>

      <Box>
        <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
          {Object.values(todos).map(todo => {
            const labelId = `checkbox-list-label-${todo._id}`;

            return (
              <ListItem
                key={todo._id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    onClick={async () => {
                      setTodosToDelete(curTodosToDelete => {
                        const newTodosToDelete = new Set(curTodosToDelete);
                        newTodosToDelete.add(todo._id);
                        return newTodosToDelete;
                      });
                      await deleteTodo({_id: todo._id});
                      setTodosToDelete(curTodosToDelete => {
                        const newTodosToDelete = new Set(curTodosToDelete);
                        newTodosToDelete.delete(todo._id);
                        return newTodosToDelete;
                      });
                    }}
                    disabled={todosToDelete.has(todo._id)}>
                    <DeleteIcon />
                  </IconButton>
                }
                disablePadding>
                <ListItemButton role={undefined} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={todo.isComplete}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{'aria-labelledby': labelId}}
                      onClick={handleToggle(todo)}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={todo.title} />
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
