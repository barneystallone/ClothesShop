const mysql = require('../../../databases/connect.mysql');

var self = module.exports = {
    insertUser: async ({ email, password }) => {
        const _userId = await mysql.pool.execute(
            // 'call proc_insertUser(?,?)',
            'insert into user values(null,?,?,default)',
            [email, password]
        ).then(async (res) => {
            const insertId = await res[0].insertId
            return insertId
        })
        return _userId;
    },

    isExistsEmail: async (email) => {
        const isExists = await mysql.pool.execute(
            'select count(*) as "isExists" from user where email = ?',
            [email],
        ).then(res => {
            return res[0][0].isExists
        })

        return isExists ? isExists : 0;
    },

    findByEmail: async (email) => {
        const _user = await mysql.pool.execute(
            'select u.id, u.email, u.password, r.role_name from user u join role r on u.role_id = r.id where email = ?',
            [email],
        ).then(res => {
            return res[0][0]
        })

        return _user;
    }
}