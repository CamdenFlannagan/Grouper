const group1 = {
    id: 1,
    name: "Group One",
    description: "This is the group's description. Its short but informative, summarizing the mission of the group.",
    tasks: [
        {
            name: "do the thing",
            instructions: "this is how to do the thing",
            status: "complete",
            subtasks: [
                {
                    name: "do the thing subtask",
                    instructions: "do this subtask to complete the thing",
                    status: "complete",
                    subtasks: []
                }
            ]
        },
        {
            name: "do the other thing",
            instructions: "this is how to do the other thing",
            status: "incomplete",
            subtasks: []
        }
    ],
    members: [
        {name: "John"},
        {name: "Patricia"},
        {name: "Carol"},
        {name: "Ronald"}
    ]
};

const group2 = {
    id: 2,
    name: "group two",
    description: "the second group",
    tasks: [
        {
            name: "the thing that needs to be done is this",
            instructions: "complete it please",
            status: "incomplete",
            subtasks: [
                {
                    name: "this is a subtask for the thing that needs to be done",
                    instructions: "do this in order to complete the thing",
                    status: "complete",
                    subtasks: []
                },
                {
                    name: "this is a second subtask for the thing that needs to be done",
                    instructions: "do this as well in order to complete the thing",
                    status: "incomplete",
                    subtasks: []
                }
            ]
        },
        {
            name: "this is a thing that needs to be done",
            instructions: "complete this as well",
            status: "incomplete",
            subtasks: []
        }
    ],
    members: [
        {name: "Brody"},
        {name: "Tatiana"},
        {name: "Omar"}
    ]
};

const prac_groups = new Map();
prac_groups.set(1, group1);
prac_groups.set(2, group2);

export { prac_groups };