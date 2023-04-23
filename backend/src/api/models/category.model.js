const { pool } = require('../databases/connect.mysql')

const Category = {
  /**sub-category  : như là áo croptop, quần dài ,...
   * @returns Trả về list các danh mục lớn như Áo, quần,...
   * @example  [{id,[sub-category],category_name, category_slug}] */
  getCategories: async () => {
    const records = await pool.execute('call proc_getCategories()')
    return records[0][0][0].data
  },
}

module.exports = Category
