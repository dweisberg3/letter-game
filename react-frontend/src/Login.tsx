
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';


interface LoginProps {
  handleUserName:(username:string) => void;
}

interface AuthResponse {
  authenticated:boolean;
  admin:boolean;
}

const Login: React.FC<LoginProps> = ({handleUserName}) => {
  const [formValues, setFormValues] = useState({ username: '', password: '' });
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', formValues.username);
    formData.append('password', formValues.password);
    handleUserName(formValues.username)
    try {
      const response = await fetch('https://dweisberg.pythonanywhere.com/login', {
        method: 'POST',
        body: formData,
      });

      const result : AuthResponse = await response.json();
      console.log(result)
      if(response)
      if (result.authenticated){
        if(result.admin){
          login("Admin");
          navigate('/admin');
        }
        else{
          login("me")
          navigate('/board')
        }
      } else {
        setError(true);
      }
    } catch (error) {
      console.error('Error sending data:', error);
      setError(true);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <Container maxWidth="sm">
       <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center"
        sx={{ mt: 8 }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to Letter Game
        </Typography>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            value={formValues.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formValues.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
          {error && (
          <Typography variant="body1" color="error" sx={{ mt: 2 }}>
            Authorization failed. Please check your username and password.
          </Typography>
        )}
        </form>
      </Box>
    </Container>
  );
};

export default Login;