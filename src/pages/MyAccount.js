import { useEffect } from "react";
import axios from "axios";
import "../App.css";

const MyAccount = (props) => {
  const { username } = props;
  useEffect(() => {
    try {
      const getUserAccount = async () => {
        const response = await axios.get(
          `https://happycow.herokuapp.com/my-account?username=${username}`
        );
        console.log("reponse getUserAccount ==>", response.data);
      };
      getUserAccount();
    } catch (error) {
      console.log("error getUserAccount ==>", error.response);
    }
  }, [username]);

  return <div>MyAccount Component</div>;
};

export default MyAccount;
