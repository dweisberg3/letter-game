
import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, TextField, Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

interface User {
  id: number; // to give each user a new key for react components .. not stored in db
  firstname: string;
  lastname: string;
  grade:string;
  username:string;
  password:string;
}

const AdminPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
  const [userRecord,setUserRecord] = useState<any>();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newUser, setNewUser] = useState<User>({
    id:users.length + 1,
    firstname: '',
    lastname: '',
    grade:'',
    username:'',
    password:''
    
  });

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout(); // Clear the authentication state
    navigate('/login'); // Redirect to login page
  };
   // Function to fetch users from the API
  const fetchUsers = async () => {
    try {
      const response = await fetch('https://dweisberg.pythonanywhere.com/get_users'); // Replace with your API endpoint
      const data = await response.json();
      console.log(data)
      let id = 1;
      const allUsers: User[] = data.map((el:User) => ({id:id++,firstname:el.firstname,lastname:el.lastname,grade:el.grade,username:el.username,password:el.password}))
      console.log(allUsers)
      setUsers(allUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Function to add a new user via API using FormData
  const addUser = async () => {
    const formData = new FormData();
    formData.append('firstname', newUser.firstname);
    formData.append('lastname', newUser.lastname);
    formData.append('grade', newUser.grade)
    formData.append('username', newUser.username);
    formData.append('password', newUser.password);

    try {
      const response = await fetch('https://dweisberg.pythonanywhere.com/create_user', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        const user = data['new_user']
        const createdUser: User = {id:users.length+1,firstname:user[1],lastname:user[2],grade:user[3],username:user[4],password:user[5]}
        setUsers([...users, createdUser]);
      } else {
        alert('Username already exists');
        console.error('Error adding user:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const getRecords = async () => {
    try {
      const response = await fetch('https://dweisberg.pythonanywhere.com/get_records', {
        method: 'GET', // or 'PUT', 'PATCH' etc.
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user:selectedUser?.username}), // Convert JavaScript object to JSON
      });
    
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json(); // Parse JSON response
      setUserRecord(result)
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    fetchUsers(); // Fetch users when the component mounts
  }, []);

  
  const handleOpenDetailDialog = (user: User) => {
    setSelectedUser(user);
    getRecords();
    setOpenDetailDialog(true);
  };

  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false);
    setSelectedUser(null);
  };

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleAddUser = () => {
    addUser()
    // setUsers([...users, { ...newUser, id: users.length + 1 }]);
    setOpenAddDialog(false);
    setNewUser({ id: users.length + 1, firstname: '', lastname: '', grade:'', username:'',password:''});
  };

  return (
    <div>
      <h2>Users</h2>
      
      {/* Table of users */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Username</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.firstname}</TableCell>
                <TableCell>{user.lastname}</TableCell>
                <TableCell>{user.grade}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleOpenDetailDialog(user)}
                  >
                    Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add user button */}
      <Button variant="contained" color="primary" onClick={handleOpenAddDialog}>
        Add User
      </Button>

      {/* Detail Dialog */}
      <Dialog open={openDetailDialog} onClose={handleCloseDetailDialog}>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <>
              <DialogContentText>
                Name: {selectedUser.firstname} {selectedUser.lastname}
              </DialogContentText>
              <DialogContentText>
                Password: {selectedUser.password}
              </DialogContentText>
              <DialogContentText>
                {userRecord}
              </DialogContentText>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            fullWidth
            value={newUser.firstname}
            onChange={(e) => setNewUser({ ...newUser, firstname: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Last Name"
            fullWidth
            value={newUser.lastname}
            onChange={(e) => setNewUser({ ...newUser, lastname: e.target.value })}
          />
           <TextField
            margin="dense"
            label="Grade"
            fullWidth
            value={newUser.grade}
            onChange={(e) => setNewUser({ ...newUser, grade: e.target.value })}
          />
           <TextField
            margin="dense"
            label="Username"
            fullWidth
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          />
           <TextField
            margin="dense"
            label="Password"
            fullWidth
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddUser} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Button 
          variant="contained" 
          color="secondary" 
          onClick={handleSignOut}
          sx={{ mt: 2, margin:'10px' }}
        >
          Sign Out
        </Button>
    </div>
  );
};

export default AdminPage;
