function Message({chatroom}){

    console.log(chatroom)

    const test = chatroom.messages.map((message)=>{
        return message.content
    })

    console.log(test)

    // const test = chat.map((chat)=>{
    //     return chat.content
    // })

    // console.log(test)

    return(
        <>
        <p>{test}</p>
        </>
    )

}

export default Message