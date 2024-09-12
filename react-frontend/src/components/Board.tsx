import React, { useState } from 'react';
import './Board.css'; // Import the CSS file
// import Section from './Section';
import Switch from '@mui/material/Switch';
import { host_api, sections } from '../utils/Constants';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog, DialogTitle, DialogContent, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper 
} from '@mui/material';
import { useAuth } from '../AuthContext';

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
  playerUsername:string;


}
const Board: React.FC<BoardProps> = ({handleGameParams,playerUsername}) => {
  const [isCumulative, setIsCumulative] = useState<boolean>(false);
  const [selectedSectionIndex,setSelectedSectionIndex] = useState<number>(-1);
  const [scoreboardData,setScoreboardData] = useState<ScoreTally[]>([]);
  const navigate = useNavigate();

  // const currentUser = playerUsername; // Current user's name

  
    const [open, setOpen] = useState(false);
    const { logout } = useAuth();
   

   const handleSignOut = () => {
    logout(); // Clear the authentication state
    navigate('/login'); // Redirect to login page
  };
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
  };

  const handleContinueClick = () => {
    handleGameParams(selectedSectionIndex,isCumulative)
    console.log(isCumulative, '     ', selectedSectionIndex);
    navigate('/game'); // Navigate to the Game route
  };

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCumulative(event.target.checked)
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
         <div className={section.css_id}
         style={selectedSectionIndex === index || (isCumulative && index < selectedSectionIndex) ? {border: '3px solid black' } : {border:'none'}}
         onClick={() => handleSectionClick(index)} 
         key={index}
         
        //  onClick={() => isActive ? handleLetterClick(letter['unicode'], index) : null}
       >
         <img src={section['sectionPngPath']} style={{height:'200px', width:'650px'}} alt="Description of the image" />
       </div>
  
      ))}
       <Button 
               variant="contained" 
               color="success" 
               onClick={handleContinueClick} 
               disabled={selectedSectionIndex < 0}
               sx={{ position:"fixed", justifyContent:"center", alignContent:"center" , top:"50%"}}>
        Continue
      </Button>
        <div style= {{ position:"fixed", bottom:"20px", left:"10px", marginLeft:"50px" }} >
        <Typography variant="body1">Cumulative ?</Typography>
      <Switch
        // checked={isEnabled}
        // sx={{ position:"fixed", justifyContent:"center", alignContent:"center" , top:"40%"}}
        onChange={handleToggle}
        color="primary"
      />
        </div>
         
       <Button 
          variant="contained" 
          color="secondary" 
          onClick={handleSignOut}
          sx={{ position:"fixed", bottom:"10px", right:"10px" }}
        >
          Sign Out
        </Button>
        <Button variant="contained" 
                color="primary" 
                onClick={handleOpenDialog}
                sx={{ position:"fixed", bottom:"10px", right:"100px", marginRight:"50px" }}>
       Scoreboard
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
                    <TableCell style={score.username === playerUsername ? { fontWeight: 'bold' } : {}}>
                    {score.lastname}, {score.firstname}
                    </TableCell>
                    <TableCell align="right" style={score.username === playerUsername ? { fontWeight: 'bold' } : {}}>
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
