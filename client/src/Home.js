import SignUp from "./SignUp";

function Home({ user, setUser }) {
    if (user) {
      return <h1>Welcome!</h1>;
    } else {
      return <SignUp setUser={setUser} />;
    }
  }
  
export default Home;