class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
  }

  async _request(url, options) {
    const res = await fetch(url, options);
    return this._checkResponse(res);
  }

  async register({ email, password }) {
    return this._request(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  }

  async authorize({ email, password }) {
    return this._request(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  }

  async getNotes() {
    return this._request(`${this._baseUrl}/notes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('CHATTYTOKEN')}`,
      },
    });
  }

  async addNote({ title, date, content }) {
    return this._request(`${this._baseUrl}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('CHATTYTOKEN')}`,
      },
      body: JSON.stringify({ title, date, content }),
    });
  }

  async deleteNote({ id }) {
    return this._request(`${this._baseUrl}/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('CHATTYTOKEN')}`,
      },
    });
  }

  async getChats() {
    return this._request(`${this._baseUrl}/chats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('CHATTYTOKEN')}`,
      },
    });
  }

  async getChatById(id) {
    return this._request(`${this._baseUrl}/chats/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('CHATTYTOKEN')}`,
      },
    });
  }

  async updateChat({ id, messages }) {
    return this._request(`${this._baseUrl}/chats/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('CHATTYTOKEN')}`,
      },
      body: JSON.stringify({ messages }),
    });
  }

  async addChat({ title, messages }) {
    return this._request(`${this._baseUrl}/chats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('CHATTYTOKEN')}`,
      },
      body: JSON.stringify({ title, messages }),
    });
  }

  async deleteChat({ id }) {
    return this._request(`${this._baseUrl}/chats/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('CHATTYTOKEN')}`,
      },
    });
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
}

const api = new Api({
  baseUrl: 'http://localhost:3000',
});

export default api;
