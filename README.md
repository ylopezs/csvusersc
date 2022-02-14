# README

This is an example on how to use Ruby on Rails with Reactjs


* Ruby version
    2.5.9

* System requiriments
    * Docker-compose 1.29.2 or superior

* Installation
    * `docker-compse build`
    * it is necessary to migrate the database in the first ejecution
        * `docker-compose run web rake db:create`
        * `docker-compose run web rake db:migrate`

* Ejecution
    * `docker-compose up`
    * to run any rails instruction `docker-compose run web rails  ...`

* Working on the project
    * In case of you are using linux remember to run ` sudo chown -R $USER:$USER .` in order to change the ownership of new files

* How to run the test suite
    * `docker-compose run web rails  test`


