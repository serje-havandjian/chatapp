import { useState, useEffect, useReducer } from "react"
import { useParams } from "react-router-dom"
import {createConsumer} from "@rails/actioncable"
import Cable from "actioncable"
import ActionCable from "actioncable"


function reducer(state, action){
  switch(action.type){
    case "fetchSuccess":{
      return {...state, chatroom: action.payload, errors:[]}
    }
    case "fetchError" : {
      return {...state, errors: action.payload}
    }
    case "messageNew" :{
      const updatedChatroom = {...state.chatroom}
      updatedChatroom.messages = [...state.chatroom.messages, action.payload]
      return {...state, chatroom: updatedChatroom}
    }
    case 'messageEdit': {
      const updatedChatroom = { ...state.chatroom }
      updatedChatroom.messages = updatedChatroom.messages.map(message => {
        if (message.id === action.payload.id) {
          return action.payload;
        }
        return message;
      })
      return { ...state, chatroom: updatedChatroom }
    }
    case 'messageDelete': {
      const updatedChatroom = { ...state.chatroom }
      updatedChatroom.messages = updatedChatroom.messages.filter(message => message.id !== action.payload.id)
      return { ...state, chatroom: updatedChatroom }
    }
    case "chatConnection" : {
      return {...state, chatConnection: action.payload}
    }
    default: {
      return state
    }
  }
}

  

function Conversation({user}){

  const [displayChatsInConversation, setDisplayChatsInConversation ] = useState([])
  const [message, setMessage] = useState([])
  const [newMessage, setNewMessage] = useState()
  
  const params = useParams()

  const [state, dispatch] = useReducer(reducer, {
    chatroom: {},
    errors: [],
    chatConnection: {}
  })
  const {chatroom, errors, chatConnection} = state

  useEffect(()=>{
    (async () =>{
      await fetch(`/conversations/${params.id}`)
      .then(result => result.json())
      .then(result => {
        const convoMessage = result.messages.map((message)=>{
          return <p>{message.content}</p>
        })
        setDisplayChatsInConversation(convoMessage)

        if (result.ok) {
          result.json().then(data =>{
            dispatch({ type: "fetchSuccess", payload: data})
          })
        }else{
          result.json().then(e =>{
            dispatch({ type: "fetchFailure", payload: e.errors})
          })
        }
      })
    })()
  }, [`${params.id}`])





  function handleMessageNew(message) {
    // dispatch({ type: 'messageNew', payload: message})
  }
  function handleMessageEdit(messageEdit) {
    dispatch({ type: 'messageEdit', payload: messageEdit })
  }
  function handleMessageDelete(deletedMessage) {
    dispatch({ type: 'messageDelete', payload: deletedMessage })
  }




 

  // useEffect(()=>{
  //   (async() => {
  //     const jsonMessages = await fetch(`/conversations/${params.id}`)
  //     .then(result => result.json())
  //     console.log(jsonMessages)
  //     const convoMessage = jsonMessages.messages.map((message)=>{
  //       return <p>{message.content}</p>
  //     })
  //     setDisplayChatsInConversation(convoMessage)
  //   })()
  // }, [])


  function handleNewMessageContent(e){
    setNewMessage(e.target.value)
    }
    
     function createMessage(e){
      e.preventDefault()
      // const newMessageObject ={
      //         content: newMessage,
      //         user_id: user.id,
      //         conversation_id: params.id
      //         };
          
      fetch("/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newMessage,
          conversation_id: params.id,
          user_id: user.id
        })
      }).then(r =>{
          if(r.ok){
            r.json().then(message =>{
              handleMessageNew(message)
              setMessage(() => "")
            })
          }
        })
      
    
    };











    // Action Cable Stuff
  useEffect(()=>{
    function createSocket(){
      const consumer = Cable.createConsumer(`ws://${window.location.hostname}:3000/cable`)
      const subscription = consumer.subscriptions.create(
        {
          channel: "ConversationChannel",
          room: chatroom.name
        },
        {
          received: (message) => {
            dispatch({type: "messageNew", payload: message})
          }
        }
      )
      dispatch({ type: "chatConnection", payload: subscription})
    }
    if(chatroom.name){
      createSocket()
    }
  }, [chatroom.name, chatroom.id])

  //   const cable = createConsumer("ws://localhost:3000/cable")

  //   console.log(cable)
              
  //   console.log("logging params here", params)

  //   const paramsToSend={
  //     channel: "ConversationChannel",
  //     id: params.id
  //   }

  //   console.log(paramsToSend)
    

  //   const handlers = {
  //     received(data){
  //       setMessage([...message, data])
  //       console.log(data)
  //     },

  //     connected(){
  //       console.log("connected")
  //     },

  //     disconnected(){
  //       console.log("disconnected")
  //     }
  //   }
  //   const subscription = cable.subscriptions.create(paramsToSend, handlers)

  //   return function cleanup(){
  //     console.log("unsubbing from", params.id)
  //     subscription.unsubscribe()
  //   }
  // }, [params.id, message])
  
  //   console.log(message)

  return(
    <>
    <h1> Hello World</h1>
    <div>{displayChatsInConversation}</div>
      <div id="message-container">
           <p> Chat Here </p>
             <form id="send-container" onSubmit={createMessage}>
               <input type="text" id="message-input" onChange={handleNewMessageContent} />
               <button type="submit" id="send-button">Send</button>
             </form>
        </div>
    </>
  )
}

export default Conversation

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