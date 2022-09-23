import React from "react"
import {Comment} from "semantic-ui-react"

function Message({chatroom, user}){

    console.log(chatroom)

    const chats = chatroom.messages.map((message)=>{
        return(
            
            <Comment>
                <Comment.Content>
                    <Comment.Text> {message.user.username} : {message.content}  </Comment.Text>
                </Comment.Content>
                
            </Comment>
            
            
        )  
         
    })


    return(
        <div id="ChatBox">
            <br />
            <p>{chats}</p>
        </div>
    )

}

export default Message