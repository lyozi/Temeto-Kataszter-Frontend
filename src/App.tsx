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
import RegisterPage from './Login/RegisterPage';
import { User } from './types';
import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import LeafletMap from "./GraveyardMap/LeafletMap";

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
  const [loggedUser, setLoggedUser] = useState<User>({ email: "", role: "Member" });

  const onLogin = (user: User) => {
    setLoggedUser(user);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Router>
          <Box height="100vh">
            <Header loggedUserRole={loggedUser?.role} />
            <Box h={{ base: "94vh", md: "87.8vh" }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/harta" element={<Map />} />
                <Route path="/informatii" element={<Information />} />
                <Route path="lista_inmormantati" element={<DeceasedList />}></Route>
                <Route path="*" element={<NotFound />} />
                <Route path="/login" element={<LoginPage onLogin={onLogin} />} />
                <Route path="/register" element={<RegisterPage onLogin={onLogin} />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </ChakraProvider>
    </QueryClientProvider>
  );

}

export default App;
