import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import {Button, Card, Feed, Dropdown} from "semantic-ui-react"
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
    return {
      key: `${user.username}`,
      text: `${user.username}`,
      value: `${user.id}`
    }
    
   
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

  console.log(displayConversation, "CONVERSATION HERE")


  // const chats = chatroom.messages.map((message)=>{
  //   return(
  //     <div >
  //         <br></br>
  //         <div >
  //             {message.content} 
  //         </div>
  //         <p className="test" />
  //     </div>
  // ) 
  // })

 const displayChatrooms = chatrooms.map((chatroom)=>{

  let messageContent = chatroom.messages.map((message)=>{
    return message.content
  })

  let messageUser = chatroom.messages.map((message)=>{
    return message.user.name
  })

   return(
     <div className="cardGroup" > 
       <br></br>
       
       <Card fluid >
         <Card.Content>
           <Card.Header>{chatroom.title} </Card.Header>
           <Card.Description>members: {chatroom.user_a.name} {chatroom.user_b.name} </Card.Description>
           <Feed>
             <Feed.Event>
               <Feed.Content>
                 <Feed.Summary>
                   summary of conversation:
                   <br></br>
                   {messageUser[0]}: {messageContent[messageContent.length -2]}
                   <br></br>
                   {messageUser[1]}: {messageContent[messageContent.length -1]}
                 </Feed.Summary>
               </Feed.Content>
             </Feed.Event>
           </Feed>
           <Card.Content extra>
           <Button basic  color = "teal" onClick={handleSetConversation} value={chatroom.id}> 
           Join Chat
           </Button> 
           </Card.Content>
         </Card.Content>
       </Card>
        <br></br>
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



  return (
    <div >
      <header className="homePageStyle">
        <div>
        <Button className="logoutButton" onClick={handleLogoutClick}>
          Logout
        </Button>
          <form onSubmit={createChatRoom}>
            <div>
              <label>Choose a user to chat with:</label>
              <Dropdown onChange={handleSetUserName} 
              placeholder="users"
              fluid
              selection
              options={userOptions}
              />
                 
                
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
        <div >
        
          {displayChatrooms}
        </div>
      </header>
    </div>
    
  );

}

export default Chatroom