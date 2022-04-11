import axios from 'axios';
import { backendSrc } from "../component/backendSrc";

function Login() {
  return (
    axios.get(`${backendSrc}/login`) 
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
