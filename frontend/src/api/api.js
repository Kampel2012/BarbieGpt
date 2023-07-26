class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
  }

  register({ email, password }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    }).then(this._checkResponse);
  }

  authorize({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    }).then(this._checkResponse)
  }

  // ? нужны ли эти функции

  // getMyProfile() {
  //   return fetch(`${this._baseUrl}/users/me`, {
  //     method: 'GET',
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": `Bearer ${localStorage.getItem('token')}`
  //     }
  //   }).then(this._checkResponse)
  // }

  // getProfile({ id }) {
  //   return fetch(`${this._baseUrl}/users/${id}`, {
  //     method: 'GET',
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": `Bearer ${localStorage.getItem('token')}`
  //     }
  //   }).then(this._checkResponse)
  // }

  getNotes() {
    return fetch(`${this._baseUrl}/notes`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    }).then(this._checkResponse)
  }

  addNote({ title, date, content }) {
    return fetch(`${this._baseUrl}/notes`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ title, date, content })
    }).then(this._checkResponse)
  }

  deleteNote({ id }) {
    return fetch(`${this._baseUrl}/notes/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
    }).then(this._checkResponse)
  }

  getChats() {
    return fetch(`${this._baseUrl}/chats`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    }).then(this._checkResponse)
  }

  updateChat({ id, messages}) {
    return fetch(`${this._baseUrl}/chats/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ messages })
    }).then(this._checkResponse)
  }

  addChat({ messages }) {
    return fetch(`${this._baseUrl}/chats`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ messages })
    }).then(this._checkResponse)
  }

  deleteChat({ id }) {
    return fetch(`${this._baseUrl}/chats/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
    }).then(this._checkResponse)
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3000',
});

export default api;