export default class User {
  static fromLocalStorage () {
    if (localStorage.email && localStorage.auth && localStorage.isAdmin) {
      return new User(localStorage.email, localStorage.auth, localStorage.isAdmin)
    }
    return null
  }

  constructor (email, auth, isAdmin) {
    this.email = email
    this.auth = auth
    // The API currently returns this as a stirng, yay
    this.isAdmin = ( isAdmin == 'true' )
  }

  get getEmail () {
    return this.email
  }

  get getAuth () {
    return this.auth
  }

  get getIsAdmin() {
    return this.isAdmin
  }
}
