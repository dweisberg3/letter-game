

import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import { User } from './domain/User';
// import LetterGame from './LetterGame';
// import Admin from './Admin';
// import Board from './components/Board';
import Board from './components/Board';
import Game from './components/Game';
import { NavigationContext } from './NavigationContext';
import './App.css';
import AdminPage from './components/Admin';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [playerUsername,setPlayerUsername] = useState<string>('');
  const navigation = useContext(NavigationContext);

  const handleLogin = async (username:string, password:string) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    let authenticationStatus = ''
    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      authenticationStatus = result.message
      if (authenticationStatus=== "Admin") {
        setIsAdmin(true);
        setIsAuthenticated(true);
        console.log("weee in!")
      } else if (authenticationStatus === "Regular") {
        setIsAdmin(false);
        setPlayerUsername(username)
        setIsAuthenticated(true);
      }
      else{
        console.log("nope!!")
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
   return authenticationStatus
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin}  />} />
        <Route
          path="/letter-game"
          element={isAuthenticated && !isAdmin ? (!navigation?.gameOn ? <Board /> : <Game isCumulative={navigation!.isCumulative} selectedSectionsIndex={navigation!.selectedSectionIndex} playerUsername={playerUsername} /> ): <Navigate to="/login" />}
        />
        <Route
          path="/admin"
          element={isAuthenticated && isAdmin ? <AdminPage /> : <Navigate to="/login" />}
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


// import Board from './components/Board';
// import Game from './components/Game';
// import { NavigationContext } from './NavigationContext';
// import './App.css';

// const App: React.FC = () => {
//   const navigation = useContext(NavigationContext);

//   // return (
//   //   <div className="App">
//   //     {!navigation?.gameOn ? <Board /> : <Game sectionIndex={navigation!.selectedSections} />}
//   //   </div>
//   // );
//   return (
//     <div><AdminPage></AdminPage></div>
//   )
// }

// export default App;

