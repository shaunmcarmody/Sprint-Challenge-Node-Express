const validateName = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ error: "name is required" });
    } else {
        next();
    }
}

const validateDescription = (req, res, next) => {
    const { description } = req.body;
    if (!description) {
        res.status(400).json({ error: "description is required" });
    } else {
        next();
    }
}

const validateProjectId = (req, res, next) => {
    const { project_id } = req.body;
    if (!project_id) {
        res.status(400).json({ error: "project_id is required" });
    } else {
        next();
    } 
}

const descriptionLength = (req, res, next) => {
    const { description } = req.body;
    if (description.length > 128) {
        res.status(400).json({ error: "description must be 128 character or less" });
    } else {
        next();
    }
}

const validateNotes = (req, res, next) => {
    const { notes } = req.body;
    if (!notes) {
        res.status(400).json({ error: "notes are required" });
    } else {
        next();
    }
}

module.exports = {
    validateName,
    validateDescription,
    validateProjectId,
    descriptionLength,
    validateNotes
}

