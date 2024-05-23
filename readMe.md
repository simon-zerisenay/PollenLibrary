### Full Architecture with Get Content and Search API in Express.js with MySQL Database

#### Project Structure

```
/project-root
|-- /config
|   |-- db.js
|-- /controllers
|   |-- authController.js
|   |-- contentController.js
|-- /middleware
|   |-- authMiddleware.js
|   |-- roleMiddleware.js
|-- /models
|   |-- User.js
|   |-- Content.js
|-- /routes
|   |-- authRoutes.js
|   |-- contentRoutes.js
|-- /uploads
|-- app.js
|-- package.json
```

#### Configuration

**/config/db.js**

```javascript
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "database_name",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
```

#### Models

**/models/User.js**

```javascript
const pool = require("../config/db");

const User = {
  async create(email, password, phone_number, role) {
    const [result] = await pool.query(
      "INSERT INTO users_table (email, password, phone_number, role) VALUES (?, ?, ?, ?)",
      [email, password, phone_number, role]
    );
    return result.insertId;
  },

  async findByEmail(email) {
    const [rows] = await pool.query(
      "SELECT * FROM users_table WHERE email = ?",
      [email]
    );
    return rows[0];
  },

  async findById(id) {
    const [rows] = await pool.query("SELECT * FROM users_table WHERE id = ?", [
      id,
    ]);
    return rows[0];
  },
};

module.exports = User;
```

**/models/Content.js**

```javascript
const pool = require("../config/db");

const Content = {
  async create(data) {
    const {
      arabic_name,
      botanical_name,
      synonyms,
      family,
      kind,
      emirate,
      categories,
      habitats,
      types,
      references,
      area_of_collection,
      image_link,
      progress,
    } = data;
    const [result] = await pool.query(
      "INSERT INTO content_table (arabic_name, botanical_name, synonyms, family, kind, emirate, categories, habitats, types, references, area_of_collection, image_link, progress) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        arabic_name,
        botanical_name,
        synonyms,
        family,
        kind,
        emirate,
        categories,
        habitats,
        types,
        references,
        area_of_collection,
        image_link,
        progress,
      ]
    );
    return result.insertId;
  },

  async updateProgress(id, progress) {
    await pool.query("UPDATE content_table SET progress = ? WHERE id = ?", [
      progress,
      id,
    ]);
  },

  async findAllByProgress(progress) {
    const [rows] = await pool.query(
      "SELECT * FROM content_table WHERE progress = ?",
      [progress]
    );
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query(
      "SELECT * FROM content_table WHERE id = ?",
      [id]
    );
    return rows[0];
  },

  async search(query) {
    const [rows] = await pool.query(
      `SELECT * FROM content_table WHERE MATCH(arabic_name, botanical_name, synonyms, family, kind, emirate, categories, habitats, types, references, area_of_collection) AGAINST(?) AND progress = 'approved'`,
      [query]
    );
    return rows;
  },

  async getAllApproved() {
    const [rows] = await pool.query(
      'SELECT * FROM content_table WHERE progress = "approved"'
    );
    return rows;
  },
};

module.exports = Content;
```

#### Middleware

**/middleware/authMiddleware.js**

```javascript
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "your_jwt_secret");
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
```

**/middleware/roleMiddleware.js**

```javascript
const roleMiddleware = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

module.exports = roleMiddleware;
```

#### Controllers

**/controllers/authController.js**

```javascript
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.register = async (req, res) => {
  const { email, password, phone_number, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await User.create(email, hashedPassword, phone_number, role);

    res.status(201).json({ id: userId, email, role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, "your_jwt_secret", {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
```

**/controllers/contentController.js**

```javascript
const Content = require("../models/Content");

exports.addContent = async (req, res) => {
  const {
    arabic_name,
    botanical_name,
    synonyms,
    family,
    kind,
    emirate,
    categories,
    habitats,
    types,
    references,
    area_of_collection,
  } = req.body;
  const image_link = req.file.path;
  const progress = "in-progress";

  try {
    const contentId = await Content.create({
      arabic_name,
      botanical_name,
      synonyms,
      family,
      kind,
      emirate,
      categories,
      habitats,
      types,
      references,
      area_of_collection,
      image_link,
      progress,
    });
    res.status(201).json({ id: contentId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.approveContent = async (req, res) => {
  const { id } = req.params;

  try {
    await Content.updateProgress(id, "approved");
    res.status(200).json({ message: "Content approved" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.rejectContent = async (req, res) => {
  const { id } = req.params;

  try {
    await Content.updateProgress(id, "rejected");
    res.status(200).json({ message: "Content rejected" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getContent = async (req, res) => {
  const { id } = req.params;

  try {
    const content = await Content.findById(id);
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.status(200).json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.searchContent = async (req, res) => {
  const { query } = req.query;

  try {
    const results = await Content.search(query);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllApprovedContent = async (req, res) => {
  try {
    const content = await Content.getAllApproved();
    res.status(200).json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
```

#### Routes

**/routes/authRoutes.js**

```javascript
const express = require("express");
const { register, login } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
```

**/routes/contentRoutes.js**

```javascript
const express = require("express");
const {
  addContent,
  approveContent,
  rejectContent,
  getContent,
  searchContent,
  getAllApprovedContent,
} = require("../controllers/contentController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post(
  "/add",
  authMiddleware,
  roleMiddleware(["contributor"]),
  upload.single("image"),
  addContent
);
router.put(
  "/approve/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  approveContent
);
router.put(
  "/reject/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  rejectContent
);
router.get("/:id", authMiddleware, getContent);
router.get("/search", authMiddleware, searchContent);
router.get("/", authMiddleware, getAllApprovedContent);

module.exports = router;
```

#### Main Application

**app.js**

```javascript
const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const contentRoutes = require("./routes/contentRoutes");

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/content", contentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

#### Database Schema

```sql
CREATE TABLE users_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50),
    role ENUM('admin', 'contributor', 'user') NOT NULL
);

CREATE TABLE content_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    arabic_name VARCHAR(255),
    botanical_name VARCHAR(255),
    synonyms TEXT,
    family VARCHAR(255),
    kind VARCHAR(255),
    emirate VARCHAR(255),
    categories TEXT,
    habitats TEXT,
    types TEXT,
    references TEXT,
    area_of_collection TEXT,
    image_link VARCHAR(255),
    progress ENUM('in-progress', 'approved', 'rejected') NOT NULL,
    FULLTEXT (arabic_name, botanical_name, synonyms, family, kind, emirate, categories, habitats, types, references, area_of_collection)
);
```

### Summary

This architecture includes user authentication, role-based access control, a content approval workflow, content retrieval by ID, and a search functionality using Express.js and a MySQL database. The system ensures secure handling of user credentials, proper role enforcement, image upload mechanism, and efficient search capabilities for approved content.
