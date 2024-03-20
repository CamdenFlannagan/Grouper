class Member {
    /**
     * name
     * 
     * a string containing the name of the member
     * 
     *  memberObject = {
     *      name: String
     *  }
     */
    name;

    constructor(memberObject) {
        this.name = memberObject.name;
    }

    get name() {
        return this.name;
    }

    get memberObject() {
        const memberObject = {
            name: this.name
        };
        return memberObject;
    }
}

export { Member };