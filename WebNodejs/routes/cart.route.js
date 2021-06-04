const express = require('express');
const controller = require('../Controllers/courseController');

const router = express.Router();


router.get('/',(req,res,next)=>{
   const cart = req.session.cart;
    res.locals.cart = cart.getCart();
  
   res.render('cart',{banner: 'My Cart'});

})

// add course to cart
router.post('/',(req,res,next)=>{
    var courseId = req.body.id; 
    var quantity = isNaN(req.body.quantity) ? 1: req.body.quantity;
    
    var cart = req.session.cart;
   
   var check = cart.getCartItem(courseId);

   
    if(check.item)
    {
        res.json(null);
    }
    else
    {
        var courseController = require('../Controllers/courseController');
        courseController.getById(courseId).then(course=>{
            
            var cartItem = req.session.cart.add(course[0], courseId, quantity);
            
            res.json(cartItem);
    
        })
        .catch(error =>console.log(error));
    }
})
   

router.put('/', (req,res)=>{
    var courseId = req.body.id;
    var cartItem = req.session.cart.update(courseId,0);
    res.json(cartItem);
});

router.delete('/',(req,res)=>{
    var courseId = req.body.id;
    req.session.cart.remove(courseId);
    res.json({
        totalQuantity: req.session.cart.totalQuantity,
        totalPrice: req.session.cart.totalPrice
    });
}); 
module.exports = router;