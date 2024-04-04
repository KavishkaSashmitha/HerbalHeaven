const express = require('express');
const Transport = require('../model/transports');

const router = express.Router();

//save posts

router.post('/transport/save',(req,res)=> {

    let newTransport  = new Transport(req.body);

    newTransport.save((err) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Driver saved successfully"
        });
    });

});

//get posts
router.get("/transports", (req, res) =>{
    Transport.find().exec((err, transports) =>{
      if(err){
        return res.status(400).json({
          error:err
        })
      }

      return res.status(200).json({
        success:true,
        existingTransports:transports
      })
    })
});


//get a specific post

router.get("/transport/:id",(req,res)=>{
    let transportId = req.params.id;

    Transport.findById(transportId,(err,transport) =>{
        if(err){
            return res.status(400).json({success:false,err})
        }

        return res.status(200).json({
            success:true,
            transport
        });
    });

});






//update post
router.put('/transport/update/:id',(req,res) => {
    Transport.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,transport) => {
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Update Successfully"
            });
        }
    );
});



//delete posts

router.delete('/transport/delete/:id',(req,res) =>{
    Transport.findByIdAndRemove(req.params.id).exec((err,deletedTransport)=>{
        if(err) return res.status(400).json({
            message:"Delete unsuccessfully",err
        });

        return res.json({
            message:"Delete Successfully",deletedTransport
        });
    });
});


module.exports = router;