# RentalApplication

# Backend Installation and Configurations:

Step 1:
 After git pull the project, create a virtual environment and activate it.

Step 2:
    pip install -r requirements.txt

Step 3:
    Create a database named : rental_app_db

Step 4:
    type these instructions in terminal:

    1. python manage.py makemigrations
    2. python manage.py migrate
    3. python manage.py loaddata products
    4. python manage.py runserver 0.0.0.0:8000



# Frontend Installation and Configurations:

Step 1:
 Git pull the project.

Step 2:
    npm install

Step 3:
    create a .env file inside RentalApplication/rental_frontend folder and copy the line inside .env.example file.

# Application Overview:

* Imported the initial data set into database(postgres) using fixtures.

* Product Application were written with CRUD Functionalities(User can Create/Edit/Delete and view details of any rental product available in database).

* User can search products from the list.

* User can see rent estimated charge for a product for a certain period.

* User can Book a Product. It will make a new entry inside data store.

* User can Return a Product by viewing his/her charge and after return confirmation, a new entry will be push with details from user end.
