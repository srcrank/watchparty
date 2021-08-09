--DROP DATABASE [ IF EXISTS ] { database_name | database_snapshot_name } [ ,...n ] [;]
IF EXISTS (
        SELECT [name]
FROM sys.databases
WHERE [name] = N'WatchParty'
        )
BEGIN
    -- Delete Database Backup and Restore History from MSDB System Database
    EXEC msdb.dbo.sp_delete_database_backuphistory @database_name = N'WatchParty'
​
    -- GO
    -- Close Connections
    USE [master]
​
    -- GO
    ALTER DATABASE [WatchParty]
​
    SET SINGLE_USER
    WITH
​
    ROLLBACK IMMEDIATE
​
    -- GO
    -- Drop Database in SQL Server
    DROP DATABASE [WatchParty]
-- GO
END
​
-- Create a new database called 'WatchParty'
-- Connect to the 'master' database to run this snippet
USE master
GO
​
-- Create the new database if it does not exist already
IF NOT EXISTS (
        SELECT [name]
FROM sys.databases
WHERE [name] = N'WatchParty'
        )
    CREATE DATABASE WatchParty
GO
​
USE WatchParty
GO
​
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/dXpzUB
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.
SET XACT_ABORT ON
​
BEGIN TRANSACTION WP_CREATE
​
CREATE TABLE [UserProfile]
(
    [Id] INT IDENTITY(1,1) NOT NULL ,
    [FirstName] NVARCHAR(255) NOT NULL ,
    [LastName] NVARCHAR(255) NOT NULL ,
    [DisplayName] NVARCHAR(255) NOT NULL ,
    [Email] NVARCHAR(255) NOT NULL ,
    [FireBaseUserId] NVARCHAR(255) NOT NULL ,
    CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED (
        [Id] ASC
    )
)
​
CREATE TABLE [Event]
(
    [Id] INT IDENTITY(1,1) NOT NULL ,
    [IMDBId] NVARCHAR (255) NOT NULL ,
    [EventDate] DATETIME NOT NULL ,
    [CreatedDate] DATETIME DEFAULT(getdate()) NOT NULL ,
    [UserId] INT NOT NULL ,
    [EventTitle] NVARCHAR(255) NOT NULL ,
    [Summary] NVARCHAR(255) NOT NULL ,
    [MediaTitle] NVARCHAR(255) NOT NULL ,
    [PosterUrl] NVARCHAR(255) NOT NULL,
    [ReleaseYear] INT NOT NULL,
    [IMDBUrl] NVARCHAR(255) NOT  NULL,
    [StreamUrl] NVARCHAR(255) NOT NULL,
    [OverView] NVARCHAR(1024) NOT NULL,
    CONSTRAINT [PK_Event] PRIMARY KEY CLUSTERED (
        [Id] ASC
    )
)
​
CREATE TABLE [Friend]
(
    [Id] INT IDENTITY(1,1) NOT NULL ,
    [UserA] INT NOT NULL ,
    [UserB] INT NOT NULL ,
    CONSTRAINT [PK_Friend] PRIMARY KEY CLUSTERED (
        [Id] ASC
    )
)
​
CREATE TABLE [UserEvent]
(
    [Id] INT IDENTITY(1,1) NOT NULL ,
    [EventId] INT NOT NULL ,
    [UserId] INT NOT NULL ,
    CONSTRAINT [PK_UserEvent] PRIMARY KEY CLUSTERED (
        [Id] ASC
    )
)
​
ALTER TABLE [Event] WITH CHECK ADD CONSTRAINT [FK_Event_UserId] FOREIGN KEY([UserId])
REFERENCES [UserProfile] ([Id])
​
ALTER TABLE [Event] CHECK CONSTRAINT [FK_Event_UserId]
​
ALTER TABLE [Friend] WITH CHECK ADD CONSTRAINT [FK_Friend_UserA] FOREIGN KEY([UserA])
REFERENCES [UserProfile] ([Id])
​
ALTER TABLE [Friend] CHECK CONSTRAINT [FK_Friend_UserA]
​
ALTER TABLE [Friend] WITH CHECK ADD CONSTRAINT [FK_Friend_UserB] FOREIGN KEY([UserB])
REFERENCES [UserProfile] ([Id])
​
ALTER TABLE [Friend] CHECK CONSTRAINT [FK_Friend_UserB]
​
ALTER TABLE [UserEvent] WITH CHECK ADD CONSTRAINT [FK_UserEvent_EventId] FOREIGN KEY([EventId])
REFERENCES [Event] ([Id])
​
ALTER TABLE [UserEvent] CHECK CONSTRAINT [FK_UserEvent_EventId]
​
ALTER TABLE [UserEvent] WITH CHECK ADD CONSTRAINT [FK_UserEvent_UserId] FOREIGN KEY([UserId])
REFERENCES [UserProfile] ([Id])
​
ALTER TABLE [UserEvent] CHECK CONSTRAINT [FK_UserEvent_UserId]
​
COMMIT TRANSACTION WP_CREATE
​
​
USE [master]
 GO
​
ALTER DATABASE [WatchParty]
​
 SET READ_WRITE
 GO
​
BEGIN TRANSACTION WP_SEED
​
-- USERS
BEGIN
    USE [WatchParty]
​
    INSERT INTO [dbo].[UserProfile]
        (FirstName, LastName, DisplayName, Email, FireBaseUserId)
    VALUES
        ('Mariano', 'Halvorson', 'DellaR', 'cprosacco@x.net', 'OmThFtb2tieSm0EqnNBy9J37B972');
​
    INSERT INTO [dbo].[UserProfile]
        (FirstName, LastName, DisplayName, Email, FireBaseUserId)
    VALUES
        ('Krystina', 'Kuvalis', 'CoriH', 'dzboncak@x.com', 'Q8GcpCzk6QTZeG2njIk8fM1B5zs2');
​
    INSERT INTO [dbo].[UserProfile]
        (FirstName, LastName, DisplayName, Email, FireBaseUserId)
    VALUES
        ('Chauncey', 'Borer', 'BCAwesome', 'stiedemann.constantin@x.com', 'hd0IIpDxmKZA6IffAWsvyA8RYRd2');
​
    INSERT INTO [dbo].[UserProfile]
        (FirstName, LastName, DisplayName, Email, FireBaseUserId)
    VALUES
        ('Mariam', 'McClure', 'Mari235', 'waelchi.jacky@x.com', 'mzqefy03YUW3qVUqmLDGffh4pXu1');
​
    INSERT INTO [dbo].[UserProfile]
        (FirstName, LastName, DisplayName, Email, FireBaseUserId)
    VALUES
        ('Jermain', 'Miller', 'repellat', 'test@x.com', 'VqiGMvZ2PlgSeAhlQSwUdutr6Or1');

    INSERT INTO [dbo].[UserProfile]
        (FirstName, LastName, DisplayName, Email, FireBaseUserId)
    VALUES
        ('Salma', 'Crank', 'Sal98', 'salma@test.com', 'ugJ9ZHMYjVM7wUYTggMkpedkYQl1');
​
END
​
-- -- Event
BEGIN
    USE [WatchParty]
​
    INSERT INTO [dbo].[Event]
        (IMDBId, EventDate, CreatedDate, UserId, EventTitle, Summary, MediaTitle, PosterUrl, ReleaseYear,IMDBUrl, StreamUrl, OverView)
    VALUES
        ('tt10676012', '8-13-2021 7:23:00 AM', '8/3/2021 9:05:54 PM', '1', 'Rom Com Night!', 'Im in the mood for a cheesy movie!', 'To All the Boys: Always and Forever', 'https://image.tmdb.org/t/p/w780/zdkJs9j6yKo9di0kjtctM01fSMv.jpg', '2021', 'https://www.imdb.com/title/tt10676012', 'https://www.netflix.com/title/81040397/', 'Senior year of high school takes center stage as Lara Jean returns from a family trip to Korea and considers her college plans — with and without Peter.');
​
    INSERT INTO [dbo].[Event]
        (IMDBId, EventDate, CreatedDate, UserId, EventTitle, Summary, MediaTitle, PosterUrl, ReleaseYear, IMDBUrl, StreamUrl, OverView)
    VALUES
        ('tt0250494','8-10-2021 8:30:00 PM', '8/6/2021 5:29:42 AM', '2', 'Love this movie!', 'Legally Blonde is the best!', 'Legally Blonde', 'https://image.tmdb.org/t/p/w780/4ABNnmkVpzplrEVQWt1piITT0Ey.jpg', '2001', 'https://www.imdb.com/title/tt0250494', 'https://www.netflix.com/title/60021025/', 'Elle Woods has it all. Shes the president of her sorority, a Hawaiian Tropic girl, Miss June in her campus calendar, and, above all, a natural blonde. She dates the cutest fraternity boy on campus and wants nothing more than to be Mrs. Warner Huntington III. But, theres just one thing stopping Warner from popping the question: Elle is too blonde.');
​
    INSERT INTO [dbo].[Event]
        (IMDBId, EventDate, CreatedDate, UserId, EventTitle, Summary, MediaTitle, PosterUrl, ReleaseYear, IMDBUrl, StreamUrl, OverView)
    VALUES
        ('tt0091042','2021-09-01 19:00:00', '2021-08-11 19:00:00', '3', 'Ferris is the best', 'lets play hooky!', 'Ferris Bueller''s Day Off', 'https://image.tmdb.org/t/p/w780/9LTQNCvoLsKXP0LtaKAaYVtRaQL.jpg', '1986', 'https://www.imdb.com/title/tt0091042', 'https://www.netflix.com/title/498716/', 'After high school slacker Ferris Bueller successfully fakes an illness in order to skip school for the day, he goes on a series of adventures throughout Chicago with his girlfriend Sloane and best friend Cameron, all the while trying to outwit his wily school principal and fed-up sister.');
​
    INSERT INTO [dbo].[Event]
        (IMDBId, EventDate, CreatedDate, UserId, EventTitle, Summary, MediaTitle, PosterUrl, ReleaseYear, IMDBUrl, StreamUrl, OverView)
    VALUES
        ('tt0446029','2021-09-01 19:00:00', '2021-09-01 19:00:00', '4', 'Seven Evil Exes', 'The perfect breakup movie.', 'Scott Pilgrim vs. the World', 'https://image.tmdb.org/t/p/w780/g5IoYeudx9XBEfwNL0fHvSckLBz.jpg', '2010', 'https://www.imdb.com/title/tt0446029', 'https://www.netflix.com/title/70117312/', 'As bass guitarist for a garage-rock band, Scott Pilgrim has never had trouble getting a girlfriend; usually, the problem is getting rid of them. But when Ramona Flowers skates into his heart, he finds she has the most troublesome baggage of all: an army of ex-boyfriends who will stop at nothing to eliminate him from her list of suitors.');
​
    INSERT INTO [dbo].[Event]
        (IMDBId, EventDate, CreatedDate, UserId, EventTitle, Summary, MediaTitle, PosterUrl, ReleaseYear, IMDBUrl, StreamUrl, OverView)
    VALUES
        ('tt1375666','2021-09-01 19:00:00', '2021-09-01 19:00:00', '6', 'and it was all a dream....', 'or was it??', 'Inception', 'https://image.tmdb.org/t/p/w780/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg', '2010', 'https://www.imdb.com/title/tt1375666', 'https://www.netflix.com/title/70131314/', 'Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: "inception", the implantation of another person''s idea into a target''s subconscious.');

    INSERT INTO [dbo].[Event]
        (IMDBId, EventDate, CreatedDate, UserId, EventTitle, Summary, MediaTitle, PosterUrl, ReleaseYear, IMDBUrl, StreamUrl, OverView)
    VALUES
        ('tt0829482','2021-09-01 19:00:00', '2021-08-11 19:00:00', '4', 'McLovin''s the Name', 'McLovin''s the game', 'Superbad', 'https://image.tmdb.org/t/p/w780/ek8e8txUyUwd2BNqj6lFEerJfbq.jpg', '2007', 'https://www.imdb.com/title/tt0829482', 'https://www.netflix.com/title/70058023/', 'Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.');
   
   INSERT INTO [dbo].[Event]
        (IMDBId, EventDate, CreatedDate, UserId, EventTitle, Summary, MediaTitle, PosterUrl, ReleaseYear, IMDBUrl, StreamUrl, OverView)
    VALUES
        ('tt4925292','2021-09-01 19:00:00', '2021-08-13 19:00:00', '6', 'Such a good movie!', 'Does anyone else want to watch it?', 'Lady Bird', 'https://image.tmdb.org/t/p/w780/iySFtKLrWvVzXzlFj7x1zalxi5G.jpg', '2017', 'https://www.imdb.com/title/tt4925292', 'https://www.netflix.com/title/80205227/', 'Lady Bird McPherson, a strong willed, deeply opinionated, artistic 17 year old comes of age in Sacramento. Her relationship with her mother and her upbringing are questioned and tested as she plans to head off to college.');

    INSERT INTO [dbo].[Event]
        (IMDBId, EventDate, CreatedDate, UserId, EventTitle, Summary, MediaTitle, PosterUrl, ReleaseYear, IMDBUrl, StreamUrl, OverView)
    VALUES
        ('tt0087538','2021-09-01 19:00:00', '2021-09-01 19:00:00', '4', 'wax on, wax off', 'Maybe I can learn a few life lessons too?', 'The Karate Kid', 'https://image.tmdb.org/t/p/w780/kpDjt9N52zUZYMqe7TCCn04DZvp.jpg', '1984', 'https://www.imdb.com/title/tt0087538', 'https://www.netflix.com/title/60036164/', 'After some violent confrontations with his new classmates, Daniel LaRusso learns karate from Japanese handyman Mr. Miyagi, in order to defend himself.');
​
END
​
-- -- Friend
BEGIN
    USE [WatchParty]
​
    INSERT INTO [dbo].[Friend]
        (UserA, UserB)
    VALUES
        (1, 2);
​
    INSERT INTO [dbo].[Friend]
        (UserA, UserB)
    VALUES
        (2, 1);
​
    INSERT INTO [dbo].[Friend]
        (UserA, UserB)
    VALUES
        (3, 4);
​
    INSERT INTO [dbo].[Friend]
        (UserA, UserB)
    VALUES
        (3, 5);
​
    INSERT INTO [dbo].[Friend]
        (UserA, UserB)
    VALUES
        (4, 5);
​
    INSERT INTO [dbo].[Friend]
        (UserA, UserB)
    VALUES
        (5, 1);
​
END
​
-- -- UserEvent
BEGIN
    USE [WatchParty]
​
    INSERT INTO [dbo].[UserEvent]
        (UserId, EventId)
    VALUES
        (1, 2);
​
    INSERT INTO [dbo].[UserEvent]
        (UserId, EventId)
    VALUES
        (1, 5);
​
    INSERT INTO [dbo].[UserEvent]
        (UserId, EventId)
    VALUES
        (2, 1);
​
    INSERT INTO [dbo].[UserEvent]
        (UserId, EventId)
    VALUES
        (3, 4);
​
    INSERT INTO [dbo].[UserEvent]
        (UserId, EventId)
    VALUES
        (5, 3);
​
END
​
COMMIT TRANSACTION WP_SEED



