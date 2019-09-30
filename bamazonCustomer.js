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


connection.connect(function(err) {
    if (err) throw err;
    displayItems();
});

var tableData = "Select * FROM products";


function displayItems() {
  //query database for products available.
  connection.query(tableData, function (err, results){
    if (err) throw err;
    for (var i = 0; i < results.length; i++) {
      console.log("Product Id: " + results[i].id + "   Product Name: " + results[i].product_name + "       Department: " + results[i].department_name + "       Price: " + results[i].price );
    }
    selectProduct();
  })
};

function selectProduct() {
  connection.query(tableData, function(err, results){
    if (err) throw err;
  inquirer
  .prompt(
    {
      name: "id",
      type: "rawlist",
      choices: function() {
        var productChoices = [];
        for (var i = 0; i < results.length; i++) {
          productChoices.push(results[i].id);
        }
        return productChoices;
      },
      message: "What is the ID number of the product you wish to purchase?"
    //},
    // {
    //   name: "quantity",
    //   type: "input",
    //   message: "How many of these items to you wish to purchase?"
    // },
  //])
})
}

  // }

    //Display all products for sale. Prompt user with two messages: 1. ID of the product. 2: How many units?
    //prompt user for which they'd like to purchase.
    



  

//Check if store has enough of product to meet customer request.
  //If not enough stock, log phrase "Insufficient quantity!" and prevent the order form going through.

//If there is enough in stock, fulfill customer oder by:
  //Updating SQL database to reflect the reamining quantity.
  //Once update goes through, show the customer the total cost of their purchase