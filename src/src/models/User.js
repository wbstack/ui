export default class User {
  static fromLocalStorage () {
    if (localStorage.auth && localStorage.email && localStorage.username) {
      return new User(localStorage.username, localStorage.email, localStorage.auth)
    }
    return null
  }

  constructor (username, email, auth) {
    this.username = username
    this.email = email
    this.auth = auth
  }

  get getUsername () {
    return this.username
  }

  get getEmail () {
    return this.email
  }

  get getAuth () {
    return this.auth
  }
}
