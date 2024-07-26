const express = require('express');
const router = express.Router();
const {
    createNote,
    getNotes,
    updateNote,
    updateBackgroundColor,
    deleteNote,
    archiveNote,
    getArchivedNotes,
    getTrashNotes,
    untrashNote,
    deleteNotePermanently,
    unArchive,
     addLabelToNote,
     removeLabelFromNote
} = require('../Controllers/noteController');

const authenticate = require('../middleware/auth'); // Assuming you have an auth middleware to verify JWT

// Route to create a new note
router.post('/create-note', authenticate, createNote);

// Route to get all notes for the authenticated user
router.get('/', authenticate, getNotes);

// Route to update a note
router.patch('/update/:id', authenticate, updateNote);

// Route to update the background color of a note
router.patch('/update/:id/background-color', authenticate, updateBackgroundColor);

// Route to delete (move to trash) a note
router.patch('/delete/:id', authenticate, deleteNote);

// Route to archive a note
router.patch('/archive/:id', authenticate, archiveNote);

// Route to get all archived notes for the authenticated user
router.get('/archived', authenticate, getArchivedNotes);

// Route to get all trash notes for the authenticated user
router.get('/trash', authenticate, getTrashNotes);

// Route to untrash a note
router.patch('/untrash/:id', authenticate, untrashNote);

// Route to delete a note permanently
router.delete('/delete/:id', authenticate, deleteNotePermanently);

// Route to unarchive a note
router.patch('/unarchive/:id', authenticate, unArchive);

// Add label to a note
router.patch('/update/:id/label', addLabelToNote);

// Remove label from a note
router.patch('/:id/label/remove', removeLabelFromNote);

module.exports = router;
