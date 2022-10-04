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
            <Route path ="/Chatroom" element={<Chatroom user={user} setUser={setUser} />} /> 
            <Route path="/Conversations/:id" element={<Conversation user={user} />} />
          </Routes>
       
      </Router>
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<Login setUser={setUser} />}>
            </Route>
          </Routes>
        </Router>
      )
  }
    
    </>
  )

}

export default App;
