import firebase from "firebase/app";
import "firebase/auth";

const baseUrl = '/api/event'
export const getToken = () => firebase.auth().currentUser.getIdToken();

export const getEventCardById = (id) => {
    return fetch(`${baseUrl}/${id}`)
        .then(res => res.json())
}

export const GetAllEvents = () => {
    return fetch(baseUrl)
        .then((res) => res.json())
};


export const GetEventsByUser = () => {
    return getToken().then((token) =>
        fetch(`${baseUrl}/user`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => resp.json()));
}

export const getEvent = () => {
    return fetch(`${baseUrl}/`)
        .then((res) => res.json())
};


export const addEvent = (events) => {
    return fetch(baseUrl, {
        method: "POST",
        Headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(events)
    });
}

// export const getCurrentUserPosts = () => {
//     return getToken().then((token) =>
//         fetch(`${baseUrl}/myposts`, {
//             method: "GET",
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         }).then(resp => resp.json()));
// }