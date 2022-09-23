import React from "react"
import {Comment, Icon, Message} from "semantic-ui-react"
import './App.css';

function Messages({chatroom, user}){

    const chats = chatroom.messages.map((message)=>{
        return(
            <div >
                <br></br>
                <div >
                    <Icon circular inverted color="teal" name="envelope square" size="tiny" />
                    {message.user.username}: 
                    {message.content} 
                </div>
                <p className="test" />
            </div>
        ) 
    })


    return(
        <div className="chatRoom" >
            <Message size="mini" color="black" >
                <div className="ChatBox">
                {chats}
                </div>
            </Message>
        </div>
    )

}

export default Messages