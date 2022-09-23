import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import {Button} from "semantic-ui-react"
import './App.css';

function Chatroom({user, setUser}){

  const navigate = useNavigate()
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
       <br></br>
        <Button basic inverted color = "teal" onClick={handleSetConversation} value={chatroom.id}> 
          {chatroom.title}  
        </Button> 
        members: {chatroom.user_a.name} {chatroom.user_b.name} 
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
          <form onSubmit={createChatRoom}>
            <div>
              <label>Choose a user to chat with:</label>
              <select onChange={handleSetUserName}>
                  {userOptions}
                </select>
              <br/>
                Enter Name of Chatroom
              <input type="text" value={title} onChange={handleChatroomTitle} />
              <Button >
                Submit
              </Button>
            </div>
          </form>
        </div>
        <br></br>
        <div>
          <p>All Chatrooms</p>
          {displayChatrooms}
        </div>
     
       
        <Button onClick={handleLogoutClick}>
          Logout
        </Button>
      </header>
    </div>
    
  );

}

export default Chatroom