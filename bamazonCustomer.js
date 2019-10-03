//require mysql and inquirer packages
var mysql = require("mysql");
var inquirer = require("inquirer");


//connect to mysql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});


connection.connect(function (err) {
  if (err) throw err;
  displayItems();
});

var tableData = "Select * FROM products";


function displayItems() {
  //query database for products available.
  connection.query(tableData, function (err, results) {
    if (err) throw err;
    console.table(results);
    selectProduct(results);
  })
};

//Display all products for sale. Prompt user with message what ID of product they want.
function selectProduct(results) {
  var productChoices = [];
  for (var i = 0; i < results.length; i++) {
    productChoices.push(results[i].id + "  " + results[i].product_name + "  " + results[i].department_name + "  " + results[i].price);
  }
  inquirer
    .prompt([
      {
        name: "productName",
        type: "rawlist",
        choices: productChoices,
        message: "Which product would you like to purchase?"
      },
      {
        type: "input",
        name: "stock_quantity",
        message: "How many units of this item do you want to purchase?"
      },
    ])
    .then(function (answer) {
      if (productChoices < answer.stock_quantity){
        console.log(productChoices);
      //   console.log("yay");
      // } else {
      //   console.log("boo");
      }
      // answer = answer.productName;
      // chosenItem = results[i].stock_quantity;
      // console.log(chosenItem);
      // quantityPrompt();
    });
}

//Promt user with question of how many units they want?
// function quantityPrompt(chosenItem) {
//   inquirer
//     .prompt({
//         type: "input",
//         name: "stock_quantity",
//         message: "How many units of this item do you want to purchase?"
//       })
//     .then(function (answer) {
//       //console.log(answer.stock_quantity);
//       console.log(chosenItem);
      
      
      
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