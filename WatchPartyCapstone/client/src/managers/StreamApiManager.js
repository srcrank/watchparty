import firebase from "firebase/app";
import "firebase/auth";

const baseUrl = "/api/event/stream";
export const getToken = () => firebase.auth().currentUser.getIdToken();

export const searchStreamApi = (searchKeyword) => {
  return getToken().then((token) =>
    fetch(`${baseUrl}?searchTerm=${searchKeyword}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json())
  );
};
