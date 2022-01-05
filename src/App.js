import { useQuery } from 'react-query';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

import './App.css';
import { useGetBackendURL, QueryLoader } from '@jeffdude/frontend-helpers';

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
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
      <QueryLoader query={gMapsKeyQuery} propName="googleMapsApiKey">
        <MyMapComponent/>
      </QueryLoader>
    </div>
  );
}

export default App;
