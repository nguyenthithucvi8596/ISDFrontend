import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "mobx-react";
import reportWebVitals from './reportWebVitals';
import { LayoutProvider } from './components/Core/context/LayoutContext';
import { UserProvider } from './components/Core/context/UserContext';
import { ThemeProvider as ThemeProviderV5 } from '@mui/material/styles';
// import { ManagementProvider } from './components/Core/context/ManagementContext';
import { StyledEngineProvider } from '@mui/material/styles';
import {
       ThemeProvider as ThemeChangeProvider,
       ThemeStateContext,
} from './components/Core/context/ThemeContext';
import CssBaseline from '@mui/material/CssBaseline';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

       <LayoutProvider>
              <UserProvider>
              <StyledEngineProvider injectFirst>
                     <ThemeChangeProvider>
                            <ThemeStateContext.Consumer>
                                   {(theme) => (
                                          <ThemeProviderV5 theme={theme}>
                                               
                                                        <CssBaseline />
                                                        <App />
                                                 
                                          </ThemeProviderV5>
                                   )}
                            </ThemeStateContext.Consumer>
                     </ThemeChangeProvider>
              </StyledEngineProvider>
              </UserProvider>
           

       </LayoutProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
