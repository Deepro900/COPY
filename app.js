/*
function interview(job){
    return function(name){
        if (job=='designer'){
     console.log( name+',can you please explane ux design is ?');
        }
    
    else if( job =='teacher'){
           console.log('what subject do you teach'+ name+'?');
        }else{
            console.log('hello'+name+'what do you do?');
        }
    
}
}

    interview('designer')(' deep');
    interview('teacher')(' dep');


function budgetController(){
    var x =23;
 var add = function(a){
     return x + a;

 }
  return function(b){
          console.log(add('b'));
      }
  }

 budgetController('b')('b') ;              
 */
// global app controller
//var budgetController = (function(){

//var setupEventListeners = function (){

//   document.addEventListener('keypress',function(event){
//    if(event.keyCode===13 || event.which===13){
//     ctrlAddItem();

// };

//})();

// Budget controller

var budgetController = (function() {

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;


    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;


    };

    var data = {
        allIteams: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0

        }


    };
    return {
        addItem: function(type, des, val) {
            var newItem, ID, length;

            //create new ID
            if (data.allIteams[type].length > 0) {
                ID = data.allIteams[type][data.allIteams[type].length - 1].id + 1;
            } else {
                ID = 0;
            }


            // Creat new Item based on 'inc' or 'exp'

            ID = data.allIteams[type]
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);

            }
            //Push it into data structure
            data.allIteams[type].push(newItem);
            // return the new element

            return newItem;


        },

        testing: function() {
            console.log(data);
        }


    };



})();


// UI controller

var UIController = (function() {
    var DomString = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'


    };
    return {
        getInput: function() {
            return {
                type: document.querySelector(DomString.inputType).Value, //will be either inc or exp
                description: document.querySelector(DomString.inputDescription).value,
                value: document.querySelector(DomString.inputValue).value

            };
        },



        getDOMstring: function() {
            return DomString;

        }
    };



})();



// global APP controller
var controller = (function(budgetCtrl, UICtrl) {

    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstring();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();


            }
        });
    };



    var ctrlAddItem = function() {
        // 1.get the field input data
        var input, newItem;

        input = UICtrl.getInput();
        console.log(input);

        //  2. Add the item to the budget controller
        newItem = budgetController.addItem(input.type, input.description, input.value);
        //3. Add the item to the UI
        // 4. calculate the budget 
        // 5. Display the budget on the UI




    };

    return {
        init: function() {

            console.log('Application has started.');
            setupEventListeners();

        }
    };


})(budgetController, UIController);

controller.init();