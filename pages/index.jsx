
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [weather, setWeather] = useState({});
  const [cityName, setCityName] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);

  // useEffect(() => {
  //   axios
  //     .get('http://localhost:5001/get-weather')
  //     .then((res) => {
  //       console.log(res.data);
  //       setWeather(res.data);
  //     })
  //     .catch((err) => {
  //       console.log("Error", err);
  //     });
  // }, []);

   let baseUrl = "https://weather-apps-kbvp.vercel.app"

  const getWeather = (e) => {
    e.preventDefault();
    if (!cityName.trim()) return;
    
    axios
      .get(`${baseUrl}/get-weather/${cityName}`)
      .then((res) => {
        console.log(res.data);
        setWeather(res.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Weather condition icons
  const getWeatherIcon = () => {
    if (!weather.temperature) return "⏳";
    if (weather.temperature > 25) return "☀️";
    if (weather.temperature < 10) return "❄️";
    return "☁️";
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-blue-400 dark:from-gray-800 dark:to-gray-900 transition-all duration-500">
        <div className="w-full max-w-md pt-6">
          

          {/* Main weather card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
            {/* Card header with title */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-700 dark:to-purple-800 p-6">
              <h1 className="text-3xl font-bold text-white text-center">Weather App</h1>
              
              {/* Search form */}
              <form className="mt-4 relative" onSubmit={getWeather}>
                <input
                  type="text"
                  onChange={(e) => { setCityName(e.target.value); }}
                  className="w-full px-4 py-3 pr-10 rounded-full border border-blue-300 dark:border-gray-400 bg-white/90 dark:bg-gray-700/90 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  placeholder="Enter city name"
                  value={cityName}
                />
                <button 
                  type="submit" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-blue-600 dark:text-blue-400"
                  onSubmit={getWeather}
                >
                  🔍
                </button>
              </form>
            </div>

            {/* Weather display */}
            <div className="p-6">
              {/* City name display */}
              {weather && weather.temperature && (
                <div className="text-center text-4xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  <div className="flex items-center justify-center">
                    <span className="mr-2">📍</span>
                    <span>{weather.city || "Current Location"}</span>
                  </div>
                </div>
              )}

              {/* Weather icon */}
              <div className="flex justify-center items-center mb-6">
                <div className="text-center">
                  <div className="text-7xl mb-2">{getWeatherIcon()}</div>
                </div>
              </div>

              {/* Temperature display */}
              <div className="text-center mb-6">
                <h2 className="text-5xl font-bold text-gray-800 dark:text-white mb-1">
                  {weather.temperature ? `${weather.temperature}°C` : "--°C"}
                </h2>
              </div>

              {/* Weather details */}
              <div className="grid grid-cols-2 gap-4 bg-gray-100 dark:bg-gray-700 rounded-xl p-4">
                <div className="flex items-center p-2">
                  <span className="text-xl mr-2">💧</span>
                  <div>
                    <p className="text-lg text-gray-500 dark:text-gray-400">Humidity</p>
                    <p className="text-gray-800 dark:text-gray-200 font-medium">{weather.humidity || "--"}%</p>
                  </div>
                </div>
                
                <div className="flex items-center p-2">
                  <span className="text-xl mr-2">💨</span>
                  <div>
                    <p className="text-lg text-gray-500 dark:text-gray-400">Wind</p>
                    <p className="text-gray-800 dark:text-gray-200 font-medium">{weather.wind || "--"} </p>
                  </div>
                </div>
                
                <div className="flex items-center p-2">
                  <span className="text-xl mr-2">⬇️</span>
                  <div>
                    <p className="text-lg text-gray-500 dark:text-gray-400">Min Temp</p>
                    <p className="text-gray-800 dark:text-gray-200 font-medium">{weather.min || "--"}°C</p>
                  </div>
                </div>
                
                <div className="flex items-center p-2">
                  <span className="text-xl mr-2">⬆️</span>
                  <div>
                    <p className="text-lg text-gray-500 dark:text-gray-400">Max Temp</p>
                    <p className="text-gray-800 dark:text-gray-200 font-medium">{weather.max || "--"}°C</p>
                  </div>
                </div>
                
                <div className="flex items-center p-2 ">
                  <span className="text-xl mr-2">🌡️</span>
                  <div>
                    <p className="text-lg text-gray-500 dark:text-gray-400">Feels Like</p>
                    <p className="text-gray-800 dark:text-gray-200 font-medium">{weather.feelslike || "--"}°C</p>
                  </div>
                </div>

                <div className="flex items-center p-2">
                  <span className="text-xl mr-2">👁️‍🗨️</span>
                  <div>
                    <p className="text-lg text-gray-500 dark:text-gray-400">Visibility</p>
                    <p className="text-gray-800 dark:text-gray-200 font-medium">{weather.visibility || "--"} km</p>
                  </div>
                </div>
                



              </div>
            </div>
          </div>
          
         
        </div>
      </div>
    </div>
    
  );
};

export default Home;

