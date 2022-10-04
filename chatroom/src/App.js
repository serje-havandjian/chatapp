import React, {useState, useEffect} from "react"
import {Route, Routes, BrowserRouter as Router} from "react-router-dom"
import './App.css';
import Chatroom from "./Chatroom";
import SignUp from "./SignUp";
import Login from "./Login";
import Conversation from "./Conversation";

function App() {

  

  const [ user, setUser ] = useState(null);

  useEffect(() => {
    fetch("https://chat-app-project-2.herokuapp.com/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);



  return(
    <>
    {user ? (
    <Router>
          <Routes>
            <Route exact path ="/" element={<Chatroom user={user} setUser={setUser} />} /> 
            <Route exact path="/Conversations/:id" element={<Conversation user={user} />} />
          </Routes>
       
      </Router>
      ) : (
        <Router>
          <Routes>
            <Route exact path="/" element={<Login setUser={setUser} />}>
            <Route exact path="/signup" element={<SignUp />} />
            </Route>
          </Routes>
        </Router>
      )
  }
    
    </>
  )

}

export default App;
