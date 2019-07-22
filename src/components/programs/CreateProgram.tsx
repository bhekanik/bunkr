import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createProgram } from '../../store/actions/programActions';
import { Redirect } from 'react-router-dom';

type NewProgram = {
  name: string;
  provider: string;
  partners: string[];
};

interface ICreateProgramProps {
  auth: any;
  createProgram(program: NewProgram): any;
  history: any;
}

const CreateProgram = (props: ICreateProgramProps) => {
  const [program, setProgram] = useState({
    name: '',
    provider: '',
    partners: []
  });

  const handleChange = e => {
    setProgram({
      ...program,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.createProgram(program);
    props.history.push('/');
  };

  const { auth } = props;
  if (!auth.uid) return <Redirect to="/signin" />;

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="white">
        <h5 className="grey-text text-darken-3">Create New Program</h5>
        <div className="input-field">
          <label htmlFor="name">Program Name</label>
          <input type="text" id="name" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="provider">Program Provider</label>
          <input type="text" id="provider" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="partners" />
          <textarea
            id="partners"
            className="materialize-textarea"
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <button className="btn pink lighten-1 z-depth-0">Create</button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createProgram: program => dispatch(createProgram(program))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProgram);
