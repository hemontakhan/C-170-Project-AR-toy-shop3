AFRAME.registerComponent('shop-buttons',{
 init: function(){
    var button1 = document.createElement('button');
    button1.innerHTML = 'ORDER NOW';
    button1.setAttribute('id','order-button');
    button1.setAttribute('class','btn btn-warning mr-3');

    var button2 = document.createElement('button');
    button2.innerHTML = 'ORDER SUMMARY';
    button2.setAttribute('id','summary-button');
    button2.setAttribute('class','btn btn-warning mr-3');

    var buttonDiv = document.getElementById('#button-div');
    buttonDiv.appendchild(button1);
    buttonDiv.appendChild(button2);
 }
})