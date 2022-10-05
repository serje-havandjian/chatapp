import React, {useState, useEffect} from "react"
import {Route, Routes, BrowserRouter as Router} from "react-router-dom"
import './App.css';
import Chatroom from "./Chatroom";
import SignUp from "./SignUp";
import Login from "./Login";
import Conversation from "./Conversation";
import Home from "./Home";

function App() {

  

  const [ user, setUser ] = useState(null);

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  console.log(user, "USER HERE")


  return(
    <>
    {user ? (
    <Router>
          <Routes>
            {/* <Route element={<Home setUser={setUser} user={user} />}></Route> */}
            <Route path ="/chatroom" element={<Chatroom user={user} setUser={setUser} />} /> 
            <Route path="/conversations/:id" element={<Conversation user={user} />} />
          </Routes>
       
      </Router>
      ) : (
        <Router>
          <Routes>
            {/* <Route element={<Home setUser={setUser} user={user} />}></Route> */}
            <Route path="/signup" element={<SignUp />} />
            {/* <Route path="/login" element={<Login setUser={setUser} />}>
            </Route> */}
          </Routes>
        </Router>
      )
  }
    
    </>
  )

}

export default App;
