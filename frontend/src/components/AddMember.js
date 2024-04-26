import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { collection, query, where, getDocs, doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from '../firebase.js';

function AddMember()  {
    const { state } = useLocation();
    const groupId = JSON.parse(state.groupId);
    const navigate = useNavigate();
    const [ inputedEmail, setInputedEmail ] = useState('');
    const [ statusMessageForUser, setStatusMessageForUser ] = useState('');

    const searchEmails = useCallback(async () => {
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

    });
    
    return (
        <div>
            <h1>Add Member Here!</h1>
            <input placeholder="enter email" onChange={e => {
                setInputedEmail(e.target.value);
            }} />
            <button onClick={() => {
                // 1. find the user id of the user with that email
                searchEmails();

                // 2. add that user id to the 
            }}>Add</button>
            <div>
                {statusMessageForUser}
            </div>    
        </div>
    );
}

export default AddMember;