import React, { createContext, useReducer } from 'react';
import programsReducer from '../reducers/programsReducer';

export const ProgramContext = createContext({});

const ProgramContextProvider = props => {
  const [programs, dispatch] = useReducer(programsReducer, [
    { name: 'Discovery', id: 1 },
    { name: 'ClubCard', id: 1 },
    { name: 'Greenbacks', id: 1 }
  ]);

  return (
    <ProgramContext.Provider value={{ programs, dispatch }}>
      {props.children}
    </ProgramContext.Provider>
  );
};

export default ProgramContextProvider;
