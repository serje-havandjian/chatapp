import { useState, useEffect, useReducer } from "react"
import { useParams, useNavigate } from "react-router-dom"
// import {createConsumer} from "@rails/actioncable"
import Cable from "actioncable"
import Message from "./Messages"
import './App.css';
import {Button, Icon, Form} from "semantic-ui-react"


function reducer(state, action) {
  switch(action.type) {
    case 'fetchSuccess': {
      return { ...state, chatroom: action.payload, errors: []}
    }
    case 'fetchFailure': {
      return { ...state, errors: action.payload }
    }
    case 'messageNew': {
      const updatedChatroom = { ...state.chatroom }
      updatedChatroom.messages = [ ...state.chatroom.messages, action.payload ]
      return { ...state, chatroom: updatedChatroom }
    }
    case 'chatConnection': {
      return { ...state, chatConnection: action.payload}
    }
    default: {
      return state
    }
  }
}

function ConversationRooms({user}){

  const navigate = useNavigate()

  const [message, setMessage] = useState([])
  
  const params = useParams()

  const [state, dispatch] = useReducer(reducer, {
    chatroom: {},
    errors: [],
    chatConnection: {}
  })
  
  const { chatroom, chatConnection } = state

  useEffect(()=>{
    function createSocket(){
      if(chatConnection.consumer){
        chatConnection.unsubscribe()
      }

      const consumer = Cable.createConsumer(`https://chat-app-project-2.herokuapp.com/cable`)
     
      console.log(consumer, "CONSUMER HERE")
      
      const subscription = consumer.subscriptions.create(
        {
          channel: "ConversationChannel",
          room: chatroom.title
        },
        {
          received: (message) => {
            dispatch({type: "messageNew", payload: message})
          }
        }
      )
      dispatch({ type: "chatConnection", payload: subscription})
      console.log(chatConnection, "CHAT CONNECTION HERE")
      console.log(chatConnection.consumer, "CONSUMER HERE HERE")
      console.log(subscription, "SUBCSCRIPTION HERE")
    }

    
    
    if (chatroom.title){
      createSocket()
    }
  }, [chatroom.title, chatroom.id])

  useEffect(()=>{
      fetch(`https://chat-app-project-2.herokuapp.com/conversations/${params.id}`)
      .then(r => {
        if(r.ok){
          r.json().then(data =>{
            dispatch({type: "fetchSuccess", payload: data})
          })
        }
      }) ////
      // .then(result => result.json())
      // .then(result => {
      //   dispatch({ type: "fetchSuccess", payload: result})
      //   const convoMessage = result.messages.map((message)=>{
      //     return <p>{message.content}</p>
      //   })
      //   setDisplayChatsInConversation(convoMessage)
      // })

  }, [params.id])


  function handleMessageNew(message) {
    chatConnection.send({ message: { content: message, conversation_id: chatroom.id } })
  }

  function handleNewMessageContent(e){
    setMessage(e.target.value)
  }
  
  function createMessage(e){
    e.preventDefault()
    handleMessageNew(message)
    setMessage(() => "")
    // const newMessageObject ={
    //         content: newMessage,
    //         user_id: user.id,
    //         conversation_id: params.id
    //         };
        
    // fetch("/messages", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     content: newMessage,
    //     conversation_id: params.id,
    //     user_id: user.id
    //   })
    // }).then(r =>{
    //     if(r.ok){
    //       r.json().then(message =>{
    //         handleMessageNew(message)
    //         setMessage(() => "")
    //       })
    //     }
    //   })
  };

  function handleDeleteConversation(){
    fetch(`https://chat-app-project-2.herokuapp.com/conversations/${params.id}`, {
      method: "DELETE"
    })
    navigate(`/`)
  }

  function handleGoBack(){
    navigate(`/`)
  }

  
  return(
    <div >
      <div className="message-container">
        {chatroom.title ? (<Message chatroom = {chatroom} user={user} /> ) : null }
      </div>
      <div className="messageSubmit">
        <br></br>
      <Form size="mini" onSubmit={createMessage}>
        <Form.Group>
            <Form.Input value={message} type="text" id="message-input" onChange={handleNewMessageContent} />
              <Button size="mini" icon>
                <Icon name="angle right">
                </Icon> 
              </Button>
        </Form.Group>
        </Form>
      </div>
      <Button color="facebook" className="goBackButton" size="small" onClick={handleGoBack}>
          Back To Chatrooms
      </Button>
      <Button color="youtube" className="deleteButton" size="small" onClick={handleDeleteConversation}>
        Delete Conversation
      </Button>
    </div>
  )
}

export default ConversationRooms

// function Conversation({conversation, user, newMessage, setNewMessage, setConversation, chatroomId}){

//   const [displayChatsInConversation, setDisplayChatsInConversation ] = useState([])
  
//   const params = useParams()

  
//   useEffect(()=>{
//     console.log("inside useEffect")
//     const fetchData = async () =>{
//       console.log("inside conversation useEffect fetch Data Function")
//       const data = await fetch(`/conversations/${params.id}`)
//       .then(result =>result.json())
//       .then((result) => setDisplayChatsInConversation(result))
//       .then((result) => {
//         console.log("in fetchData block", displayChatsInConversation)
//       })
//     }

//     fetchData()

//     console.log(displayChatsInConversation)
//   },[])

//   console.log(displayChatsInConversation)

//   // const showConversation = displayChatsInConversation.messages.map((message)=>{
//   //   return message.content
//   // })
  
 


//   //  // STUPID ACTION CABLE STUFF
//   // useEffect(()=>{
//   //   const cable = createConsumer("ws://localhost:3000/cable")
              
//   //   console.log("logging params here", params)

//   //   const paramsToSend={
//   //     channel: "ConversationChannel",
//   //     id: params.id
//   //   }

//   //   console.log(paramsToSend)

//   //   const handlers = {
//   //     received(data){
//   //       setNewMessage([...newMessage, data])
//   //     },

//   //     connected(){
//   //       console.log("connected")
//   //     },

//   //     disconnected(){
//   //       console.log("disconnected")
//   //     }
//   //   }
//   //   const subscription = cable.subscriptions.create(paramsToSend, handlers)

//   //   return function cleanup(){
//   //     console.log("unsubbing from", params.id)
//   //     subscription.unsubscribe()
//   //   }
//   // }, [params.id, newMessage])
    



//     function handleNewMessage(e){
//         setNewMessage(e.target.value)
//     }

//     function createMessage(e){
//         e.preventDefault()
//         const newMessageObject ={
//                     content: newMessage,
//                     user_id: user.id,
//                     conversation_id: conversation.id
//                 }
//           fetch("/messages", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(newMessageObject)
//           }).then(response => response.json()).then(response => setConversation(response))    
//     }

//     return (
//         <div id="message-container">
//           {/* <p>{showConversation}</p> */}
//           <p> Chat Here </p>
//             <form id="send-container" onSubmit={createMessage}>
//               <input type="text" id="message-input" onChange={handleNewMessage} value={newMessage} />
//               <button type="submit" id="send-button">Send</button>
//             </form>
//         </div>
//     )
// }

// export default Conversation