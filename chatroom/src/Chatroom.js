import React, {useState, useEffect} from "react"
import { useHistory } from "react-router-dom";
import Conversation from "./Conversation";



function Chatroom({user, setLoggedUser, setUser}){
    const history = useHistory()

    const [allUsers, setAllUsers] = useState([])

    const [title, setTitle] = useState()
    const [secondUser, setSecondUser] = useState()

    const [chatrooms, setChatrooms] = useState([])

    const [chatroomId, setChatroomId] = useState()

    const [conversation, setConversation] = useState()

    const [displayConversation, setDisplayConversation] = useState()

    const [displayDeleteButton, setDisplayDeleteButton] = useState(false)


  useEffect(()=>{
    fetch("/users")
    .then(result => result.json())
    .then(result => setAllUsers(result))
  },[])

  useEffect(()=>{
    fetch("/conversations")
    .then(result => result.json())
    .then(result => setChatrooms(result))
  },[])


  



  const displayAllUsers = allUsers.map((user)=>{
    return <p>{user.username}</p>
  })

  const userOptions = allUsers.map((user)=>{
    return <option value={user.id}> {user.username} </option>
  })

  console.log(displayConversation)

 const displayChatrooms = chatrooms.map((chatroom)=>{
   return(
     <div>
        <button onClick={(e)=>{
          fetch(`/conversations/${e.target.value}`)
          .then(result => result.json())
          .then(result => setConversation(result))

          setChatroomId(e.target.value)

          console.log(conversation)

          const convoContent = conversation.messages.map((message)=>{
            return message.content
          })

          setDisplayConversation(convoContent)

          setDisplayDeleteButton(!displayDeleteButton)

        }} 
        value={chatroom.id}> Chatroom Title:{chatroom.title}, a chatroom between {chatroom.user_a.name} {chatroom.user_b.name} 
        </button> 
     </div>
   ) 
 })
 




  function handleSetUserName(e){
    setSecondUser(e.target.value)
  }
  
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
        history.push("/login")
      }
    });
  }

  function handleChatroomTitle(e){
    setTitle(e.target.value)
  }

  function createChatRoom(e){
    e.preventDefault()

    const newConversationObject ={
      title: title,
      user_a_id: user.id,
      user_b_id: secondUser
    }
    
    fetch("/conversations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newConversationObject)
    })

  }

  function handleDeleteConversation(){
    fetch(`conversations/${chatroomId}`, {
            method: "DELETE"
        })
  }




  return (
    <div >
      <header className="App-header">
        <div>
          <p>All Users</p>
          {displayAllUsers}
        </div>
        <div>
          <form onSubmit={createChatRoom}>
            <label>Choose a user to chat with and enter chatroom name:</label>
              <select onChange={handleSetUserName}>
                {userOptions}
              </select>
              <input type="text" value={title} onChange={handleChatroomTitle} />
              <button>Submit</button>
          </form>
        </div>
        <div>
          <p>All Chatrooms</p>
          {displayChatrooms}
        </div>
        <div>
          {displayConversation === undefined ? null : displayConversation}
          {displayDeleteButton === true ? <button onClick={handleDeleteConversation}> Delete Conversation</button> : null }
        </div>
        <Conversation key={chatroomId} user={user} conversation={conversation} chatrooms={chatrooms} chatroomId={chatroomId}/>
        <button onClick={handleLogoutClick}>
          Logout
        </button>
      </header>
    </div>
    
  );

}

export default Chatroom