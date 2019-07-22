const programsReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_PROGRAM':
      console.log('created program', action.program);
      return state;
    case 'CREATE_PROGRAM_ERROR':
      console.log('create program error', action.err);
      return state;
    default:
      return state;
  }
};

export default programsReducer;
