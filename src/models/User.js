export default class User{

  constructor(token, name, pp){
    this.displayName = name || ''
    this.profilePicture = pp || ''
    this.token = token || ''
  }
}
