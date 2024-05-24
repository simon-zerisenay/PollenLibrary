

const pool = require('../Database/db');

const Content = {
  async create(data) {
    console.log('running content');
    try {
      const { common_name, emirate, categories, descriptions, image, progress, user_id } = data;
      const image_link = image;
      const [result] = await pool.query(
        'INSERT INTO pollen_library.content_table (common_name, emirate, categories,descriptions, image_link, progress, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)', 
        [common_name, emirate, categories, descriptions, image_link, progress, user_id]
      );
      console.log('result: ', result);
      return result.insertId;
    } catch (e) {
      console.log('error: syntax error ', e);
      throw e;
    }
  },



  async updateProgress(id, progress) {
    await pool.query('UPDATE content_table SET progress = ? WHERE id = ?', [progress, id]);
  },

  async findAllByProgress(progress) {
    const [rows] = await pool.query('SELECT * FROM content_table WHERE progress = ?', [progress]);
    return rows;
  },
  
  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM content_table WHERE id = ?', [id]);
    return rows[0];
  },

  async search(query) {
    const [rows] = await pool.query(`SELECT * FROM content_table WHERE MATCH(arabic_name, botanical_name, synonyms, family, kind, emirate, categories, habitats, types, references, descriptions) AGAINST(?) AND progress = 'approved'`, [query]);
    return rows;
  },

  async getAllApproved() {
    const [rows] = await pool.query('SELECT * FROM content_table WHERE progress = "approved"');
    return rows;
  },

  async getInporgress() {
    const rows= await pool.query('SELECT * FROM content_table WHERE progress = ?' ,["in-progress"]);
    console.log("admin", rows[0]);
    return rows[0];
  },
  async getInporgressByUserId(user_Id) {
    // Implement the logic to fetch in-progress content by user ID
    // This is a placeholder, replace with actual database query
    const result= await pool.query('SELECT * FROM content_table WHERE progress = ? AND user_id = ?', [user_Id, "in-progress"]);
    console.log("results", result);
    return result[0];
  }
};

module.exports = Content;
