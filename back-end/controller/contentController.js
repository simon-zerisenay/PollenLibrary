

const Content = require('../models/content');

const addContent = async (req, res) => {
  const { arabic_name, botanical_name, synonyms, family, kind, emirate, categories, habitats, types, references, area_of_collection, image } = req.body;
  //const image_link = req.file.path;
  const progress = 'in-progress';

  try {
    const contentId = await Content.create({ arabic_name, botanical_name, synonyms, family, kind, emirate, categories, habitats, types, references, area_of_collection, image, progress });
    res.status(201).json({ id: contentId });
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


module.exports = {
  addContent,
  approveContent,
  rejectContent,
  getContent,
  searchContent,
  getAllApprovedContent,
};
