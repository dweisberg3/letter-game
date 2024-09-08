
// App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Login from './Login';
import Board from './components/Board';
import Game from './components/Game';
import AdminPage from './components/Admin';
import ProtectedRoute from './ProtectedRoute';
import './App.css';

function App() {
  const [playerUsername, setPlayerUsername] = useState<string>('');
  const [isCumulative, setIsCumulative] = useState<boolean>(false);
  const [selectedSectionsIndex, setSelectedSectionsIndex] = useState<number>(0);

  const handleIndexSelect = (index: number) => {
    setSelectedSectionsIndex(index);
  };

  const handleIsCumulative = (toggle: boolean) => {
    setIsCumulative(toggle);
  };

  const handleContinue = () => {
    // Navigation logic if needed
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/board"
            element={
              <ProtectedRoute>
                <Board
                  handleIndexSelect={handleIndexSelect}
                  handleIsCumulative={handleIsCumulative}
                  handleContinue={handleContinue}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/game"
            element={
              <ProtectedRoute>
                <Game
                  isCumulative={isCumulative}
                  selectedSectionsIndex={selectedSectionsIndex}
                  playerUsername={playerUsername}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="Admin">
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;