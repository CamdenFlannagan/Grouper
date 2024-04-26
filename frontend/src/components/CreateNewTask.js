import React, { useState } from 'react';
import './CreateNewTask.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getFirestore, collection, addDoc, setDoc, doc} from "firebase/firestore";
import { app } from '../firebase';
import { useAuth } from '../UserContext';
import { FiChevronLeft } from "react-icons/fi";

function Tasks() {
    const db = getFirestore(app);
    const navigate = useNavigate();
    const location = useLocation();
    const {state} = useLocation();
    console.log("Received state:", location.state);
    const { groupId, memberDetails: initialMemberDetails } = state || {};
    const [memberDetails, setMemberDetails] = useState(initialMemberDetails || []); 
    const [membersInTask, setMembersInTask] = useState([]);
    const [taskType, setTaskType] = useState([]);

    console.log("Member details:", memberDetails);
    console.log("Group details:", membersInTask);
    console.log("Group ID:", groupId);
    console.log("Task Type:", taskType);
    const [TaskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [pointValue, setPointValue] = useState();
    const userId = useAuth();

    const handleSubmit = async () => {
    if (!userId || groupId === undefined) {
        console.error("User is not logged in.");
        return;
    }
    //                                                       |
    //                                                       |
    //                                                      \|/
    //                                                       V
    //                                         HEY!  !taskType.trim() is causing an error!
    //if (!TaskName.trim() || !description.trim() || !taskType.trim() || membersInTask.length === 0) {

    if (!TaskName.trim() || !description.trim() || membersInTask.length === 0) {
        console.error("Please fill in all fields and assign at least one member.");
        return;
    }

    try {
        const taskRef = await addDoc(collection(db, "groups", groupId, "tasks"), {
            TaskName,
            points: pointValue,
            description,
            taskType: taskType, 
            isComplete: false,
        });

        // For each member, create a subdocument under the task
        membersInTask.forEach(async (member) => {
            await setDoc(doc(db, "groups", groupId, "tasks", taskRef.id, "assignments", member.userId), {
                userId: member.userId,
                name: member.name,
                isComplete: false
            });
        });

        setTaskName('');
        setDescription('');
        setPointValue(0);
        setTaskType([])
        setMembersInTask([]);
        navigate('/dashboard'); // Redirect to dashboard

    } catch (e) {
        console.error("Error adding task or assignments: ", e);
    }
};

    const handleNavigate = () => {
        navigate("/groups", { state: { groupId } });
    };

    return (
        <div className="CNT">
            <div className="CNT-screen">

                <div className="CNT-header ">
                    <div className="CNT-page-name-container">
                        <div className="CNT-page-name ">
                            CREATE TASK
                        </div>
                        <div className="CNT-add-circle">
                            <div className="CNT-circle-plus-container">
                                <FiChevronLeft onClick={handleNavigate} className="CNT-circle-plus" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="CNT-scrollable-bottom-1">
                    <div className="CNT-scrollable-bottom-2">
                        <div className="CNT-input-container">
                            <div className="CNT-smaller">
                                Task Name
                            </div>

                            <input
                                type="text"
                                value={TaskName}
                                placeholder="Name"
                                onChange={(e) => setTaskName(e.target.value)}
                                className="CNT-inputBox"
                            />
                        </div>
                        <div className="CNT-input-container"></div>


                        <div className="CNT-description-container">
                            <div className="CNT-smaller">
                                Task Description
                            </div>
                            <input
                                type="text"
                                value={description}
                                placeholder="Description"
                                onChange={(e) => setDescription(e.target.value)}
                                className="CNT-descriptionBox"
                            />
                        </div>
                        <div className="CNT-input-container">
                            <div className="CNT-smaller">
                                Point Value
                            </div>
                            <input
                                type="number" 
                                value={pointValue}
                                placeholder="Points"
                                onChange={(e) => setPointValue(parseInt(e.target.value, 10) || 0)} 
                                className="CNT-inputBox"
                            />
                        </div>
                        <div className="CNT-input-container"></div>

                    </div>
                    <div className="CNT-scrollable-bottom-3">

                        <select
                            onChange={(e) => {
                                const selectedUserId = e.target.value;
                                const selectedMember = memberDetails.find(member => member.userId === selectedUserId);
                                if (selectedMember) {
                                    setMembersInTask(prev => [...prev, selectedMember]);
                                    setMemberDetails(prev => prev.filter(member => member.userId !== selectedUserId));
                                }
                            }}
                            className="CNT-inputBox"
                        >
                            <option value="">Select Assignee</option>
                            {memberDetails.map(member => (
                                <option key={member.userId} value={member.userId}>{member.name}</option>
                            ))}
                        </select>

                        <div>
                            <div className="CNT-description-title">Assigned To:</div>
                            <div className="CNT-description-text">
                                {membersInTask.map(member => (
                                    <li key={member.userId}>{member.name}</li>
                                ))}
                            </div>
                        </div>

                        <button className="CNT-submitBtn" onClick={handleSubmit}>Submit</button>
                        <div className="CNT-input-container"></div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Tasks;
