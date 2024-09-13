const express = require('express');
const mongoose = require('mongoose');
const documents = require('../models/Doc.js'); // Adjust path and extension if needed

const router = express.Router();

router.delete('/delete', async (req, res, next) => {
  const { id } = req.body;

  // Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid document ID format' });
  }

  try {
    const result = await documents.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Document not found' });
    }

    console.log(`Document with ID ${id} deleted successfully`);
    res.status(200).json({
      message: 'Document deleted successfully',
      deleted: result,
    });
  } catch (err) {
    console.error('Error deleting document:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
