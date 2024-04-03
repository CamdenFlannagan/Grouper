import { Group } from './Group.js';
import { Task } from './Task.js';

/**
 * Member 
 * 
 *  memberObject = {
 *      userEmail: string,
 *      points: int,
 *      groupName: string,
 *      groupDescription: string,
 *      groupId: int
 *  }
 */
class Member {   

    
    userEmail;
    points;
    groupName;
    groupDescription;
    groupId;

    /**
     * @param {{
     *      userEmail: string,
     *      points: int,
     *      groupName: string,
     *      groupDescription: string,
     *      groupId: int
     * }} memberObject 
     */
    constructor(memberObject) {
        this.userEmail = memberObject.userEmail;
        this.points = memberObject.points;
        this.groupName = memberObject.groupName;
        this.groupDescription = memberObject.groupDescription;
        this.groupId = memberObject.groupId;
    }

    get memberObject() {
        const memberObject = {
            userEmail: this.userEmail,
            points: this.points,
            groupName: this.groupName,
            groupDescription: this.groupDescription,
            groupId: this.groupId
        };
        return memberObject;
    }
}

export { Member };