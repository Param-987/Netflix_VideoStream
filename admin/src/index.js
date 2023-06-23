import React from 'react';
import { createRoot } from "react-dom/client";
import App from './App';
import AuthContextProvider from './context/authContext/AuthContext';
import ListContextProvider from './context/ListContext/ListContext';
import MovieContextProvider from './context/movieContext/MovieContext';
import UserContextProvider from './context/userContext/UserContext';
import SeriesListContextProvider from './context/webSeriesContext/WebContext';

createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <SeriesListContextProvider>
    <AuthContextProvider>
      <MovieContextProvider>
        <ListContextProvider>
          <UserContextProvider>
            <App />
          </UserContextProvider>
        </ListContextProvider>
      </MovieContextProvider>
    </AuthContextProvider>
    </SeriesListContextProvider>
)
 
// ReactDOM.render(
//   <React.StrictMode>
//     <AuthContextProvider>
//       <MovieContextProvider>
//         <ListContextProvider>
//         <App />
//         </ListContextProvider>
//       </MovieContextProvider>
//     </AuthContextProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );
