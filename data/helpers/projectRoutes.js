const express = require('express');
const db = require('./projectModel.js');

const {
    validateName,
    validateDescription
} = require('../../mw/index.js');

const router = express.Router();

router
    .route('/')
    .get(async (req, res) => {
        try {
            const resource = await db.get();
            res.status(200).json(resource);
        } catch (err) {
            res.status(500).json({ error: "Error retrieving projects"});
        }
    })
    .post(validateName,
        validateDescription,
        async (req, res) => {
            const project = req.body;
            try {
                const resource = await dbinsert(project);
                res.status(201).json(resource);
            } catch (err) {
                res.status(500).json({ error: "Error inserting project" });
            }
    })

router
    .route('/:id')
    .get(async (req, res) => {
        const { id } = req.params;
        try {
            const resource = await db.get(id);
            res.status(200).json(resource);
        } catch (err) {
            res.status(500).json({ error: "Error retrieving project"});
        }
    })
    .put(async (req, res) => {
        const { id } = req.params;
        const project = req.body;
        try {
            const resource = await db.update(id, project)
            if (resource) {
                res.status(200).json(resource);
            } else {
                res.status(404).json({ error: "Project not found" });    
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Error updating project" });
        }
    })
    .delete(async (req, res) => {
        const { id } = req.params;
        try {
            const result = await db.remove(id);
            if (result) {
                res.status(200).json({ message: "Project deleted successfully" });
            } else {
                res.status(404).json({ error: "Project not found" });
            }
        } catch(err) {
            res.status(500).json({ error: "Error deleting project" });
        }
    });

router
    .route('/:id/actions')
    .get(async (req, res) => {
        const { id } = req.params;
        try {
            const resources = await db.getProjectActions(id);
            if (resources.length) {
                res.status(200).json(resources);
            } else {
                res.status(404).json({ error: "Project actions are empty "});
            }
        } catch (err) {
            res.status(500).json({ error: "Error retrieving project actions" });
        }
    })


module.exports = router;