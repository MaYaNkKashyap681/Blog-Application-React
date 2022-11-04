const express = require('express')
const router = express.Router()

const {getPosts, getPost, createPost, deletePost, updatePost} = require('../controllers/postsController.js')

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', createPost);
router.delete('/:id', deletePost);
router.patch('/:id', updatePost);

module.exports = router;