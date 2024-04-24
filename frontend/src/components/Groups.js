import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getFirestore, collection, query, where, getDocs, doc, getDoc} from "firebase/firestore";
import './Groups.css';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { useAuth } from '../UserContext';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft } from "react-icons/fi";
import Sidebar from './Sidebar';

function Groups() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const groupId = state.groupId;
  const [groupDetails, setGroupDetails] = useState(null); 
  const userId = useAuth(); 
  const [tasks, setTasks] = useState([]);
  const isMounted = useRef(false);

  const fetchGroupDetails = useCallback(async () => {
    if (!groupId) {
      console.log("No groupId provided");
      navigate('/dashboard');
      return;
    }

    const groupRef = doc(db, "groups", groupId);
    const groupSnap = await getDoc(groupRef);

    if (groupSnap.exists()) {
      setGroupDetails(groupSnap.data());
    } else {
      console.log("No such group!");
      setGroupDetails(null);
      navigate('/dashboard');
    }
  }, [groupId, navigate]);

  useEffect(() => {
    let isMounted = true;
    fetchGroupDetails().catch(error => {
      console.error("Failed to fetch group details:", error);
      if (isMounted) {
        navigate('/dashboard');
      }
    });
    return () => {
      isMounted = false;
    };
  }, [fetchGroupDetails, navigate]);


  const [memberDetails, setMemberDetails] = useState([]);
  
  const fetchMembers = useCallback(async () => {
    if (!groupId) {
      console.error("Group ID is not provided");
      return;
    }

    const membersRef = collection(db, "groups", groupId, "members");
    const membersSnap = await getDocs(membersRef);

    if (membersSnap.empty) {
      console.error("No members found");
      setMemberDetails([]);
      return;
    }

    const profiles = await Promise.all(membersSnap.docs.map(async (docSnapshot) => {
      const userId = docSnapshot.id;
      const role = docSnapshot.data().role;
      const userRef = doc(db, "userProfiles", userId);
      const userProfileSnap = await getDoc(userRef);

      if (userProfileSnap.exists()) {
        return { userId, name: userProfileSnap.data().name, role };
      } else {
        console.log(`No profile found for user ID: ${userId}`);
        return { userId, name: "No name found", role };
      }
    }));

    setMemberDetails(profiles);
  }, [groupId]);
  
  useEffect(() => {
    let isMounted = true;
    fetchMembers().catch(console.error).then(() => {
      if (!isMounted) {
        console.log("Component unmounted before fetch completed");
      }
    });
    return () => {
      isMounted = false;
    };
  }, [fetchMembers]);

  const handleNavigate = () => {
    navigate("/groups/createnewtask", { state: { groupId, memberDetails } });
  };

  const fetchTasksForUser = useCallback(async () => {
    if (!userId || !groupId) {
      console.log("Missing userId or groupId, aborting fetch.");
      return;
    }

    const tasksRef = collection(db, "groups", groupId, "tasks");
    const tasksSnap = await getDocs(tasksRef);
    const tasksAssignedToUser = [];

    for (const taskDoc of tasksSnap.docs) {
      const taskData = taskDoc.data();
      const taskName = taskData.TaskName;
      const taskId = taskDoc.id;

      const assignmentDocRef = doc(db, "groups", groupId, "tasks", taskId, "assignments", userId);
      const assignmentDoc = await getDoc(assignmentDocRef);

      if (assignmentDoc.exists() && !assignmentDoc.data().isComplete) {
        tasksAssignedToUser.push({
          id: taskId,
          taskName: taskName,
          ...taskData
        });
      }
    }

    if (isMounted.current) {
      setTasks(tasksAssignedToUser);
    }
  }, [db, groupId, userId]);

  useEffect(() => {
    isMounted.current = true;
    fetchTasksForUser().catch(console.error);
    return () => {
      isMounted.current = false;
    };
  }, [fetchTasksForUser]);


  console.log("Tasks: ", tasks);
  return (
    <div className="Groups">
      <div className="Groups-screen">
      {memberDetails.find(member => member.userId === userId && member.role === 'leader') && (
  <button onClick={() => navigate(`/groups/${groupId}/settings`)}>Group Settings</button>
)}
        <Link to="/dashboard">
          <FiChevronLeft className="Groups-circle-plus" />
        </Link>
        <div className="Groups-header">
          <div className="Groups-page-name-container">
            <div className="Groups-page-name">{groupDetails ? groupDetails.GroupName : 'Loading group details...'}</div>
          </div>
        </div>
        <div className="Groups-bottom-view">
          <div className="Groups-bottom-left">
            <div className="Groups-add-member-button">
              <Link>Add Members</Link> {}
            </div>

            <div className="Groups-members-container">
              <div className="Groups-members-title">Members</div>
              <div className="Groups-members-sub-container">
                {memberDetails.map((member) => (
                  <div key={member.id} className="Groups-members-text">
                    {member.name}
                  </div>
                  ))}
              </div>

            </div>
          </div>
          <div className="Groups-bottom-right">

            <div className="Groups-description-container">
              <div className="Groups-description-title">Description</div>
              <div className="Groups-description-text">{groupDetails ? groupDetails.description : 'Loading group details...'}</div>
            </div>
            <div className= "Groups-tasks-container">
              <div className="Groups-tasks-title">Your Tasks:</div>
              <div className="Groups-tasks-sub-container">
                  {tasks.map((task) => (
                    <div key={task.id} className="Groups-task" onClick={() => {
                      navigate('/groups/tasksubmission', { state: { groupId, taskDetails: task} });
                    }}>
                      {task.taskName}
                    </div>
                  ))}

                {memberDetails.find(member => member.userId === userId && member.role === 'leader') && (
                  <div className="Groups-task">
                    <div onClick={handleNavigate} className="Groups-plus-sign">
                      +
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  );
}

export default Groups;