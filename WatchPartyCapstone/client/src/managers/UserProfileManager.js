import firebase from "firebase/app";
import "firebase/auth";

const _apiUrl = "/api/userprofile";

export const GetAllActiveUsers = () => {
    return fetch(`${_apiUrl}/GetAllActiveUsers`)
      .then((res) => res.json())
  };

  console.log("hello", GetAllActiveUsers())