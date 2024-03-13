import { Box, ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header/Header';
import Map from './GraveyardMap/Map';
import Information from './Information/Information';
import NotFound from './NotFound/NotFound';
import Home from './Home/Home';
import DeceasedList from './DeceasedList/DeceasedList';
import { QueryClient, QueryClientProvider } from "react-query";
import LoginPage from './Login/LoginPage';

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
            <Box h={{ base: "94vh", md: "87.8vh" }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/harta" element={<Map />} />
                <Route path="/informatii" element={<Information />} />
                <Route path="lista_inmormantati" element={<DeceasedList />}></Route>
                <Route path="*" element={<NotFound />} />
                <Route path="/login-register" element={<LoginPage onLogin={function (email: string, role: number): void {
                  throw new Error('Function not implemented.');
                }} />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </ChakraProvider>
    </QueryClientProvider>
  );

}

export default App;
