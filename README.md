# badyet
badyet is also know as budget. badyet is an app that tracks expenses and income.
This app is created using node, express, mysql, and vanila js. This app will be written
90% pure vanila js.

-Multiple Page Application

-Model View Controller (MVC) architecture

-front-end: ejs/bootstrap

-user
    -authentication
    -authoration
-budget class
    -delete
    -save
    -update
    -add
-user class

- User 
    - username, email, password(salt, hash)
    - Has prefilled group items
- Budget Item
    -Adding Item
        - Expense or Income (Transaction) 
        - Amount
        - Date
        - Where did money come from? (text: optional)
        - Choose which Budget item(s) 
            -Drop Down Options (from budget items) to add the expense or income
- Budget Container Group 
    - Title <Food>
    - planned (to budyet or save) editable
    - received (for Paycheck)
    - Remaining (Spent - planned)
    - Spent (total: expense)
    - Budget Items 

-To Fix
    -Planned(4,2) need to increase               