// import CurrentLocation from './Components/CurrentLocation'
// import Weather from './Components/Weather'
// import background from './assets/background.jpg'
// function App() {

//   return (
//     <>
//     <div 
//     className='bg-slate-800 h-[100vh] flex justify-center items-center'
//     style={{
//       backgroundImage: `url(${background})`,
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//     }}>
//     <CurrentLocation/>  
//     <Weather/>
//     </div>
//     </>
//   )
// }

// export default App




import React, { useState, useEffect } from 'react';
import CurrentLocation from './Components/CurrentLocation';
import Weather from './Components/Weather';
import background from './assets/background.jpg';
import loader from './assets/WeatherIcons.gif';

function App() {
  const [loading, setLoading] = useState(true);
  const handleLocationPermission = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
            position ?
              (
                setTimeout(() => {
                  setLoading(false);
                }, [3000])
              )
              : null
        
      },
      (error) => {
        alert('Please allow location access to use the app');
        console.error('Error getting location:', error);
        setLoading(true);
      }
    );
  };

  useEffect(() => {
    handleLocationPermission();
  }, [loading]);


  // Conditional return based on the loading state
  if (loading) {
    return (
      <div
        className='bg-slate-800 h-[100vh] flex justify-center items-center'
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <img src={loader} style={{ width: '50%', WebkitUserDrag: 'none' }} />
          <h3 style={{ color: 'white', fontSize: '22px', fontWeight: '600' }}>
            Detecting your location
          </h3>
          <h3 style={{ color: 'white', marginTop: '10px' }}>
            Your current location will be displayed on the App <br /> & used
            for calculating Real-time weather.
          </h3>
          <h2>Please Allow Your Locaion</h2>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className='bg-slate-800 h-[100vh] flex justify-center items-center'
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <CurrentLocation />
        <Weather />
      </div>
    );
  }
}

export default App;
