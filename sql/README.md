# Mysql Tables
users
- id: unique | AI
- username
- firstname
- lastname
- email: unique

# Procedures

Parameters with underline text indicates that the rest are optional

## CREATE
- sp_userCreate (<i>username</i>, <i>firstname</i>, <i>lastname</i>, <i>email</i>)

## READ
- sp_usersRead (<i>index</i>, <i>limit</i>) -- Notice it's plural
- sp_usersReadDefault (<i>index</i>)
- sp_userRead (<i>index</i>, <i>limit</i>) -- Notice it's singular

## UPDATE
- sp_userUpdate (<i><u>id</u></i>, <i>username</i>, <i>firstname</i>, <i>lastname</i>, <i>email</i>)

## DELETE
- sp_userDelete (<i>id</i>)