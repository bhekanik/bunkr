const themeReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        isLightTheme: !state.isLightTheme
      };
    default:
      return state;
  }
};

export default themeReducer;
