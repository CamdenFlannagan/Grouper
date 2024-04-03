import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Groups.css';

// Groups/dashboard is a big work in progress

function Groups() {
    const navigate = useNavigate();
    const Groups = ({ className, ...props }) => {
    return (
        <div className={"groups " + className}>
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
        </div>
    );
    };
}

export default Groups;