import React, { useState } from 'react';
import './CreateNewGroup.css'; 
import { Link } from 'react-router-dom';
//import { MdArrowBack } from 'react-icons/md';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from '../firebase';

function CreateNewGroup() {
    const db = getFirestore(app);

    const [GroupName, setGroupName] = useState('');
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(false);

    const handleSubmit = async () => {
        try {
            const docRef = await addDoc(collection(db, "groups"), {
                GroupName: GroupName,
                description: description,
                isPublic: isPublic,

            });
            console.log("Document written with ID: ", docRef.id);
            setGroupName('');
            setDescription('');
            setIsPublic(false);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
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
                                <Link to="/dashboard">
                                    <div className="CNG-circle-plus">
                                    
                                    </div>
                                </Link>
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
