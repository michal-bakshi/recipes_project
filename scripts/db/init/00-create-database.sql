-- Create Recipes database if it does not exist (runs against 'master')
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = N'Recipes')
BEGIN
  CREATE DATABASE [Recipes];
END
GO
