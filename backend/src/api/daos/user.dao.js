module.exports = {
  getDB: (dbName) => {
    const impl = require('./daoLoader').loadDao('user', dbName)

    const db = {
      insertUser: async (data) => impl.insertUser(data),
      isExistsEmail: async (email) => impl.isExistsEmail(email),
      findByEmail: async (email) => impl.findByEmail(email),
      findById: async (id) => impl.findById(id),
    }
    // const insertUser = async (impl, user) => impl.insertUser(user)
    // const isExistsEmail = async (impl, email) => impl.isExistsEmail(email)
    return db
  },
}
