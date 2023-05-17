import React from 'react';
import { createRoot } from "react-dom/client";
import App from './App';
import AuthContextProvider from './context/authContext/AuthContext';
import ListContextProvider from './context/ListContext/ListContext';
import MovieContextProvider from './context/movieContext/MovieContext';

createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <AuthContextProvider>
      <MovieContextProvider>
        <ListContextProvider>
        <App />
        </ListContextProvider>
      </MovieContextProvider>
    </AuthContextProvider>
  // </React.StrictMode>,
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
