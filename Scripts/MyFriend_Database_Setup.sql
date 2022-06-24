Create database MyFriends;

create table dbo.Users(
ID int identity(1,1),
UsersName nvarchar(500),
UsersSurname nvarchar(500),
UsersEmail nvarchar(500),
UsersPassword nvarchar(500),
CONSTRAINT PK PRIMARY KEY (ID)
);