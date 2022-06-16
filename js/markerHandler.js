var toyNumber = null;

AFRAME.registerComponent('markerhandler',{
 init: async function(){
    if(toyNumber = null){
        this.askToyNumber()
    }
    var toys = await this.getToys()

    this.el.addEventListener('markerfound',() => {
      this.toyId = this.el.id
      this.markerFound(toys,toyId);
    }) 

    this.el.addEventListener('markerLost',() => {
        this.markerLost();
    })
 },
 askToyNumber(){
    var icon = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWesqcjUw1GaaLTqFEzTsgmsZctftrRhM0J1lOPRHvAUTxm8xSDPQ88CgIQ2BKtzcDD9E&usqp=CAU'
    swal({
        title: 'Welcome to Toy shop',
        icon: icon,
        content:{
          element: 'input',
          attributes:{
            placeholder: 'Type Toy number here',
            type : 'number',
            min: 1
          }
        }
    }) 
 },
 markerFound: function(toys){
  if(toyNumber != null){
     var model = document.querySelector('#model-$(toys.id)')
     model.setAttribute('position',toys.model_geometry.position);
     model.setAttribute('rotation',toys.model_geometry.rotation);
     model.setAttribute('scale',toys.model_geometry.scale);
     model.setAttribute('visible',false);

     var buttonDiv = document.getElementById('button-div');
     buttonDiv.style.display = 'flex';

     var orderButton = document.getElementById('order-button');
     var summaryButton = document.getElementById('summary-button');

     orderButton.addEventListener('click',() =>{
        swal({
          icon : 'success',
          title: 'Successfully ordered',
          text: 'Your order will be delivered soon'
        })
     })

    summaryButton.addEventListener('click',()=>{
        swal({
          icon: 'warning',
          title: 'Summary',
        })

        this.orderSummary();
    })

  }
 },
 getToys: async function(){
   return await firebase
       .firestore()
       .collections('toys')
       .get()
       .then(snap =>{
        return snap.docs.map(docs => docs.data)
 })
 },
markerLost: function(){
  var buttonDiv = document.getElementById('button-div');
  buttonDiv.style.display = 'none';
}   
})