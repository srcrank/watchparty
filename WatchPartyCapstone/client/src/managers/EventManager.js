import firebase from "firebase/app";
import "firebase/auth";

const baseUrl = "/api/event";
export const getToken = () => firebase.auth().currentUser.getIdToken();

export const getEventCardById = (id) => {
    return getToken().then((token) => {
         return fetch(`${baseUrl}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => res.json());
    });
    };


//       .then(res => {
//         if (res.ok) {
//           return res.json();
//         } else {
//           throw new Error("An unknown error occorred while trying to fetch the event");
//         }
//       });
//     });
//   };


export const GetAllEvents = () => {
  return getToken().then((token) =>
    fetch(baseUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json())
  );
};

export const GetEventsByUser = () => {
  return getToken().then((token) =>
    fetch(`${baseUrl}/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json())
  );
};

export const getEvent = () => {
  return fetch(`${baseUrl}/`).then((res) => res.json());
};

export const addEvent = (events) => {
  return getToken().then((token) =>
    fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(events),
    })
  );
};

//edit an event
export const editEvent = (editedEvent) => {
    return getToken().then((token) =>
    fetch(`${baseUrl}/${editedEvent.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedEvent)
    }))
}

// export const updateEvent= (editEvent) => {
//     return getToken().then((token) => {
//       return fetch(`${baseUrl}/${editEvent.id}`, {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json"            
//         },
//         body: JSON.stringify(editEvent)
//       }).then(resp => {
//         if (resp.ok) {
//           return;
//         } else if (resp.status === 401) {
//           throw new Error("Unauthorized");
//         } else {
//           throw new Error("An unknown error occurred while trying to update your event.");
//         }
//       });
//     });
//   }

//delete an event
export const deleteEvent = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
