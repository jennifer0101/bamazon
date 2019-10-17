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
          console.table(product);
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
         