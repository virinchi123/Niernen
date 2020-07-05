const io = require('socket.io')(8080)
const {addUser,getUser,removeUser,getUsersInRoom,becomeOperative,becomeSpymaster,switchTeams,changeNameOfUser} = require('./users.js')

const room='500';
let status = 1;
let clue=''
const words = ['word1', 'word2', 'word3', 'word4', 'word5', 'word6', 'word7', 'word8', 'word9', 'word10', 'word11', 'word12', 'word13', 'word14', 'word15', 'word16', 'word17', 'word18', 'word19', 'word20', 'word21', 'word22', 'word23', 'word24', 'word25']
let types = ['red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'black', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey', 'blue']
let revealed = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
io.on('connection', socket => {
    console.log('Server is running!')
    socket.emit('words-ready', {words:words,reveal:revealed,types:types})
    console.log(socket.id)

    socket.on('join',data=>{
        console.log(data.user.nickname,'joined')
        socket.join(room)
        let {user,error}=addUser({
            id:socket.id,
            room:room,
            name:data.user.nickname,
            team:data.user.team,
            role:data.user.role
        })
        if(error){
            return console.log(error)
        }
        //console.log(getUsersInRoom('500'))
        let players=getUsersInRoom(room)
        socket.emit('currentPlayers',players)
        socket.emit('currentStatus',status)
        socket.emit('reveal',revealed)
        socket.emit('typeSet',types)
        //console.log('adding user')
        socket.broadcast.to(room).emit('addUser',user)
    })

    socket.on('nameChanged',name=>{
        console.log('changing name on server')
        let user = getUser(socket.id)
        let oldName = user.name
        changeNameOfUser({id:socket.id,name:name})
        user = getUser(socket.id)
        if(user){
            socket.broadcast.to(room).emit('changeName', {oldName,user})
        }
    })

    socket.on('setClue',data=>{
        data=clue;
        socket.broadcast.to(room).emit('giveClue',clue)
    })

    socket.on('becomeSpymaster',user=>{
        becomeSpymaster(socket.id)
        socket.broadcast.to(room).emit('isSpymaster',user)
    })

    socket.on('becomeOperative',user=>{
        becomeOperative(socket.id)
        socket.broadcast.to(room).emit('isOperative',user)
    })

    socket.on('switchTeams',user=>{
        switchTeams(socket.id)
        console.log(getUsersInRoom(room))
        socket.broadcast.to(room).emit('teamSwitched',user)
    })

    socket.on('progress',_=>{
        if (status === 1) {
            status=3
        }
        else if (status === 2) {
            status = 4
        }
        else if (status === 3) {
            status = 2
        }
        else if (status === 4) {
            status = 3
        }
        socket.broadcast.to(room).emit('updateProgress',status)
    })

    socket.on('addLog',array=>{
        socket.broadcast.to(room).emit('logMessage',array)
    })

    socket.on("disconnect",(data)=>{
        let user = removeUser(socket.id);
        console.log(user)
        if(user){
            console.log('broadcasting')
            socket.broadcast.to(room).emit('removeUser', user)
        }

        console.log('user-left'+data);
        //console.dir(data)
    })
})