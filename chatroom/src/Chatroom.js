import React, {useState, useEffect, useRef} from "react"
import { useParams, Route, Link, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Conversation from "./Conversation";
import {createConsumer} from "@rails/actioncable"
import Cable from "actioncable"
import ActionCable from "actioncable"



function Chatroom({user, setLoggedUser, setUser}){

  const navigate = useNavigate()
  const [allUsers, setAllUsers] = useState([])
  const [title, setTitle] = useState()
  const [secondUser, setSecondUser] = useState()
  const [chatrooms, setChatrooms] = useState([])
  const [chatroomId, setChatroomId] = useState()
  const [conversation, setConversation] = useState()
  const [displayConversation, setDisplayConversation] = useState()
  const [displayDeleteButton, setDisplayDeleteButton] = useState(false)
  const [newMessage, setNewMessage] = useState()


   

   
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

   async function handleSetConversation(e){
    const getFetch = await fetch(`/conversations/${e.target.value}`).then(response => response.json())

    let showConversation = getFetch.messages.map((message)=>{
      return message.content
    })

    setDisplayConversation(showConversation)
    setConversation(getFetch)
    setChatroomId(e.target.value)
    setDisplayDeleteButton(!displayDeleteButton)
    navigate(`/conversations/${e.target.value}`)   
  }

 const displayChatrooms = chatrooms.map((chatroom)=>{
   return(
     <div>
        <button onClick={handleSetConversation} value={chatroom.id}> Chatroom Title:{chatroom.title}, a chatroom between {chatroom.user_a.name} {chatroom.user_b.name} 
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
        navigate("/login")
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
          {displayDeleteButton === true ? 
          <div> {displayConversation} 
          <button onClick={handleDeleteConversation}> Delete Conversation </button>       
            <Conversation user={user} conversation={conversation} newMessage={newMessage} setNewMessage={setNewMessage} setConversation={setConversation} displayConversation={displayConversation} chatroomId={chatroomId} />
          </div> 
          : null }
        </div>

        <div>
          <h1>MESSAGES</h1>
          {newMessage}
        </div>
        <button onClick={handleLogoutClick}>
          Logout
        </button>
      </header>
    </div>
    
  );

}

export default Chatroom