<h1 align="center">Villo-Backend</h1>
<p align="center">Backend for an open source convesation app.</p>
<p align="center"><a href="https://github.com/vmnog/villo-frontend">Frontend da Aplicação</a></p>

## Backend

<ul>
<li>Cors</li>
<li>Helmet</li>
<li>Express</li>
<li>Pg</li>
<li>JWT</li> 
<li>DotEnv</li>
<li>Multer</li>
<li>Sequelize</li>
</ul>

<h2>Insomnia</h2>
<br>

<strong>Register</strong>
<img src="https://github.com/martins20/Villo-Backend/blob/newMaster/assets/Register.gif" alt="Register">

<strong>Login</strong>
<img src="https://github.com/martins20/Villo-Backend/blob/newMaster/assets/Login.gif" alt="Login">

<strong>Profile</strong>
<img src="https://github.com/martins20/Villo-Backend/blob/newMaster/assets/Profile.gif" alt="Profile">

<strong>Edit | Delete</strong>
<img src="https://github.com/martins20/Villo-Backend/blob/newMaster/assets/Edit|Delete.gif" alt="Edit|Delete">

<strong>Uploading a Photo</strong>
<img src="https://github.com/martins20/Villo-Backend/blob/newMaster/assets/CreatePhoto.gif" alt="CreatePhoto">

<strong>List of Friends</strong>
<img src="https://github.com/martins20/Villo-Backend/blob/newMaster/assets/FriendList.gif" alt="FriendList">

<strong>Create a Friend</strong>
<img src="https://github.com/martins20/Villo-Backend/blob/newMaster/assets/CreateFriend.gif" alt="CreateFriend">

<strong>Delete a Friend</strong>
<img src="https://github.com/martins20/Villo-Backend/blob/newMaster/assets/DeleteFriend.gif" alt="DeleteFriend">

<strong>List | Show a Conversation</strong>
<img src="https://github.com/martins20/Villo-Backend/blob/newMaster/assets/List|ShowConversation.gif" alt="List|Show Conversation">

<strong>Create a Conversation</strong>
<img src="https://github.com/martins20/Villo-Backend/blob/newMaster/assets/CreateConversation.gif" alt="CreateConversation">

<strong>Edit | Delete a Conversation </strong>
<img src="https://github.com/martins20/Villo-Backend/blob/newMaster/assets/Edit|DeleteConversation.gif" alt="Edit|Delete Conversatio">
## How to run

<b>Clone the project</b>

```
$ git clone https://github.com/martins20/Villo-Backend.git
```

<b>Install all dependencies</b>

```
$ yarn install or npm i
```

### Postgres Docker

<b>Start / Create your <a href="https://hub.docker.com/_/postgres">Docker Postgres</a> Container:</b>

```
$ docker run --name villo -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

<b>Run the server on villo folder</b>

```
$ yarn start

```

### Sequelize Postgres

<b>Run all migrations</b>

```
$ yarn sequelize db:migrate
```

### Insomnia

Import Insomnia settings from root folder.

### Postbird

Use postbird to display database
