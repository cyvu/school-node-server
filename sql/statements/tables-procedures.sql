
DELIMITER //
-- Get all users, providing a limit
DROP PROCEDURE IF EXISTS prepUsers;
CREATE PROCEDURE prepUsers(
  IN limit_start INT,
  IN limit_end INT
)
BEGIN
  PREPARE prepared_stmt FROM "SELECT * FROM users LIMIT ?, ?";
  SET @limit_start = limit_start;
  SET @limit_end = limit_end;
  EXECUTE prepared_stmt USING @limit_start, @limit_end;
  DEALLOCATE PREPARE prepared_stmt;
END//

-- Get 100 users, providing start pos
DROP PROCEDURE IF EXISTS prepUsersDefault;
CREATE PROCEDURE prepUsersDefault(
  IN limit_start INT
)
BEGIN
  PREPARE prepared_stmt FROM "SELECT * FROM users LIMIT ?, 100";
  SET @limit_start = limit_start;
  EXECUTE prepared_stmt USING @limit_start;
  DEALLOCATE PREPARE prepared_stmt;
END//

-- Get a user, providing id
DROP PROCEDURE IF EXISTS prepUser;
CREATE PROCEDURE prepUser(
  IN id INT
)
BEGIN
  PREPARE prepared_stmt FROM "SELECT * FROM users WHERE id = ?";
  SET @id = id;
  EXECUTE prepared_stmt USING @id;
  DEALLOCATE PREPARE prepared_stmt;
END//
DELIMITER ;