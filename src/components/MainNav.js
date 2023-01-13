import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import './MainNav.css';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import TvIcon from '@mui/icons-material/Tv';
import {useHistory} from 'react-router-dom';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const history = useHistory();

  React.useEffect(()=>{
    if(value === 0) history.pushState("/");
    else if(value === 1) history.push('/movies');
    else if(value === 2) history.push('/series');
    else if (value === 3) history.push('/search');
  },[value,history]);

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Trending" icon={<WhatshotIcon />} />
        <BottomNavigationAction label="Movies" icon={<MovieIcon />} />
        <BottomNavigationAction label="TV series" icon={<TvIcon />} />
        <BottomNavigationAction label="Search" icon={<SearchIcon />} />
      </BottomNavigation>
    </Box>
  );
}