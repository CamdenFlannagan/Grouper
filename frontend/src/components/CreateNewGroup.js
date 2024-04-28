import React, { useState } from 'react';
import './CreateNewGroup.css'; 
import { Link, useNavigate } from 'react-router-dom';
//import { MdArrowBack } from 'react-icons/md';
import { getFirestore, collection, addDoc, setDoc, doc, updateDoc, arrayUnion, } from "firebase/firestore";
import { app } from '../firebase';
import { useAuth } from '../UserContext';
import { FiChevronLeft } from "react-icons/fi";

function CreateNewGroup() {
    const db = getFirestore(app);
    const navigate = useNavigate(); 

    const [GroupName, setGroupName] = useState('');
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const userId = useAuth();
    const handleSubmit = async () => {
        if (!userId) {
            console.error("User is not logged in.");
            return;
        }

        try {
            const docRef = await addDoc(collection(db, "groups"), {
                GroupName: GroupName,
                description: description,
                isPublic: isPublic,
            });

            await setDoc(doc(db, "groups", docRef.id, "members", userId), {
                role: 'leader',
                points: 0
            });

            const userProfileRef = doc(db, "userProfiles", userId);
            await updateDoc(userProfileRef, {
                groupIds: arrayUnion(docRef.id)  
            });

            setGroupName('');
            setDescription('');
            setIsPublic(false);
            navigate('/dashboard');

        } catch (e) {
            console.error("Error adding document or setting leader: ", e);
        }
    };
    const handleNavigate = () => {
        navigate("/dashboard");
    };
    return (
        <div className="CNG">
            <div className="CNG-screen">

                <div className="CNG-header ">
                    <div className="CNG-page-name-container">
                        <div className="CNG-page-name ">
                            CREATE GROUP
                        </div>
                        <div className="CNG-add-circle">
                            <div className="CNG-circle-plus-container">
                                <FiChevronLeft onClick={handleNavigate} className="CNG-circle-plus" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="CNG-scrollable-bottom">
                    <div className="CNG-input-container">
                        <div className="CNG-smaller">
                            Group Name
                        </div>
                        
                        <input
                            type="text"
                            value={GroupName}
                            placeholder="Group Name"
                            onChange={(e) => setGroupName(e.target.value)}
                            className="CNG-inputBox"
                        />
                    </div>
                    <div className="CNG-input-container"></div>


                    <div className="CNG-description-container">
                        <div className="CNG-smaller">
                            Group Description
                        </div>
                        <input
                            type="text"
                            value={description}
                            placeholder="Description"
                            onChange={(e) => setDescription(e.target.value)}
                            className="CNG-descriptionBox"
                        />
                    </div>
                    <div className="CNG-input-container">
                        <div className="CNG-smaller">
                            Public Status
                        </div>
                        <input
                            type="checkbox"
                            checked={isPublic} 
                            onChange={(e) => setIsPublic(e.target.checked)} 
                            className="CNG-inputBox"
                        />
                    </div>
                    <div className="CNG-input-container"></div>

                    <button className="CNG-submitBtn" onClick={handleSubmit}>Submit</button>
                    <div className="CNG-input-container"></div>
                </div>
            </div>
        </div>
    );
}

export default CreateNewGroup;
