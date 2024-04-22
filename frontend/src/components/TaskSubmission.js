import React, { useState } from 'react';
import './TaskSubmission.css';
import {useNavigate } from 'react-router-dom';
import { getFirestore, getDoc, doc, updateDoc } from "firebase/firestore";
import { app } from '../firebase';
import { useAuth } from '../UserContext';
import { useLocation } from 'react-router-dom';
import { FiChevronLeft } from "react-icons/fi";

function TaskSubmission() {
    const db = getFirestore(app);
    const navigate = useNavigate();
    const { state } = useLocation();
    const { groupId, taskDetails } = state || {};
    const [submission, setSubmission] = useState('');
    const userId = useAuth();

    const handleSubmit = async () => {
        if (!userId) {
            console.error("User is not logged in.");
            return;
        }

        if (!groupId || !taskDetails.id) {
            console.error("Group ID or Task ID is not provided.");
            return;
        }

        try {
            const assignmentRef = doc(db, "groups", groupId, "tasks", taskDetails.id, "assignments", userId);
            await updateDoc(assignmentRef, {
                submission: submission,
                isComplete: true,
            });

            const memberRef = doc(db, "groups", groupId, "members", userId);

            const memberDoc = await getDoc(memberRef);
            if (memberDoc.exists()) {
                const currentPoints = memberDoc.data().points;
                const newPoints = currentPoints + taskDetails.points;  

                await updateDoc(memberRef, {
                    points: newPoints,
                });
            }

            console.log("Submission updated successfully, and points added.");
            setSubmission('');
            navigate('/groups', { state: { groupId } });
        } catch (e) {
            console.error("Error updating assignment submission and user points: ", e);
        }
    };

    const handleNavigate = () => {
        navigate("/groups", { state: {groupId} });
    };
    return (
        <div className="TaskSubmission">
            <div className="TaskSubmission-screen">

                <div className="TaskSubmission-header ">
                    <div className="TaskSubmission-page-name-container">
                        <div className="TaskSubmission-page-name ">
                            {taskDetails.taskName}
                        </div>
                        <div className="TaskSubmission-add-circle">
                            <div className="TaskSubmission-circle-plus-container">
                                <FiChevronLeft onClick={handleNavigate} className="TaskSubmission-circle-plus" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="TaskSubmission-scrollable-bottom">
                    <div className="Groups-description-container1">
                        <div className="TaskSubmission-description-title">Description</div>
                        <div className="TaskSubmission-description-text">{taskDetails ? taskDetails.description : 'Loading group details...'}</div>
                    </div>
                    <div className="TaskSubmission-smaller">
                        Point Value: {taskDetails.points}
                    </div>
                    <div className="TaskSubmission-input-container"></div>


                    <div className="TaskSubmission-description-container">
                        <div className="TaskSubmission-smaller">
                            Your Submission:
                        </div>
                        <input
                            type="text"
                            value={submission}
                            placeholder="Submission"
                            onChange={(e) => setSubmission(e.target.value)}
                            className="TaskSubmission-descriptionBox"
                        />
                    </div>
                    <div className="TaskSubmission-input-container"></div>


                    <button className="TaskSubmission-submitBtn" onClick={handleSubmit}>Submit</button>
                    <div className="TaskSubmission-input-container"></div>
                </div>
            </div>
        </div>
    );
}

export default TaskSubmission;
