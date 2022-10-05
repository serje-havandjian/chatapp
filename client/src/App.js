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
    fetch("/me").then((r) => {
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
            <Route path="/conversations/:id" element={<Conversation user={user} />} />
          </Routes>
       
      </Router>
      ) : (
        <Router>
          <Routes>
            <Route exact path="/" element={<SignUp />} />
            <Route exact path="/login" element={<Login setUser={setUser} />}>
            </Route>
          </Routes>
        </Router>
      )
  }
    
    </>
  )

}

export default App;
