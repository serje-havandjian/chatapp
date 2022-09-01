import { useEffect } from "react"
import { useParams } from "react-router-dom"
import {createConsumer} from "@rails/actioncable"

function Conversation({conversation, user, newMessage, setNewMessage, setConversation}){

  const params = useParams()
  

  
  useEffect(()=>{
    // STUPID ACTION CABLE STUFF
    const cable = createConsumer("ws://localhost:3000/cable")
              
    console.log("logging params here", params)

    const paramsToSend={
      channel: "ConversationChannel",
      id: params.id
    }

    console.log(paramsToSend)

    const handlers = {
      received(data){
        setNewMessage([...newMessage, data])
      },

      connected(){
        console.log("connected")
      },

      disconnected(){
        console.log("disconnected")
      }
    }
    const subscription = cable.subscriptions.create(paramsToSend, handlers)

    return function cleanup(){
      console.log("unsubbing from", params.id)
      subscription.unsubscribe()
    }
  }, [params.id, newMessage])
    



    function handleNewMessage(e){
        setNewMessage(e.target.value)
    }

    function createMessage(e){
        e.preventDefault()
        const newMessageObject ={
                    content: newMessage,
                    user_id: user.id,
                    conversation_id: conversation.id
                }
          fetch("/messages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newMessageObject)
          }).then(response => response.json()).then(response => setConversation(response))    
    }

    return (
        <div id="message-container">
          <p> Chat Here </p>
            <form id="send-container" onSubmit={createMessage}>
              <input type="text" id="message-input" onChange={handleNewMessage} value={newMessage} />
              <button type="submit" id="send-button">Send</button>
            </form>
        </div>
    )
}

export default Conversation