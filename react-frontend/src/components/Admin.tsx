
import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, Dialog, DialogActions, DialogContent,
  DialogTitle, TextField, Paper, Typography, Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { host_api } from '../utils/Constants';

interface User {
  id: number; // to give each user a new key for react components .. not stored in db
  firstname: string;
  lastname: string;
  grade:string;
  username:string;
  password:string;
}

interface Record {
  id: number;
  username: string;
  points: number;
  letter_level:number;
  selected_sections_index:number;
  is_cumulative:boolean;
  one_letter_game_with_miss: boolean;
  timestamp: string;
}


const AdminPage: React.FC = () => {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);
  const [userRecords,setUserRecords] = useState<Record[]>([]);
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

  

  const handleSignOut = () => {
    logout(); // Clear the authentication state
    navigate('/login'); // Redirect to login page
  };
   // Function to fetch users from the API
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${host_api}/get_users`); // Replace with your API endpoint
      const data = await response.json();
      let id = 1;
      const allUsers: User[] = data.map((el:User) => ({id:id++,firstname:el.firstname,lastname:el.lastname,grade:el.grade,username:el.username,password:el.password}))
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
      const response = await fetch(`${host_api}/create_user`, {
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

  const getRecords = async (user:string) => {
    try {
      const response = await fetch(`${host_api}/get_records?username=${encodeURIComponent(user)}`,{
        method: 'GET', // or 'PUT', 'PATCH' etc.
        headers: {
          'Content-Type': 'application/json',
        }
      });
    
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); // Parse JSON response
      const records: Record[] = data.map((el:Record) => ({id:el.id,username:el.username,points:el.points,letter_level:el.letter_level,selected_sections_index:el.selected_sections_index,is_cumulative:el.is_cumulative,one_letter_game_with_miss:el.one_letter_game_with_miss,timestamp:el.timestamp}))
      setUserRecords(records)
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    fetchUsers(); // Fetch users when the component mounts
  }, []);

  
  const handleOpenDetailDialog = async (user: User) => {
    setSelectedUser(user);
    await getRecords(user.username);
    setOpenDetailDialog(true);
  };

  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false);
    // setSelectedUser(null);
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
    <div style={{padding:"20px"}}>
      
       <Typography align="center" variant="h6" gutterBottom fontSize={"26px"}>
     Users
    </Typography>
      
      {/* Table of users */}
      <Box sx={{ padding: '20px' }}>
      <TableContainer   component={Paper}
    >
        <Table
         >
          <TableHead>
            <TableRow>
              
              <TableCell sx={{ borderBottom: '2px solid black' }}>First Name</TableCell>
              <TableCell sx={{ borderBottom: '2px solid black' }}>Last Name</TableCell>
              <TableCell sx={{ borderBottom: '2px solid black' }}>Grade</TableCell>
              <TableCell sx={{ borderBottom: '2px solid black' }}>Username</TableCell>
              <TableCell sx={{ borderBottom: '2px solid black' }}>Password</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.firstname}</TableCell>
                <TableCell>{user.lastname}</TableCell>
                <TableCell>{user.grade}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.password}</TableCell>
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
      </Box>

      {/* Add user button */}
      <Button variant="contained" 
              color="primary" 
              onClick={handleOpenAddDialog}
              sx= {{ position:"fixed", bottom:"17%", right:"5%" }}>
        Add User
      </Button>


 {/* Dialog containing the scrollable table */}
 <Dialog open={openDetailDialog} onClose={handleCloseDetailDialog} maxWidth="md" fullWidth>
        <DialogTitle>{`${selectedUser?.firstname} ${selectedUser?.lastname}'s Stats`}</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ borderBottom: '2px solid black' }}>Points</TableCell>
                  <TableCell sx={{ borderBottom: '2px solid black' }}>Section Selected</TableCell>
                  <TableCell sx={{ borderBottom: '2px solid black' }}>Num. of Letters</TableCell>
                  <TableCell sx={{ borderBottom: '2px solid black' }}>Cumulative</TableCell>
                  <TableCell sx={{ borderBottom: '2px solid black' }}>Made Mistake with Single Letter</TableCell>
                  <TableCell sx={{ borderBottom: '2px solid black' }}>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userRecords.map((attempt:Record, index:number) => (
                  <TableRow key={index}>
                    <TableCell>{attempt.points}</TableCell>
                    <TableCell>{attempt.selected_sections_index}</TableCell>
                    <TableCell>{attempt.letter_level}</TableCell>
                    <TableCell>{attempt.is_cumulative ? "Yes" : "No"}</TableCell>
                    <TableCell>{attempt.letter_level === 1 ? (attempt.one_letter_game_with_miss ? "Yes" : "No") : "N/A"}</TableCell>
                    <TableCell>{attempt.timestamp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
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
          sx= {{ position:"fixed", bottom:"10%", right:"5%" }}
        >
          Sign Out
        </Button>
    </div>
  );
};

export default AdminPage;
