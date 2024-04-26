import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { collection, query, where, getDocs, doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from '../firebase.js';

function AddMember()  {
    const { state } = useLocation();
    const groupId = state.groupId;
    const navigate = useNavigate();
    const [ inputedEmail, setInputedEmail ] = useState('');
    const [ statusMessageForUser, setStatusMessageForUser ] = useState('');

    const handleSubmit = async () => {
        // 1. Find the id of the user which has the inputed email
        let userIdTemp;
        const q = query(collection(db, "userProfiles"), where("email", "==", inputedEmail.toLowerCase()));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            userIdTemp = doc.id;
        });

        const userId = userIdTemp;
        if (userId === undefined) {
            console.log("Email not in database");
            setStatusMessageForUser('Email not found in database.');
            return;
        } else {
            console.log(userId);
            setStatusMessageForUser('User succesfully retrieved!');
        }

        // 2. add the user id to the list of user ids in the group
        const newMemberData = {
            points: 0,
            role: 'member'
        };
        await setDoc(doc(db, 'groups', groupId, 'members', userId), newMemberData);

        // 3. add the group id to the list of group ids in the user profile
        const userProfileRef = doc(db, "userProfiles", userId);
        await updateDoc(userProfileRef, {
             groupIds: arrayUnion(groupId)  
        });

        // 4. navigate back to the group page
        navigate('/groups', {state:{groupId:groupId}});

    };
    
    return (
        <div className="AM">
            <h1 className="AM-Page-Name">Add Member Here!</h1>
            <div className="AM-Page-Element">
                <input className="AM-Input" placeholder="enter email" onChange={e => {
                    setInputedEmail(e.target.value);
                }} />
            </div>
            <div className="AM-Page-Element">
                <button className="AM-Button" onClick={() => {
                    handleSubmit();
                }}>Add</button>
            </div>
            <div className="AM-Page-Element">
                <button className="AM-Button" onClick={() => {
                    navigate('/groups', {state:{groupId:groupId}});
                }}>Cancel</button>
            </div>
            <div className="AM-Page-Element">
                <div className="AM-Status-Message">
                    {statusMessageForUser}
                </div>
            </div>    
        </div>
    );
}

export default AddMember;