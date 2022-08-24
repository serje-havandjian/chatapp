import React, {useState, useEffect} from "react"
import {Route, Switch} from "react-router-dom"
import './App.css';
import Chatroom from "./Chatroom";
import SignUp from "./SignUp";
import Login from "./Login";

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
      <Switch>
        <Route exact path ="/">
          <Chatroom user={user} setUser={setUser}></Chatroom>
        </Route>
      </Switch>
      ) : (
        <Switch>
          <Route exact path="/signup">
            <SignUp setUser = {setUser} />
          </Route>
          <Route>
            <Login setUser= {setUser} />
          </Route>
        </Switch>
      )
  }
    
    </>
  )

}

export default App;
