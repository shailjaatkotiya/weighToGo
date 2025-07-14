import { useState } from 'react';
import { Container, Tabs, Tab, Box } from '@mui/material';
import GetSomeSpace from './components/GetSomeSpace';
import GiveSomeSpace from './components/GiveSomeSpace';

function App() {
  const [tab, setTab] = useState(0);
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} centered>
        <Tab label="Get Some Space" />
        <Tab label="Give Some Space" />
      </Tabs>
      <Box mt={4}>
        {tab === 0 ? <GetSomeSpace /> : <GiveSomeSpace />}
      </Box>
    </Container>
  );
}

export default App;
