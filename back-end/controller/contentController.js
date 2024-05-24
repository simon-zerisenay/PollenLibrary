
const Content = require('../models/content');
const User = require('../models/user');

const addContent = async (req, res) => {
  const user_id = req.user;
  const {
    english_name ,
    emirate ,
    categories ,
    descriptions ,
    image 
  } = req.body;

  console.log("user_id: " + user_id);

  const result = await User.findById(user_id);
  //console.log("result", result);
  const userRole = result.role;

  let progress;
  if (userRole === 'admin') {
    progress = 'approved';
  } else {
    progress = 'in-progress';
    // Update user role to contributor only if it is not already 'contributor'
    if (userRole !== 'contributor') {
      await User.updateRole(user_id, 'contributor');
    }
  }

  try {
    
    const contentId = await Content.create({
      english_name,
      emirate,
      categories,
      descriptions,
      image,
      progress,
      user_id
    });
    res.status(201).json({ id: contentId });
    console.log("formatted content");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const approveContent = async (req, res) => {
  const { id } = req.params;

  try {
    await Content.updateProgress(id, 'approved');
    res.status(200).json({ message: 'Content approved' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const rejectContent = async (req, res) => {
  const { id } = req.params;

  try {
    await Content.updateProgress(id, 'rejected');
    res.status(200).json({ message: 'Content rejected' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getContent = async (req, res) => {
  const { id } = req.params;

  try {
    const content = await Content.findById(id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.status(200).json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const searchContent = async (req, res) => {
  const { query } = req.query;

  try {
    const results = await Content.search(query);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllApprovedContent = async (req, res) => {
  try {
    const content = await Content.getAllApproved();
    res.status(200).json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getInProgressContent = async (req, res) => {
  console.log("in getInporgressContent");
  try {
    // Assuming req.user contains the authenticated user's information
    const user_id  = req.user;

    console.log("user_id", user_id);

    const result =  await User.findById(user_id);
    console.log("results", result.role);
    const role = result.role;

    let content;
    if (role === 'admin') {
      content = await Content.getInporgress(); // Fetch all in-progress content
      console.log("content", content);
    } else if (role === 'contributor') {
      content = await Content.getInporgressByUserId(user_id); // Fetch in-progress content by user_id
    } else {
      return res.status(403).json({ message: "Access forbidden: insufficient permissions" });
    }
   
    console.log("Access" , content , "role", role);
    res.status(200).json({content: content, role: role});
    console.log("content", content);
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  addContent,
  approveContent,
  rejectContent,
  getContent,
  searchContent,
  getAllApprovedContent,
  getInProgressContent
};
