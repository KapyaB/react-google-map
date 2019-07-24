import React from 'react';
import { render } from 'react-dom';
import './App.css';
import Map from './components/Map';
import InfoWindow from './components/InfoWindow';

const App = () => {
  // create an info window
  const createInfoWindow = (e, map, content) => {
    const infoWindow = new window.google.maps.InfoWindow({
      content:
        "<div id='infoWindow' />" /* the Api only allows stringified html snippets.
       to really control th econtents of the info window we need to do mounting. when the info window finishes loading, the div becomes an accessible DOM element which we can manipulate */,
      position: {
        // values at clicked point
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
    });
    // let us know when the dom is ready
    infoWindow.addListener('domready', e => {
      // render the info window
      render(
        <InfoWindow content={content} />,
        document.getElementById('infoWindow')
      );
    });
    infoWindow.open(map);
  };

  return (
    <div className="App">
      <Map
        id="myMap"
        options={{
          zoom: 8,
          center: {
            lat: -13.1339,
            lng: 27.8493
          }
        }}
        onMapLoad={map => {
          // Add markers
          const addMarker = (e, map, title) => {
            // create a new instance
            const marker = new window.google.maps.Marker({
              /* get coordinates from the click event */
              position: {
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
              },
              map: map,
              title: title
            });
            marker.addListener('click', e => {
              createInfoWindow(e, map, marker.title);
            });
          };
          // the 'onMapLoad' prop, we can create Markers, InfoWindow, Polygons, etc
          /* loop over marker array here */
          /* default marker */
          var marker = new window.google.maps.Marker({
            position: {
              lat: -17.852,
              lng: 25.8285
            },
            map: map,
            title: 'Livingstone'
          });

          marker.addListener('click', e => {
            createInfoWindow(e, map);
          });

          map.addListener('click', e => {
            addMarker(e, map, `${e.latLng.lat()}, ${e.latLng.lng()}`);
          });
        }}
      />
    </div>
  );
};

export default App;
