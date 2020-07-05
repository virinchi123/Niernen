let users = [];
let redOps=[];
let blueOps=[];
let redSpy=[];
let blueSpy=[];

const addUser = ({ id, name, room,team,role }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => user.room === room && user.name === name);

    if (!name || !room) return { error: 'Username and room are required.' };
    if (existingUser) return { error: 'Username is taken.' };

    const user = { id, name, room,team,role };

    if(team==='Red'){
        if(role==='Operative'){
            redOps.push(user);
        }
        else{
            redSpy.push(user)
        }
    }
    else {
        if (role === 'Operative') {
            blueOps.push(user);
        }
        else {
            blueSpy.push(user)
        }
    }

    users.push(user);
    //console.log(users)

    return { user };
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    const user= getUser(id)
    if (index !== -1){ 
        let altIndex
        if(user.team==='Red'){
            if(user.role==='Operative'){
                altIndex=redOps.findIndex(user=>user.id===id);
                redOps.splice(altIndex,1)
            }
            else{
                altIndex=redSpy.findIndex(
                    user => user.id===id
                );
                redSpy.splice(altIndex,1)
            }
        }
        else{
            if (user.role === 'Operative') {
                altIndex = blueOps.findIndex(user => user.id === id);
                blueOps.splice(altIndex, 1)
            }
            else {
                altIndex = blueSpy.findIndex(
                    user => user.id === id
                );
                blueSpy.splice(altIndex, 1)
            }
        }
        //console.log('removing'+users[index].name )
        users.splice(index, 1);
        //console.log(users)
        return user
    }
}

const changeNameOfUser=({id,name})=>{
    //console.log(name)
    let user = getUser(id);
    //console.log(users)
    let dummyUser={...user};
    dummyUser.name=name;
    removeUser(id);
    console.log('after removal')
    console.log(users)
    //console.log(dummyUser)
    addUser(dummyUser);
    console.log('after adding')
    console.log(users)
}

const getUser = (id) => users.find((user) => user.id === id);

const switchTeams = id => {
    const user=getUser(id);
    if(user.role==='Operative'){
        if(user.team==='Red'){
            user.team='Blue'
            redOps=redOps.filter(userd=>userd.id!==id)
            blueOps.push(user)
        }
        else{
            user.team = 'Red'
            blueOps=blueOps.filter(userd=>userd.id!==id)
            redOps.push(user)
        }
    }
    else{
        if (user.team === 'Red') {
            user.team = 'Blue'
            redSpy = redSpy.filter(userd => userd.id !== id)
            blueSpy.push(user)
        }
        else {
            user.team = 'Red'
            blueSpy = blueSpy.filter(userd => userd.id !== id)
            redSpy.push(user)
        }
    }
    console.log('blue ops:')
    console.log(blueOps)
    console.log(redOps)
}

const becomeSpymaster=id=>{
    const user = getUser(id)
    if (user.role === 'Operative') {
        user.role = 'Spymaster'
        if (user.team === 'Red') {
            redOps = redOps.filter(userd => userd.id !== id)
            redSpy.push(user)
        }
        else {
            blueOps = blueOps.filter(userd => userd.id !== id)
            blueSpy.push(user)
        }
    }
}

const becomeOperative=id=>{
    const user = getUser(id)
    if (user.role === 'Spymaster') {
        user.role = 'Operative'
        if (user.team === 'Red') {
            redSpy = redSpy.filter(userd => userd.id !== id)
            redOps.push(user)
        }
        else {
            blueSpy = blueSpy.filter(userd => userd.id !== id)
            blueOps.push(user)
        }
    }
}

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom,becomeOperative,becomeSpymaster,switchTeams,changeNameOfUser };