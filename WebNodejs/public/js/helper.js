// $(document).ready(()=>{
//     $('.add-to-cart').on('click',addToCart);
// })

// function addToCart(){
//     var id = $(this).data('id');
//     console.log(id);
//     var quantity = 1;
//     $.ajax({
//         url: '/cart',
//         type: 'POST',
//         data: {id, quantity},
//         succes: function(result){
//             $('#cart-badge').html(result.totalQuantity);
//         }
//     })
// }