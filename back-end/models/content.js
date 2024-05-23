

const pool = require('../Database/db');

const Content = {
  async create(data) {
    console.log('running content');
    try {
        const { english_name, arabic_name, botanical_name, synonyms, family, kind, emirate, categories, habitats, descriptions, image, progress } = data;
        const image_link = image;
        const [result] = await pool.query('INSERT INTO pollen_library.content_table (english_name, arabic_name, botanical_name, synonyms, family, kind, emirate, categories, habitats, descriptions, image_link, progress) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [english_name, arabic_name, botanical_name, synonyms, family, kind, emirate, categories, habitats, descriptions, image_link, progress]);
        console.log('result: ', result);
        return result.insertId;
    } catch (e) {
        console.log('error: ', e);
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
  }
};

module.exports = Content;
