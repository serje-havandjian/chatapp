import React, {useState, useEffect} from "react"
import {Route, Switch, useParams, Routes, BrowserRouter as Router} from "react-router-dom"
import './App.css';
import Chatroom from "./Chatroom";
import SignUp from "./SignUp";
import Login from "./Login";
import Conversation from "./Conversation";
import Essen from "./Essen";

function App() {

  const params = useParams()

  console.log(params, "Params in App page")

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
            <Route path ="/Chatroom/" element={<Chatroom user={user} setUser={setUser} />} /> 
            <Route path="/Conversations/:id" element={<Conversation />} />

            {/* <Route path="/" element={<Essen />} />  */}
          </Routes>
       
      </Router>
      ) : (
        <Router>
          <Routes>
            <Route path="signup" element={<SignUp />} />
              {/* <SignUp setUser = {setUser} /> */}

            <Route path="login" element={<Login setUser={setUser} />}>
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
