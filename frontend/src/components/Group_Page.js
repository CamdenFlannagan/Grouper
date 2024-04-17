import { useNavigate } from 'react-router-dom';
import { useLocation} from 'react-router-dom';
import { useState } from 'react';

import { prac_groups } from './Practice_Data';

function Group_Page() {
    const { state } = useLocation();
    const groupObject = prac_groups.get(state.groupId);
    return (
        <div>
            <h1>{groupObject.name}</h1>
            <p>{groupObject.description}</p>
            {groupObject.members.map(member => {
                <ul>{member.name}</ul>
            })}
        </div>
    );
}

export default Group_Page;