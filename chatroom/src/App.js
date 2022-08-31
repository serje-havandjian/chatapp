import React, {useState, useEffect} from "react"
import {Route, Switch, useParams, Routes, BrowserRouter as Router} from "react-router-dom"
import './App.css';
import Chatroom from "./Chatroom";
import SignUp from "./SignUp";
import Login from "./Login";
import Conversation from "./Conversation";

function App() {

  const params = useParams()

  console.log(params)

  const [ user, setUser ] = useState(null);

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  console.log(user)

 

  return(
    <>
    {user ? (
    <Router>
          <Routes>
            <Route path ="/" element={<Chatroom />} />
              {/* <Chatroom user={user} setUser={setUser}></Chatroom> */}
            
            <Route path="/conversation" element={<Conversation />} />
            {/* <Conversation /> */}
         
          </Routes>
       
      </Router>
      ) : (
        <Router>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
              {/* <SignUp setUser = {setUser} /> */}

            <Route path="/login" element={<Login setUser={setUser} />}>
              {/* <Login setUser= {setUser} /> */}
            </Route>
          </Routes>
        </Router>
      )
  }
    
    </>
  )

}

export default App;
