import React from "react"
import {Card, CardActions, CardContent,List, ListItem,Button,Typography,Input} from '@material-ui/core';

function Message({chatroom}){
    const chats = chatroom.messages.map((message)=>{
        return(
            <>
            <p>{message.content}</p>
            </>
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