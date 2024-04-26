import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { collection, getDoc, getDocs, doc, query, where, documentId } from "firebase/firestore";
import './Dashboard.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../UserContext';

function Dashboard() {
    const navigate = useNavigate();
    const [groups, setGroups] = useState([]);
    const userId = useAuth();

    const fetchGroups = useCallback(async () => {
        if (!userId) {
            console.error("User is not logged in");
            return;
        }

        const userProfileRef = doc(db, "userProfiles", userId);
        const userProfileSnap = await getDoc(userProfileRef);

        if (userProfileSnap.exists()) {
            const userGroupsIds = userProfileSnap.data().groupIds;
            if (userGroupsIds.length > 0) {
                const groupsQuery = query(collection(db, "groups"), where(documentId(), "in", userGroupsIds));
                const querySnapshot = await getDocs(groupsQuery);
                const groupsData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                setGroups(groupsData);
            } else {
                setGroups([]);
            }
        } else {
            console.error("User profile not found");
        }
    }, [userId]);

    useEffect(() => {
        let isMounted = true;
        fetchGroups().catch(error => {
            console.error("Failed to fetch groups:", error);
            if (isMounted) {
                setGroups([]);
            }
        });
        return () => {
            isMounted = false; 
        };
    }, [fetchGroups]);

    return (
        <div className="Dashboard">
            <div className="Dashboard-screen">
                <div className="Dashboard-header">
                    <div className="Dashboard-page-name-container">
                        <div className="Dashboard-page-name">DASHBOARD</div>
                        <div className="Dashboard-add-circle">
                            <div className="Dashboard-new-group-icon-container">
                                <Link to="/createnewgroup">
                                    <div className="Dashboard-circle-plus">+</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Dashboard-SB">
                    {groups.map((group) => (
                        <div key={group.id} className="Dashboard-group" onClick={() => {
                            navigate('/groups', { state: { groupId: group.id } });
                        }}>
                            <div className="Dashboard-name">{group.GroupName}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
