const express = require('express');
const members = require('../../Members');
const uuid = require('uuid');

const router = express.Router();

// Get all members
router.get('/', (req, res) => res.json(members));

// Get single member
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const found = members.some(member => member.id === id);

    if (found) {
        res.json(members.filter(member => member.id === id));
    } else {
        res.status(400).json({
            msg: `Member with id: ${id} not found`
        });
    }
});

// Create member
router.post('/', (req, res) => {
    const id = parseInt(uuid.v4());
    const newMember = {
        id,
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    };

    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'Please include a name and email' });
    }

    members.push(newMember);

    // For API routing only
    res.json(members);

    // For HTML template
    // res.redirect('/');
});

// Update member
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const found = members.some(member => member.id === id);

    if (found) {
        const updateMember = req.body;
        members.forEach(member => {
            if (member.id === id) {
                member.name = updateMember.name
                    ? updateMember.name
                    : member.name;
                member.email = updateMember.email
                    ? updateMember.email
                    : member.email;
                member.status = updateMember.status
                    ? updateMember.status
                    : member.status;

                res.json({ msg: `Member ${id} updated`, member });
            }
        });
    } else {
        res.status(400).json({
            msg: `Member with id: ${id} not found`
        });
    }
});

// Delete member
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const found = members.some(member => member.id === id);

    if (found) {
        res.json({
            msg: `Member with id: ${id} deleted.`,
            members: members.filter(member => member.id === id)
        });
    } else {
        res.status(400).json({
            msg: `Member with id: ${id} not found`
        });
    }
});

module.exports = router;
