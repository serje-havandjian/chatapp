import React from "react"
import {Button, Comment, Icon, Message} from "semantic-ui-react"
import './App.css';

function Messages({chatroom, user}){

    console.log(chatroom)

 
    const chats = chatroom.messages.map((message)=>{
        if(message.user.name[0] === "R" ){
            return(
                <div >
                    <br></br>
                    <div >
                        <Icon circular inverted color="teal" name="envelope square" size="tiny" />
                        <span className="firstUserColor">{message.user.username}:</span>
                        {message.content} 
                    </div>
                    <p className="test" />
                </div>
            ) 
        }else{
            return(
                <div >
                    <br></br>
                    <div >
                        <Icon circular inverted color="teal" name="envelope square" size="tiny" />
                        <span className="secondUserColor">{message.user.username}:</span>
                        {message.content} 
                    </div>
                    <p className="test" />
                </div>
            ) 
        }        
    })


    return(
        <>
        <div className="chatRoom" >
            <Message size="mini" color="black" >
                <div className="ChatBox">
                {chats}
                </div>
            </Message>
        </div>
    
        </>
    )

}

export default Messages