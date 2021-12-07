import { GoogleMap, LoadScript } from '@react-google-maps/api';

import './App.css';

const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: '100vw',
  height: '800px',
  display: 'absolute',
};

const center = {
  lat: 37.945447,
  lng: -39.955620,
};
const MyMapComponent = ({children}) => (
  <LoadScript googleMapsApiKey={googleMapsApiKey}>
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={4}
      options={{maxZoom: 9}}
    >
      { children }
    </GoogleMap>
  </LoadScript>
)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
      <div className="page">
        <MyMapComponent/>
      </div>
    </div>
  );
}

export default App;
