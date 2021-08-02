import firebase from "firebase/app";
import "firebase/auth";

const baseUrl = '/api/event/stream'
export const getToken = () => firebase.auth().currentUser.getIdToken();

export const searchStreamApi = (searchKeyword) => {
    return fetch(`${baseUrl}?searchTerm=${searchKeyword}`)
        .then(res => res.json())
}
