// import { useState } from 'react';
// import './App.css';

// const App = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSubmit = (e:any) => {
//         e.preventDefault();
//         fetch('http://127.0.0.1:5000/login')
//         .then(response => response.json())
//         .then(data => setData(data));
//         // Here you would usually handle the login logic, such as making an API call
//         console.log('Username:', username);
//         console.log('Password:', password);
//     };

//     return (
//         <div className="login-container">
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Username</label>
//                     <input 
//                         type="text" 
//                         value={username} 
//                         onChange={(e) => setUsername(e.target.value)} 
//                         required 
//                     />
//                 </div>
//                 <div>
//                     <label>Password</label>
//                     <input 
//                         type="password" 
//                         value={password} 
//                         onChange={(e) => setPassword(e.target.value)} 
//                         required 
//                     />
//                 </div>
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };

// // export default App;



// // import React, { useState } from 'react';
// // import './Login.css';

// // const Login = () => {
// //     const [username, setUsername] = useState('');
// //     const [password, setPassword] = useState('');
// //     const [error, setError] = useState('');
// //     const [isLoading, setIsLoading] = useState(false);

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         setIsLoading(true);
// //         setError('');

// //         try {
// //             const response = await fetch('http://your-backend-url/login', {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json'
// //                 },
// //                 body: JSON.stringify({ username, password })
// //             });

// //             const data = await response.json();

// //             if (response.ok) {
// //                 // Handle successful login
// //                 console.log('Login successful:', data);
// //                 // Redirect to another page or update the UI accordingly
// //             } else {
// //                 // Handle errors from the server
// //                 setError(data.message || 'Something went wrong. Please try again.');
// //             }
// //         } catch (error) {
// //             // Handle network errors
// //             setError('Network error. Please try again.');
// //         } finally {
// //             setIsLoading(false);
// //         }
// //     };

// //     return (
// //         <div className="login-container">
// //             <h2>Login</h2>
// //             <form onSubmit={handleSubmit}>
// //                 <div>
// //                     <label>Username</label>
// //                     <input 
// //                         type="text" 
// //                         value={username} 
// //                         onChange={(e) => setUsername(e.target.value)} 
// //                         required 
// //                     />
// //                 </div>
// //                 <div>
// //                     <label>Password</label>
// //                     <input 
// //                         type="password" 
// //                         value={password} 
// //                         onChange={(e) => setPassword(e.target.value)} 
// //                         required 
// //                     />
// //                 </div>
// //                 <button type="submit" disabled={isLoading}>
// //                     {isLoading ? 'Logging in...' : 'Login'}
// //                 </button>
// //                 {error && <p className="error">{error}</p>}
// //             </form>
// //         </div>
// //     );
// // };

// // export default Login;


import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import LetterGame from './LetterGame';
import Admin from './Admin';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (username:string, password:string) => {
    if (username === 'admin' && password === 'admin') {
      setIsAdmin(true);
      setIsAuthenticated(true);
    } else if (username !== '' && password !== '') {
      setIsAdmin(false);
      setIsAuthenticated(true);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/letter-game"
          element={isAuthenticated ? <LetterGame /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin"
          element={isAuthenticated && isAdmin ? <Admin /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={<Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
