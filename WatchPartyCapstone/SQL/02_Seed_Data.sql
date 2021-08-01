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
    [CreatedDate] DATETIME NOT NULL ,
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
        ('Mariano', 'Halvorson', 'quaerat', 'cprosacco@ebert.net', '74a75574-deb7-398d-b8c4-5d17d6fbd0a4');
​
    INSERT INTO [dbo].[UserProfile]
        (FirstName, LastName, DisplayName, Email, FireBaseUserId)
    VALUES
        ('Krystina', 'Kuvalis', 'assumenda', 'dzboncak@yahoo.com', '15daebec-5158-35aa-ac44-1be0d66f848e');
​
    INSERT INTO [dbo].[UserProfile]
        (FirstName, LastName, DisplayName, Email, FireBaseUserId)
    VALUES
        ('Chauncey', 'Borer', 'eum', 'stiedemann.constantin@gmail.com', '8779d568-f888-3c6a-8077-b2448cbfac1d');
​
    INSERT INTO [dbo].[UserProfile]
        (FirstName, LastName, DisplayName, Email, FireBaseUserId)
    VALUES
        ('Mariam', 'McClure', 'quam', 'waelchi.jacky@hotmail.com', '3f92e79f-080f-3872-bad1-340d4a72afc2');
​
    INSERT INTO [dbo].[UserProfile]
        (FirstName, LastName, DisplayName, Email, FireBaseUserId)
    VALUES
        ('Jermain', 'Miller', 'repellat', 'dean09@yahoo.com', 'b3ef8174-9707-3b83-85c7-7df10bd88f50');
​
END
​
-- -- Event
BEGIN
    USE [WatchParty]
​
    INSERT INTO [dbo].[Event]
        (IMDBId, EventDate, CreatedDate, UserId, EventTitle, Summary, IsPublic, MediaTitle, PosterUrl, ReleaseYear,IMDBUrl, StreamUrl, OverView)
    VALUES
        ('tt5638642', '2021-09-01 19:00:00', '2021-07-25 07:07:00', '1', 'Chucky in da house', 'Let''s watch chucky Get Married', '0', 'Bride of Chucky', 'https://image.tmdb.org/t/p/w780/mAGviFp1ufYM3EaZBSrjPiKPBt6.jpg', '1998', 'https://www.imdb.com/title/tt0144120', 'https://www.netflix.com/title/17670193/', 'Chucky hooks up with another murderous doll, the bridal gown-clad Tiffany, for a Route 66 murder spree with their unwitting hosts.');
​
    INSERT INTO [dbo].[Event]
        (IMDBId, EventDate, CreatedDate, UserId, EventTitle, Summary, IsPublic, MediaTitle, PosterUrl, ReleaseYear, IMDBUrl, StreamUrl, OverView)
    VALUES
        ('tt5638642','2021-09-01 19:00:00', '2021-09-01 19:00:00', '2', 'Knowing is half the battle', 'It''s a fak movie with a fake summary', 0, 'G.I. Joe: The Rise of Cobra', 'https://image.tmdb.org/t/p/w780/mc9b25IAprHfsaOz0wTshOwGHcY.jpg', '2009', 'https://www.imdb.com/title/tt1046173', 'https://www.netflix.com/title/70108987/', 'From the Egyptian desert to deep below the polar ice caps, the elite G.I. JOE team uses the latest in next-generation spy and military equipment to fight the corrupt arms dealer Destro and the growing threat of the mysterious Cobra organization to prevent them from plunging the world into chaos.');
​
    INSERT INTO [dbo].[Event]
        (IMDBId, EventDate, CreatedDate, UserId, EventTitle, Summary, IsPublic, MediaTitle, PosterUrl, ReleaseYear, IMDBUrl, StreamUrl, OverView)
    VALUES
        ('tt5638642','2021-09-01 19:00:00', '2021-09-01 19:00:00', '3', 'What else is there to say?  It''s Thor', 'Some fake summary here', '', 'Thor: Ragnarok', 'https://image.tmdb.org/t/p/w780/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg', '2017', 'https://www.imdb.com/title/tt3501632', 'https://www.disneyplus.com/movies/-/ZHk7aM5xTbW7', 'Thor is imprisoned on the other side of the universe and finds himself in a race against time to get back to Asgard to stop Ragnarok, the destruction of his home-world and the end of Asgardian civilization, at the hands of a powerful new threat, the ruthless Hela.');
​
    INSERT INTO [dbo].[Event]
        (IMDBId, EventDate, CreatedDate, UserId, EventTitle, Summary, IsPublic, MediaTitle, PosterUrl, ReleaseYear, IMDBUrl, StreamUrl, OverView)
    VALUES
        ('tt5638642','2021-09-01 19:00:00', '2021-09-01 19:00:00', '4', 'Who doesn''t like Ryan Reynolds', 'Some fake summary goes here', '', '6 Underground', 'https://image.tmdb.org/t/p/w780/lnWkyG3LLgbbrIEeyl5mK5VRFe4.jpg', '2019', 'https://www.imdb.com/title/tt8106534', 'https://www.netflix.com/title/81001887/', 'After faking his death, a tech billionaire recruits a team of international operatives for a bold and bloody mission to take down a brutal dictator.');
​
    INSERT INTO [dbo].[Event]
        (IMDBId, EventDate, CreatedDate, UserId, EventTitle, Summary, IsPublic, MediaTitle, PosterUrl, ReleaseYear, IMDBUrl, StreamUrl, OverView)
    VALUES
        ('tt5638642','2021-09-01 19:00:00', '2021-09-01 19:00:00', '1', 'Vampires and Werewolves', 'More fake summary data', '', 'Underworld', 'https://image.tmdb.org/t/p/w780/zsnQ41UZ3jo1wEeemF0eA9cAIU0.jpg', '1003', 'https://www.imdb.com/title/tt0320691/', 'https://www.netflix.com/title/60031210/', 'Vampires and werewolves have waged a nocturnal war against each other for centuries. But all bets are off when a female vampire warrior named Selene, who''s famous for her strength and werewolf-hunting prowess, becomes smitten with a peace-loving male werewolf, Michael, who wants to end the war.');
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



