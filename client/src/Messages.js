import React from "react"
import {Icon, Message} from "semantic-ui-react"
import './App.css';

function Messages({chatroom}){
 
    const chats = chatroom.messages.map((message)=>{
        if(message.user.name[0] === "R" ){
            return(
                <div >
                    <br></br>
                    <div >
                        <Icon circular inverted color="teal" name="envelope square" size="small" />
                        <span className="firstUserColor">{message.user.username}:</span>
                        <span className="messageFont"> {message.content}  </span>
                    </div>
                    <p className="borderLine" />
                </div>
            ) 
        }else{
            return(
                <div >
                    <br></br>
                    <div >
                        <Icon circular inverted color="teal" name="envelope square" size="small" />
                        <span className="secondUserColor">{message.user.username}:</span>
                        <span className="messageFont"> {message.content}  </span>
                    </div>
                    <p className="borderLine" />
                </div>
            ) 
        }        
    })


    return(
        <div className="chatRoom" >
            <div className="ChatBox">
            {chats}
            </div>
        </div>
    )

}

export default Messages