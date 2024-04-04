const express = require('express');
const Orders = require('../models/orders');

const router = express.Router();

//save posts

router.post('/order/save',(req,res)=> {

    let newOrder  = new Orders(req.body);

    newOrder.save((err) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Order saved successfully"
        });
    });

});

//get posts

router.get("/orders", (req, res) =>{
    Orders.find().exec((err, orders) =>{
      if(err){
        return res.status(400).json({
          error:err
        })
      }
      return res.status(200).json({
        success:true,
        existingOrders:orders
      })
    })
});

//get a specific post

router.get("/order/:id",(req,res) =>{
    let orderId = req.params.id;

    Orders.findById(orderId,(err,order) =>{
    if(err){
        return res.status(400).json({success:false,err})
    }

    return res.status(200).json({
        success:true,
        order
    });
    });

});



//update posts

router.put('/order/update/:id',(req,res)=>{
    Orders.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,order)=>{
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Updated Succesfully"
            });
        }
    );
});

//delete post

router.delete('/order/delete/:id',(req,res) =>{
    Orders.findByIdAndRemove(req.params.id).exec((err,deletedOrder) =>{

        if(err) return res.status(400).json({
            message:"Delete unsuccesfull",err
        });

        return res.json({
            message:"Delete succesfull",deletedOrder
        });
    });
});

module.exports = router;


 