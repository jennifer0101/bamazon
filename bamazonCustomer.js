//require mysql and inquirer packages
var mysql = require("mysql");
var inquirer = require("inquirer");

//connect to mysql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "4c!37t/6FKOZ",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  displayTable();
});

var tableData = "Select * FROM products";

//display table
function displayTable() {
  //query database for products available.
  connection.query(tableData, function (err, results) {
    if (err) throw err;
    for (var i = 0; i < results.length; i++) {
      
    }
    console.table(results);
    selectProduct(results);
  });
}

//Prompt user with message what ID of product they want.
function selectProduct(results) {
  // connection.query(tableData, function (err, results) {
  //   if (err) throw err;
    inquirer
      .prompt(
        {
          name: "userId",
          type: "input",
          message: "Which product would you like to purchase?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        })
        
      .then(function (answer) {
        //var chosenId = answer.userId;
        var id = parseInt(answer.userId);
        var product = checkInventory(id, results);
        if (product){
          console.log(product);
          quantityPrompt(product);
        } else {
          //console.log(product);
          console.log("product does not exist")
        }
      }
        
      
  )}

  function checkInventory(id, results) {
    for (var i = 0; i < results.length; i++) {
      if (id === results[i].id) {
        return results[i];
      } 
    }
    return null;
  }
       
  
  //Promt user with question of how many units they want?
function quantityPrompt(product) {
  inquirer
    .prompt({
        type: "input",
        name: "stock_quantity",
        message: "How many units of this item do you want to purchase?"
      })
    .then(function (answer) {
      //console.log(answer.stock_quantity);
      //console.log(answer);
      var quantity = parseInt (answer.stock_quantity);
      if (quantity > product.stock_quantity){
        console.log("insufient quantity");
        displayTable();
      } else {
        finalizePurchase();
      }
    })
  }
             
    // for (var i = 0; i < results.length; i++) {
    //  if (chosenId === results[i].id){
    //   console.log (results[i].id + "  " + results[i].product_name + "  " + results[i].department_name + "  " + results[i].price);

    //  for (var i = 0; i < results.length; i++) {
    //   if (answer.userId === results[i].id){
    //     console.log (results[i].id + "  " + results[i].product_name + "  " + results[i].department_name + "  " + results[i].price);
    //    } else {
    //      console.log ("error yo")
    //    }
      
//   {
//     name: "userQuantity",
//     type: "input",
//     message: "How many of these items do you wish to purchase?",
//     validate: function(value) {
//       if (isNaN(value) === false) {
//         return true;
//       }
//       return false;
//     }
//   }
// )
    //var productChoices = answer.id; 
    //{
      // id: results[i].id,
      // product_name: results[i].product_name,
      // department_name: results[i].department_name,
      // price: results[i].price,
      // stock_quantity: results[i].stock_quantiy
    //}

      // {
      //   type: "input",
      //   name: "stock_quantity",
      //   message: "How many units of this item do you want to purchase?"
      // },

    // .then(function (answer) {
    //   console.log(answer)
    //   if (productChoices[productName].id < answer.stock_quantity){
    //     // console.log(productChoices);
    //     console.log("yay");
    //   } else {
    //     console.log("boo");
    //   }
    //   // answer = answer.productName;
    //   // chosenItem = results[i].stock_quantity;
    //   // console.log(chosenItem);
    //   // quantityPrompt();
    // });
//}



      //if (results.stock_quantity <= chosenItem.stock_quantity) {

    //   console.log("aa?");
    //   });

    // }

// How many do you want to purchase?
//    Get quantity from database OR, since it's still in memory (above), look at that

// User inputs a number

// If number is less than or equal to quantity, subtract and update record
// If not, tell them to do it again but better this time

// {
//   name: "quantity",
//   type: "input",
//   message: "How many of these items to you wish to purchase?"
// },

//Check if store has enough of product to meet customer request.
  //If not enough stock, log phrase "Insufficient quantity!" and prevent the order form going through.

//If there is enough in stock, fulfill customer oder by:
  //Updating SQL database to reflect the reamining quantity.
  //Once update goes through, show the customer the total cost of their purchase

  // var optionsChoice = {
      //   id: results[i].id,
      //   name: results[i].product_name,
      //   department: results[i].department_name,
      //   price: results[i].price,
      //   quantity: results[i].stock_quantity
      // }
      