import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

interface IProgramDetailsProps {
  program: any;
  auth: any;
}

const ProgramDetails = (props: IProgramDetailsProps) => {
  const { program } = props;
  const { auth } = props;
  if (!auth.uid) return <Redirect to="/signin" />;

  if (program) {
    return (
      <div className="container section program-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{program.name}</span>
            <p>{program.provider}</p>
            <div className="card-action grey lighten-4 grey-text">
              <div>Offered by {program.provider}</div>
              <div>Partners</div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <p>Loading programs ...</p>;
  }
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const programs = state.firestore.data.program;
  const program = programs ? programs[id] : null;
  return {
    program: program,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'programs' }])
  // @ts-ignore
)(ProgramDetails);
