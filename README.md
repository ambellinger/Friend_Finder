# FriendFinder
FriendFinder helps you find a new friend. Answer a set of questions from a range of strongly disagree to strongly agree, you can match with some of the cutest, cuddlest pet friends. Once you finish answering, you are also added to the friend database so someone can match with you!

## Technologies Used
* Javascript
* Bootstrap
* node.JS
* ArraySort (NPM install)
* path (NPM install)
* express (NPM install)


## Outside APIs Used
* none

## Prerequisites
* NPM install (See Tech Used section above)

## How Does It Work?

You land first on the home page.
![homepage](/images/friendfinderhomepage.PNG)

After answering a series of questions...
![questions](/images/surveyquestions.PNG)

You are matched with a friend
![match](/images/surveymatch.PNG)

You are then added to the friends api
![api](/images/friendsapi.PNG)









The first thing is to write your questions!

```
                         <h4>Questions 1</h4>
                        <label for="question1">Would you say you like to cuddle a lot?</label>
                        <select id="question1" class="form-control">
                            <option selected>Select an Option</option>
                            <option value="1">1 - Strongly Disagree</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5 - Strongly Agree</option>
                        </select>

```



The application needs not only a set of pre-entered friends but a place to add friends as they get entered into the temporary database.

An array of objects must be created with the properties that need to be filled out, the name of the friend, their photo, and their answers (scores) to the questions.

``` 
var friends = [
    {
        "name": "Koko",
        "photo": "https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/17353601_214071042406729_6225125509036451616_n.jpg?_nc_cat=100&_nc_ht=scontent-ort2-1.xx&oh=b0a63f8efeadceb3f9ddc54eeeb28228&oe=5CBE7748",
        "scores": [
            5,
            5,
            2,
            5,
            2,
            2,
            3,
            1,
            1,
            4
        ]

    },

module.exports = friends;

```



The user is then presented with the products available in the database

``` 
 connection.query("SELECT * FROM products", function (err, result, fields) {
    if (err) throw err;
    //console.log(result);
    console.table(result);
```
### Beginning the Program

![beginning-program](/images/bamazon_beginning_program.PNG)


Inquirer (NPM) is then used to save the user's input. 

```
 inquirer
      .prompt([
        {
          name: "choice",
          message: "What is the ID of the item you would like to purchase? [Quit with Q]",
          type: "input"
        },
        {
          name: "quantity",
          type: "input",
          message: "How many would you like? [Quit with Q]"
        }
      ])

```

The program then saves these choices and then compares their answers to the information stored in the database. 

```
.then(function (answer) {

        //For loop
        for (var i = 0; i < result.length; i++) {
          if (result[i].item_id === parseInt(answer.choice)) {
            chosenProduct = result[i];
            console.log("This is the result:" + chosenProduct);
          }
        };

```

The price is calculated by multiplying the amount given by the user and the price saved in the database.

```
 var total = chosenAmount * chosenProduct.price;
 console.log("Your total is: $" + total);
```

The database is then updated with the new amounts

```
    connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: newStock
              },
              {
                item_id: chosenId
              }
            ],
            function (error) {
              if (error) throw err;
              console.log("Stock quantity changed");
              start();
            }
          )
```

### Purchasing

![purchasing-1-object](/images/bamazon_purchasing1.PNG)

### Purchasing multiple

![purchasing-multiple-objects](/images/bamazon_purchasing2.PNG)

If the amount that is chosen by the user, exceeds that of the amount in the database, the program alerts the user and the programs restarts.

```
if (chosenAmount > chosenProduct.stock_quantity) {
          console.log("Insufficient Quantity");
          start();
```

### Insufficient Quantity

![insufficient-quantity](/images/bamazon_insufficent_quantity.PNG)


The user can exit the program by selecting the letter q.

### Quitting

![quiting](/images/bamazon_quiting_program.PNG)

## Challenges and Future Improvements
Creating and populating the database using mySQL was rather easy. However, the application became harder to develop once the user's input had to be compared with the information stored within the database. 

As of right now, there are bugs remaning in the exiting of the application. Q must be selected in the first prompt; if an item is selected but then the user tries to exit on the second prompt, an error is thrown. In addition, what functionality the app has to exit is a bit awkward and could use some fine tuning. 

## Acknowlegments 
I want to recognize Phil's contribution to the exiting portion of the application. 