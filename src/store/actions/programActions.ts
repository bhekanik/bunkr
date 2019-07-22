export const createProgram = program => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const creatorId = getState().firebase.auth.uid;

    firestore
      .collection('programs')
      .add({
        ...program,
        name: profile.name,
        provider: profile.provider,
        partners: profile.partners,
        creatorId,
        createdAt: new Date()
      })
      .then(() => {
        dispatch({ type: 'CREATE_PROGRAM', program });
      })
      .catch(err => {
        dispatch({ type: 'CREATE_PROGRAM_ERROR', err });
      });
  };
};
