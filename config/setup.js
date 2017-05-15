var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	port: '8889'
});

connection.connect(function(err) {
	if (err) throw err;
	console.log('Connected!');
	connection.query("CREATE DATABASE IF NOT EXISTS Matcha_DB", (err, result)=> {
		if (err) throw err;
		console.log("Database created");
	});
	connection.query("USE Matcha_DB", (err, result)=> {
		if (err) throw err;
	});
	connection.query("CREATE TABLE IF NOT EXISTS User( \
		UserID INT PRIMARY KEY AUTO_INCREMENT NOT NULL, \
		FirstName VARCHAR(32) NOT NULL,\
		LastName VARCHAR(32) NOT NULL, \
		Login VARCHAR(32) NOT NULL, \
		Email VARCHAR(128) NOT NULL, \
		Password VARCHAR(128) NOT NULL, \
		Gender ENUM('Female', 'Male') NOT NULL,\
		Age INT NOT NULL, \
		Bio VARCHAR(300), \
		Last_Connected DATETIME, \
		Orientation ENUM('Bisexual', 'Homosexual', 'Heterosexual'), \
		Popularity_Note INT)", function (err, result) {
		if (err) throw err;
	});
	connection.query("CREATE TABLE IF NOT EXISTS Picture( \
		PictureID INT PRIMARY KEY AUTO_INCREMENT NOT NULL, \
		UserID INT NOT NULL, \
		PicURL VARCHAR(512) NOT NULL, \
		Profile_Pic BOOLEAN DEFAULT FALSE, \
		FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE)", function (err, result) {
		if (err) throw err;
	});
	connection.query("CREATE TABLE IF NOT EXISTS Hashtag( \
		HashtagID INT PRIMARY KEY AUTO_INCREMENT NOT NULL, \
		Hashtag VARCHAR(50) NOT NULL)", function (err, result) {
		if (err) throw err;
	});
	connection.query("CREATE TABLE IF NOT EXISTS Interest( \
		InterestID INT PRIMARY KEY AUTO_INCREMENT NOT NULL, \
		HashtagID INT NOT NULL, \
		UserID INT NOT NULL, \
		FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE, \
		FOREIGN KEY (HashtagID) REFERENCES Hashtag(HashtagID) ON DELETE CASCADE)", function (err, result) {
		if (err) throw err;
	});
	connection.query("CREATE TABLE IF NOT EXISTS Heart( \
		HeartID INT PRIMARY KEY AUTO_INCREMENT NOT NULL, \
		UserID INT NOT NULL, \
		LikedUserID INT NOT NULL, \
		FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE, \
		FOREIGN KEY (LikedUserID) REFERENCES User(UserID) ON DELETE CASCADE)", function (err, result) {
		if (err) throw err;
	});
	connection.query("CREATE TABLE IF NOT EXISTS Chat( \
		ChatID INT PRIMARY KEY AUTO_INCREMENT NOT NULL, \
		User_OneID INT NOT NULL, \
		User_TwoID INT NOT NULL, \
		FOREIGN KEY (User_OneID) REFERENCES User(UserID) ON DELETE CASCADE, \
		FOREIGN KEY (User_TwoID) REFERENCES User(UserID) ON DELETE CASCADE)", function (err, result) {
		if (err) throw err;
	});
	connection.query("CREATE TABLE IF NOT EXISTS Message( \
		MessageID INT PRIMARY KEY AUTO_INCREMENT NOT NULL, \
		UserID INT NOT NULL, \
		ChatID INT NOT NULL, \
		Content VARCHAR(364) NOT NULL, \
		Sent_at DATETIME NOT NULL, \
		FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE, \
		FOREIGN KEY (ChatID) REFERENCES Chat(ChatID) ON DELETE CASCADE)", function (err, result) {
		if (err) throw err;
	});
	console.log('Tables created');
	connection.end();
	console.log('Closing Connection');
});
