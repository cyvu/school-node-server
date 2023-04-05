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
- <code>sp_userCreate</code> (<i>username</i>, <i>firstname</i>, <i>lastname</i>, <i>email</i>)

## READ
- <code>sp_usersRead</code> (<i>index</i>, <i>limit</i>) -- Notice it's plural
- <code>sp_usersReadDefault</code> (<i>index</i>)
- <code>sp_userRead</code> (<i>index</i>, <i>limit</i>) -- Notice it's singular

## UPDATE
- <code>sp_userUpdate</code> (<i><u>id</u></i>, <i>username</i>, <i>firstname</i>, <i>lastname</i>, <i>email</i>)

## DELETE
- <code>sp_userDelete</code> (<i>id</i>)