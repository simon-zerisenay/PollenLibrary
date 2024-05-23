

const pool = require('../Database/db');

const Content = {
  async create(data) {
    const { arabic_name, botanical_name, synonyms, family, kind, emirate, categories, habitats, types, references, area_of_collection, image_link, progress } = data;
    const [result] = await pool.query('INSERT INTO content_table (arabic_name, botanical_name, synonyms, family, kind, emirate, categories, habitats, types, references,  descriptions, image_link, progress) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [arabic_name, botanical_name, synonyms, family, kind, emirate, categories, habitats, types, references,  descriptions, image_link, progress]);
    return result.insertId;
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
  }
};

module.exports = Content;
