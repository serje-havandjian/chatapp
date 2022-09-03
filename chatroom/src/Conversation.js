import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import {createConsumer} from "@rails/actioncable"

function Conversation(){

  const [displayChatsInConversation, setDisplayChatsInConversation ] = useState([])
  
  const params = useParams()
  
  console.log(params.id)

  useEffect(()=>{
    (async() => {
      const jsonMessages = await fetch(`/conversations/${params.id}`)
      .then(result => result.json())
      console.log(jsonMessages)
      const test = jsonMessages.messages.map((message)=>{
        return <p>{message.content}</p>
      })
      setDisplayChatsInConversation(test)
    })()

    
  }, [])
  
    

  return(
    <>
    <p> Hello World</p>
    <p>{displayChatsInConversation}</p>
    </>
  )
}

export default Conversation

// function Conversation({conversation, user, newMessage, setNewMessage, setConversation, chatroomId}){

//   const [displayChatsInConversation, setDisplayChatsInConversation ] = useState([])
  
//   const params = useParams()
  
//   console.log(params.id)
  
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