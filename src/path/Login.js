import axios from 'axios';

function Login() {
  return (
    axios.get("/login") 
      .then((response) => {
        console.log(response.data)
        window.location = response.data
      })
      .catch(error => {
        console.log(error.response.data)
      })
  );
}

export default Login;
