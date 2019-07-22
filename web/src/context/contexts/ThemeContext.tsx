import React, { createContext, useReducer } from 'react';
import themeReducer from '../reducers/themeReducer';
export const ThemeContext = createContext({});

const ThemeContextProvider = props => {
  const [state, dispatch] = useReducer(themeReducer, {
    isLightTheme: true,
    light: {
      syntax: '#555',
      ui: '#ddd',
      bg: '#eee'
    },
    dark: {
      syntax: '#ddd',
      ui: '#333',
      bg: '#555'
    }
  });

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
