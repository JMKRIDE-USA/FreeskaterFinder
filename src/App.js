import { useQuery } from 'react-query';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

import { useGetBackendURL, QueryLoader } from '@jeffdude/frontend-helpers';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import Header from './components/mui-header';

import './App.css';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#0277bd',
    },
    secondary: {
      main: '#ff1744',
    },
  },
});
const containerStyle = {
  width: '100vw',
  height: '800px',
  display: 'absolute',
};

const center = {
  lat: 37.945447,
  lng: -39.955620,
};
const MyMapComponent = ({googleMapsApiKey, children}) => (
  <LoadScript googleMapsApiKey={googleMapsApiKey}>
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={3}
      options={{maxZoom: 9}}
    >
      { children }
    </GoogleMap>
  </LoadScript>
)

function App() {
  const backendURL = useGetBackendURL()
  const gMapsKeyQuery = useQuery('gMapsKey',
    () => fetch(backendURL.v1 + "location/googleMapsKey", { method: "GET"}).then(res => res.json()),
  )
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header/>
        <QueryLoader query={gMapsKeyQuery} propName="googleMapsApiKey">
          <MyMapComponent/>
        </QueryLoader>
      </ThemeProvider>
    </div>
  );
}

export default App;
