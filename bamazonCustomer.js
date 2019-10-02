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

//Display all products for sale. Prompt user with two messages: 1. ID of the product. 2: How many units?
function selectProduct(results) {
  // connection.query(tableData, function(err, results){
  //   if (err) throw err;
  var productChoices = [];
  for (var i = 0; i < results.length; i++) {
    productChoices.push(results[i].product_name);
  }

  inquirer
    .prompt([
      {
        name: "productName",
        type: "rawlist",
        choices: productChoices,
        message: "What is the ID number of the product you wish to purchase?"
      }
    ])
    .then(function (answer) {
      var chosenItem = answer.productName;
      
      console.log("We chose: ", chosenItem);

      // How many do you want to purchase?
      //    Get quantity from database OR, since it's still in memory (above), look at that

      // User inputs a number

      // If number is less than or equal to quantity, subtract and update record
      // If not, tell them to do it again but better this time
    });
}

function quantityPrompt(qty) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "stock_quantity",
        message: "How many units of this item do you want to purchase?"
      }
    ])
    .then(function (answer) {
      if (answer.stock_quantity <= qty) {
        console.log("aa?");
      }
    });
}


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