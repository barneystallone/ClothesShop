module.exports = {
  /**
   *
   * @param {string} daoName - tên load DAO
   * @param {*} db
   * @returns
   */
  loadDao: (daoName, db) => {
    return require(`./impl/${db}/${daoName}.dao.${db}`)
  },
}
