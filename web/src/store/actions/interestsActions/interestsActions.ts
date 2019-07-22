export const createInterest = interest => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection('interests')
      .add({
        ...interest,
        createdAt: new Date()
      })
      .then(doc => {
        console.log('interest created', doc.data());
        dispatch({ type: 'CREATE_INTEREST', interest });
      })
      .catch(err => {
        dispatch({ type: 'CREATE_INTEREST_ERROR', err });
      });
  };
};
