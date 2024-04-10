import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Groups.css';

// Groups/dashboard is a big work in progress
export const Groups = ({ className, ...props }) => {
    return (
      <div className={"groups " + className}>
        <div className="rectangle-3"></div>
        <div className="upcoming-tasks">UPCOMING TASKS </div>
        <div className="task-1-group-due-date">
          <span>
            <span className="task-1-group-due-date-span">
              Task #1
              <br />
            </span>
            <span className="task-1-group-due-date-span2">Group, Due Date</span>
          </span>{" "}
        </div>
        <div className="rectangle-1"></div>
        <div className="rectangle-2"></div>
        <div className="groups2">GROUPS </div>
        <div className="art-101">Art 101 </div>
        <div className="comm-101">Comm 101 </div>
      </div>
    );
};
  