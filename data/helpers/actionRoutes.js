const express = require('express');
const db = require('./actionModel.js');

const router = express.Router();

router
    .route('/')
    .get(async (req, res) => {
        try {
            const resource = await db.get();
            res.status(200).json(resource);
        } catch (err) {
            res.status(500).json({ error: "Error retrieving actions" });
        }
    })
    .post(async (req, res) => {
        const action = req.body;
        try {
            const resource = await db.insert(action);
            res.status(201).json(resource);
        } catch (err) {
            res.status(500).json({ error: "Error inserting action" });
        }
    });

router
    .route('/:id')
    .get(async (req, res) => {
        const { id } = req.params;
        try {
            const resource = await db.get(id);
            res.status(200).json(resource);
        } catch (err) {
            res.status(500).json({ error: "Error retrieving action" });
        }
    })
    .put(async (req, res) => {
        const { id } = req.params;
        const action = req.body;
        try {
            const resource = await db.update(id, action)
            if (resource) {
                res.status(200).json(resource);
            } else {
                res.status(404).json({ error: "Action not found" });    
            }
        } catch (err) {
            res.status(500).json({ error: "Error updating action" });
        }
    })
    .delete(async (req, res) => {
        const { id } = req.params;
        try {
            const result = await db.remove(id);
            if (result) {
                res.status(200).json({ message: "Action deleted successfully" });
            } else {
                res.status(404).json({ error: "Action not found" });
            }
        } catch(err) {
            res.status(500).json({ error: "Error deleting action" });
        }
    });


module.exports = router;
