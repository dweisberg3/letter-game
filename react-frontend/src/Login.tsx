
import React, { useState, ChangeEvent, FormEvent, FormEventHandler } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface LoginFormState {
  username: string;
  password: string;
}

interface LoginProps {
  onLogin: (username:string,password:string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState<LoginFormState>({
    username: '',
    password: '',
  });

    const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onLogin(formData.username, formData.password);
    if (formData.username === 'admin' && formData.password === 'admin') {
      navigate('/admin');
    } else {
      navigate('/letter-game');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = (e: FormEvent) => {
  //   e.preventDefault();
  //   // Handle login logic here (e.g., API call)
  //   console.log('Login submitted', formData);
  // };

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
            value={formData.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
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
        </form>
      </Box>
    </Container>
  );
};

export default Login;

