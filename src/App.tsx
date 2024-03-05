import { Box, ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header/Header';
import Map from './GraveyardMap/Map';
import Information from './Information/Information';
import NotFound from './NotFound/NotFound';
import Home from './Home/Home';
import DeceasedList from './DeceasedList/DeceasedList';
import { QueryClient, QueryClientProvider } from "react-query";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.200',
      },
    },
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Router>
          <Box height="100vh">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/harta" element={<Map />} />
              <Route path="/informatii" element={<Information />} />
              <Route path="lista_inmormantati" element={<DeceasedList />}></Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
        </Router>
      </ChakraProvider>
    </QueryClientProvider>
  );

}

export default App;
