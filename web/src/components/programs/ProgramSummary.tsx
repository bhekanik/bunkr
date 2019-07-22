import React from 'react';
import moment from 'moment';

const ProgramSummary = ({ program }) => {
  return (
    <div className="card z-depth-0 program-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title">{program.name}</span>
        <p>Offered by {program.provider}</p>
        <p className="grey-text">Partners</p>
      </div>
    </div>
  );
};

export default ProgramSummary;
