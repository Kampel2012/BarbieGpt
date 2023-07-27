class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
  }

  async register({ email, password }) {
    const res = await fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return this._checkResponse(res);
  }

  async authorize({ email, password }) {
    const res = await fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return this._checkResponse(res);
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

  async getNotes() {
    const res = await fetch(`${this._baseUrl}/notes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return this._checkResponse(res);
  }

  async addNote({ title, date, content }) {
    const res = await fetch(`${this._baseUrl}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ title, date, content }),
    });
    return this._checkResponse(res);
  }

  async deleteNote({ id }) {
    const res = await fetch(`${this._baseUrl}/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return this._checkResponse(res);
  }

  async getChats() {
    const res = await fetch(`${this._baseUrl}/chats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return this._checkResponse(res);
  }

  async updateChat({ id, messages }) {
    const res = await fetch(`${this._baseUrl}/chats/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ messages }),
    });
    return this._checkResponse(res);
  }

  async addChat({ messages }) {
    const res = await fetch(`${this._baseUrl}/chats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ messages }),
    });
    return this._checkResponse(res);
  }

  async deleteChat({ id }) {
    const res = await fetch(`${this._baseUrl}/chats/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return this._checkResponse(res);
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3000',
});

export default api;
