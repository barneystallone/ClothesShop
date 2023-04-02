module.exports = {
    getDB: (dbName) => {
        const impl = require('./daoLoader').loadDao('user', dbName);

        const db = {
            insertUser: async ({ email, password }) => impl.insertUser({ email, password }),
            isExistsEmail: async (email) => impl.isExistsEmail(email),
            findByEmail: async (email) => impl.findByEmail(email),
        }
        // const insertUser = async (impl, user) => impl.insertUser(user)
        // const isExistsEmail = async (impl, email) => impl.isExistsEmail(email)
        return db;
    }

}