# accessGatewayManager

# Technologies necessary:
jdk 1.8+
gradle
node
angular cli 2+
postgres 
docker ( you can skip postgres and create a postgres container with docker)

## Description
Ideea principala a aplicatiei este sa demonstreze ca accesul intr-o cladire se poate face prin intermediul scanarii
unui QR Code. Fiecare utilizator va primi un cont de authentificare, iar acesta are dreptul sa intre pe anumite
usi/porti. Odata ce utilizatorul ajunge in fata unei usi pe care doreste sa o deschida, acesta va scana QR code-ul
usii respective, cu ajutorul aplitatiei web, si va afla daca are acces sau nu la intrarea in incaperea corespunzatoare
usii respective. De asemenea aplicatia inregistreaza timpul la care utilizatorul scaneaza usa principala. Momentul 
de timp inregistrat poate fi vizualizat pentru ziua curenta, iar pentru momentele de timp inregistrate pe intreaga durata
a ultimei luni este pus la dispozitie un grafic, acesta prezentand numarul de ore lucrat in fiecare zi.

# How to start the app:

## For backend:
-open the accessGatewayManagerBackend as a gradle project using an ide( preferably Intellij) and import all used dependencies
-then create the db(with docker or with postgres, i'll show you the option with docker)
-using docker create a container wich contains a postgres image

## Docker commands:(it will expose a docker server on 32768 server and it will create a database with agm name)
```sh
docker run --name agmdb -p 5432:32768 -d postgres
docker container update --restart=always agmdb
docker exec -it agmdb psql --username postgres -c "CREATE DATABASE agm OWNER postgres;"
docker exec -it agmdb psql --username postgres -c "GRANT ALL PRIVILEGES ON DATABASE agm TO postgres;"
```
-then just run the ```sh AccessGatewayManagerApplication class ``` and the backend api will be available
-the tables for db are created using JPA + HIBERNATE
-insert data in db to have an valid account (accessGatewayManagerApp\postgresdb\insert.sql)

## For frontend:
-after installing ```sh node and angular cli 2+ ``` go in the accessGatewayManagerApp\accessGatewayManager and run the command ```sh nmp install ```
 to get all dependencies for frontend
-then, to start the frontend side, run ```sh ng serve or ./node_modules/.bin/ng serve ``` 

# Application components Diagrams

## The component diagram of application contains Frontend component, Backend Component, Database component and Rasbery PI component and comunication between them:

****
****
****

## Communication between Frontend and Backend ( The comunication between fronend and backend is made through REST api interfaces):

****
****
****

## Sequence Diagram for Login and Access:

****

## Use case diagram:

****

## Database entities and ER diagram:

****

## The Application:

...
