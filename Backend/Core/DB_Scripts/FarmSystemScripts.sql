-- ==============================
-- 1. Create Users Table
-- ==============================
CREATE TABLE Users (
    Id INT PRIMARY KEY IDENTITY,
    FullName NVARCHAR(100),
    Email NVARCHAR(100) UNIQUE,
    PasswordHash NVARCHAR(MAX),
    Role NVARCHAR(20),
    ResetToken NVARCHAR(MAX),
    TokenExpiry DATETIME,
    OtpCode NVARCHAR(10),
    OtpExpiry DATETIME
);

-- ==============================
-- 2. Create tblCows Table
-- ==============================
CREATE TABLE tblCows (
    Id INT PRIMARY KEY IDENTITY,
    TagNumber NVARCHAR(50),
    Breed NVARCHAR(50),
    BirthDate DATE,
    IsMilking BIT,
    HealthStatus NVARCHAR(100) NULL
);

-- ==============================
-- 3. Create tblEmailTemplates Table
-- ==============================
CREATE TABLE tblEmailTemplates (
    Id INT PRIMARY KEY IDENTITY(1,1),
    TemplateName NVARCHAR(100) NOT NULL,
    Subject NVARCHAR(200) NOT NULL,
    Body NVARCHAR(MAX) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);

-- ==============================
-- 4. Insert Email Template for OTP Reset
-- ==============================
INSERT INTO tblEmailTemplates (TemplateName, Subject, Body)
VALUES (
    'OtpReset',
    'FarmSystem Password Reset OTP',
    '
    <html>
    <body>
        <h2>Password Reset Request</h2>
        <p>Hello {{FullName}},</p>
        <p>Your OTP is: <b>{{OTP}}</b></p>
        <p>This OTP is valid for 10 minutes.</p>
        <p>- FarmSystem Team</p>
    </body>
    </html>'
);

-- ==============================
-- 5. Stored Procedure: Insert or Update User
-- ==============================
CREATE PROCEDURE IT_InsertUpdateUser
    @FullName NVARCHAR(100),
    @Email NVARCHAR(100),
    @PasswordHash NVARCHAR(MAX),
    @Role NVARCHAR(50),
    @UserId INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Users (FullName, Email, PasswordHash, Role)
    VALUES (@FullName, @Email, @PasswordHash, @Role);

    SET @UserId = SCOPE_IDENTITY();
END;

-- ==============================
-- 6. Stored Procedure: Get All Users
-- ==============================
CREATE PROCEDURE IT_GetAllUsers
AS
BEGIN
    SELECT Id, FullName, Email, Role FROM Users;
END;

-- ==============================
-- 7. Stored Procedure: Get User By Email
-- ==============================
CREATE PROCEDURE IT_GetUserByEmail
    @Email VARCHAR(50)
AS
BEGIN
    SELECT * FROM Users WHERE Email = @Email;
END;
