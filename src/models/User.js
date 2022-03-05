const { getJSON, saveJSON } = require("../utils/fileHelpers");

class User {
  constructor() {
    this.saveData = saveJSON;
    this.fetchData = getJSON;
  }

  async find(id) {
    // fetch the users
    const users = await this.fetchData();
    // found the users
    let user = users.find(user => user.id === id);
    //   if found return the user
    if (user !== undefined) {
      return user;
    }
    //if not found return Promise.reject(new Error(`User with id ${id} not found`));
    return Promise.reject(new Error(`User with id ${id} not found`));
  }

  async create(user) {
    // fetch the users
    const users = await this.fetchData();
    // append the user to all the users
    users.push(user);
    // save the users
    this.saveData(users);
    // return the saved user
    return users;
  }
}

module.exports = new User();
