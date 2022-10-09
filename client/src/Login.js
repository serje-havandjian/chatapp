import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Grid, Message, Segment } from 'semantic-ui-react';

function Login({setUser}){
    const [name, setName] = useState("")
    const [ username, setUsername ] = useState("");
    const [email, setEmail] = useState("")
    const [ password, setPassword ] = useState("");


   const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault();
        fetch("https://chat-app-project-2.herokuapp.com/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, username, email, password }),
        }).then((r) => {
          if (r.ok) {
            r.json().then((user) => setUser(user));
            navigate("/")
          }
        });
    }


    return (   
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle' >
        <Grid.Column style={{maxWidth: 450}}>
        <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
              <Segment stacked>
              <label htmlFor="name">Enter Name</label>
              <Form.Input
                fluid 
                icon='user' 
                iconPosition="left"
                type="text"
                id="name"
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="username">Enter Username</label>
              <Form.Input
                fluid 
                icon='user' 
                iconPosition="left"
                type="text"
                id="username"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="email">Enter Email Address</label>
              <Form.Input
                fluid 
                icon='user' 
                iconPosition="left"
                type="text"
                id="email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password">Password</label>
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit">Login</Button>
              </Segment>
            </Form>
            <Message>
              New to us? <a href="/signup">Sign up here.</a>
            </Message>
        </Grid.Column>
    </Grid>
  );
      
}

export default Login;