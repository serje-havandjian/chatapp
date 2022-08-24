import { useState, useEffect } from "react"


function Conversation({conversation, user, chatrooms, chatroomId}){

    const [newMessage, setNewMessage] = useState()

    console.log(conversation, "conversation")
    console.log(chatrooms, "chatrooms")
    console.log(chatroomId, "chatroomId")
 


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
          })
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