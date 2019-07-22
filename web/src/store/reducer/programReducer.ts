const initState = {
  projects: [
    {
      id: 1,
      name: 'ClubCard',
      provider: 'Clicks',
      partners: ['Shell', 'Musica', 'Sanlam']
    },
    {
      id: 2,
      name: 'Greenbacks',
      provider: 'Nedbank',
      partners: ['Shell', 'Musica']
    },
    {
      id: 3,
      name: 'Smart Shopper',
      provider: 'Pick n Pay',
      partners: ['BP']
    }
  ]
};

const programReducer = (state = initState, action) => {
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

export default programReducer;
