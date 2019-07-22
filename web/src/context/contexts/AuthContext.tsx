import React, { createContext, useReducer } from 'react';
import authReducer from '../../store/reducer/authReducer';

export const AuthContext = createContext({});

const AuthContextProvider = props => {
  const [state, dispatch] = useReducer(authReducer, {
    authError: null
  });

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
