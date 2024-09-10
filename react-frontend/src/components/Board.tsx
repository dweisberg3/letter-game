import React, { useState } from 'react';
import Section from './Section';
import Switch from '@mui/material/Switch';
import { host_api, sections } from '../utils/Constants';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog, DialogTitle, DialogContent, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper 
} from '@mui/material';

interface ScoreTally {
  username:string;
  firstname:string;
  lastname:string;
  total_points:number;
}
interface BoardProps {
  // handleIndexSelect:(index:number) => void;
  // handleIsCumulative:(isCumulative:boolean) => void;
  handleGameParams: (index:number,isCumulative:boolean) => void;


}
const Board: React.FC<BoardProps> = ({handleGameParams}) => {
  const [isCumulative, setIsCumulative] = useState<boolean>(false);
  const [selectedSectionIndex,setSelectedSectionIndex] = useState<number>(-1);
  const [scoreboardData,setScoreboardData] = useState<ScoreTally[]>([]);
  const navigate = useNavigate();

  const currentUser = 'CurrentUser'; // Current user's name

  
    const [open, setOpen] = useState(false);

    const handleOpenDialog = () => {
      
      getScoreboardData();
      console.log(scoreboardData)
      setOpen(true);
    };

    const handleCloseDialog = () => {
      setOpen(false);
    };

  const handleSectionClick = (index: number) => {
    setSelectedSectionIndex(index)
    // handleIndexSelect(index)
  };

  const handleContinueClick = () => {
    handleGameParams(selectedSectionIndex,isCumulative)
    console.log(isCumulative, '     ', selectedSectionIndex);
    navigate('/game'); // Navigate to the Game route
  };

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCumulative(event.target.checked)
    // handleIsCumulative(event.target.checked)
  };

  const getScoreboardData  = async () => {
    
      try {
        const response = await fetch(`${host_api}/scoreboard`); // Replace with your API endpoint
        const data = await response.json();
        const scoreboardData : ScoreTally[] = data.map((el:ScoreTally) => ({username:el.username,firstname:el.firstname,lastname:el.lastname,total_points:el.total_points}))
        setScoreboardData(scoreboardData)
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    

  }

  return (
    <div className="board">
      {sections.map((section, index) => (
        <Section 
          key={index} 
          letters={section.letters.map((el) => el['pngfilePath'])} 
          color={section.color} 
          onClick={() => handleSectionClick(index)} 
          selected={selectedSectionIndex === index || (isCumulative && index < selectedSectionIndex)} 
          
        />
      ))}
       <button onClick={handleContinueClick} disabled={selectedSectionIndex < 0}>
        Continue
      </button>

          <Typography variant="body1">Cumulative</Typography>
      <Switch
        // checked={isEnabled}
        onChange={handleToggle}
        color="primary"
      />
        <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Open Scoreboard
      </Button>
       {/* Dialog containing the scoreboard */}
       <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Scoreboard</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Points</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {scoreboardData.map((score, index) => (
                  <TableRow key={index}>
                    <TableCell style={score.username === currentUser ? { fontWeight: 'bold' } : {}}>
                      {score.firstname}
                    </TableCell>
                    <TableCell align="right" style={score.username === currentUser ? { fontWeight: 'bold' } : {}}>
                      {score.total_points}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </div>
    
  );
};

export default Board;
