export const initState = {
  interests: [
    { id: 1, fullname: 'Tony Stark', email: 'tony@starkindustries.com' }
  ]
};

const interestsReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_INTEREST':
      console.log('created interest', action.interest);
      return state;
    case 'CREATE_INTEREST_ERROR':
      console.log('create interest error', action.err);
      return state;
    default:
      return state;
  }
};

export default interestsReducer;
