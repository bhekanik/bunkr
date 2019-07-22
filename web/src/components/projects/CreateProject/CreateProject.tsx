import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createProject } from '../../../store/actions/projectActions';
import { Redirect } from 'react-router-dom';

type NewProject = {
  title: string;
  content: string;
};

interface ICreateProjectProps {
  auth: any;
  createProject(project: NewProject): any;
  history: any;
}

const CreateProject = (props: ICreateProjectProps) => {
  const [project, setProject] = useState({
    title: '',
    content: ''
  });

  const handleChange = e => {
    setProject({
      ...project,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.createProject(project);
    props.history.push('/');
  };

  const { auth } = props;
  if (!auth.uid) return <Redirect to="/signin" data-test="redirect" />;

  return (
    <div className="container" data-test="createProject">
      <form onSubmit={handleSubmit} className="white">
        <h5 className="grey-text text-darken-3">Create New Project</h5>
        <div className="input-field">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="content">Project Content</label>
          <textarea
            id="content"
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
    createProject: project => dispatch(createProject(project))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProject);
