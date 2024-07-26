const Note = require('../Modals/Note');

// Create Note
const createNote = async (req, res) => {
    const { title, content, labels, reminder } = req.body;
    console.log('user: ', req.userId)
    try {
        const note = new Note({
            title,
            content,
            labels,
            reminder,
            user: req.userId
        });
        await note.save();
        res.status(201).json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get Notes
const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.userId });
        res.json(notes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update Note
const updateNote = async (req, res) => {
    const { title, content, labels, reminder, archived } = req.body;
    try {
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            { title, content, labels, reminder, archived, updated_at: new Date() },
            { new: true }
        );
        res.json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update background color
const updateBackgroundColor = async (req, res) => {
    const { id } = req.params;
    const { backgroundColor } = req.body;
    console.log('id: ', id, 'bg-color: ', backgroundColor);

    if (!backgroundColor) {
        return res.status(400).json({ error_msg: 'Color is required' });
    }

    try {
        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({ error_msg: 'Note not found' });
        }

        note.backgroundColor = backgroundColor;
        await note.save();

        res.status(200).json({ message: 'Background color updated successfully' });
    } catch (error) {
        console.error('Error updating background color:', error);
        res.status(500).json({ error_msg: 'Internal server error' });
    }
};

// Delete Note (Move to Trash)
const deleteNote = async (req, res) => {
    try {
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            { deleted: true, updated_at: new Date() },
            { new: true }
        );
        res.json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Archive Note
const archiveNote = async (req, res) => {
    try {
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            { archived: true, updated_at: new Date() },
            { new: true }
        );
        res.json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// unArchive Note
const unArchive = async (req, res) => {
    try {
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            { archived: false, updated_at: new Date() },
            { new: true }
        );
        res.json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get Archived Notes
const getArchivedNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.userId, archived: true });
        res.json(notes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get Trash Notes
const getTrashNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.userId, deleted: true });
        res.json(notes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Untrash Note
const untrashNote = async (req, res) => {
    try {
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            { deleted: false, updated_at: new Date() },
            { new: true }
        );
        res.json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete Note Permanently
const deleteNotePermanently = async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.userId });
        res.json({ message: 'Note deleted permanently' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Add label to a note
const addLabelToNote = async (req, res) => {
    const { id } = req.params;
    const { label } = req.body;

    if (!label) {
        return res.status(400).json({ error_msg: 'Label is required' });
    }

    try {
        const note = await Note.findOne({ _id: id, user: req.userId });

        if (!note) {
            return res.status(404).json({ error_msg: 'Note not found' });
        }

        // Check if the label already exists
        if (!note.labels.includes(label)) {
            if (note.labels.length >= 9) {
                return res.status(400).json({ error_msg: 'Cannot add more than 9 labels' });
            }
            note.labels.push(label);
            await note.save();
        }

        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ error_msg: 'Internal server error' });
    }
};

// Remove label from a note
const removeLabelFromNote = async (req, res) => {
    const { id } = req.params;
    const { label } = req.body;

    if (!label) {
        return res.status(400).json({ error_msg: 'Label is required' });
    }

    try {
        const note = await Note.findOne({ _id: id, user: req.userId });

        if (!note) {
            return res.status(404).json({ error_msg: 'Note not found' });
        }

        // Remove the label
        note.labels = note.labels.filter(l => l !== label);
        await note.save();

        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ error_msg: 'Internal server error' });
    }
};

// Get Notes with Labels
const getNotesWithLabels = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.userId });
        res.json(notes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createNote,
    getNotes,
    updateNote,
    deleteNote,
    archiveNote,
    getArchivedNotes,
    getTrashNotes,
    updateBackgroundColor,
    untrashNote,
    deleteNotePermanently,
    addLabelToNote,
    removeLabelFromNote,
    getNotesWithLabels,
};



module.exports = {
    createNote,
    getNotes,
    updateNote,
    deleteNote,
    archiveNote,
    getArchivedNotes,
    getTrashNotes,
    updateBackgroundColor,
    untrashNote,
    deleteNotePermanently,
    unArchive,
    addLabelToNote,
    removeLabelFromNote
};