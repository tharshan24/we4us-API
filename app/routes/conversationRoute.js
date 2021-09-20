const express = require('express');
const router = express.Router();
const Conversation = require('../models/Conversation');

router.post("/", async (req, res) => {
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });

    try {
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/:userId',async(req,res)=>{
      console.log(res)
      const getConversation = await Conversation.find({
          members: {$in: [req.params.userId]},
      })
      try {
         res.status(200).json(getConversation);
      } catch (error) {
          res.status(500).json(error)
      }
  })



module.exports = router;

