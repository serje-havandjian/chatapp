import React, {useState, useEffect} from "react"
import './App.css';

function App() {
  const [users, setUsers] = useState([])


  
  useEffect(()=>{
    fetch("/users.json")
    .then(result => result.json())
    .then(result => setUsers(result))
},[])

console.log(users)

  const allUsers = users.map((user)=>{
    return <p>{user.user_name}</p>
  })

  console.log(allUsers)

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <p>TEST</p>
          {allUsers}
        </div>
        <div id="message-container">
            <form id="send-container">
            <input type="text" id="message-input" />
            <button type="submit" id="send-button">Send</button>
            </form>
        </div>

      </header>
    </div>
  );
}

export default App;
