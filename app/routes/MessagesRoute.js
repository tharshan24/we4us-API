const express = require('express');
const router = express.Router();
const messages = require('../models/Messages');

// save messages
// router.post("/", async(req,res)=>{
//     const setMessages = new messages ({
//         conversationId: req.body.conversationId,
//         text: req.body.text,
//         user: req.body.user
//     })

//     try {
//         const savedMessages = await setMessages.save();
//         res.status(200).json(savedMessages);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// });

//get messages from conversationId

router.get('/:conversationId',async(req,res)=>{
    try {
        const getMessages = await messages.find({
            conversationId: req.params.conversationId,
        });
        res.status(200).json(getMessages);
    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports = router;
