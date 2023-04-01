DELIMITER //
DROP PROCEDURE IF EXISTS sp_usersRead;
CREATE PROCEDURE sp_usersRead(
  IN limit_start INT,
  IN limit_end INT
)
BEGIN
  PREPARE prepared_stmt FROM "SELECT * FROM users LIMIT ?, ?";
  SET @limit_start = limit_start;
  SET @limit_end = limit_end;
  EXECUTE prepared_stmt USING @limit_start, @limit_end;
  DEALLOCATE PREPARE prepared_stmt;
END //
DELIMITER ;


DELIMITER //
DROP PROCEDURE IF EXISTS sp_usersReadDefault;
CREATE PROCEDURE sp_usersReadDefault(
  IN limit_start INT
)
BEGIN
  PREPARE prepared_stmt FROM "SELECT * FROM users LIMIT ?, 100";
  SET @limit_start = limit_start;
  EXECUTE prepared_stmt USING @limit_start;
  DEALLOCATE PREPARE prepared_stmt;
END //
DELIMITER ;


DELIMITER //
DROP PROCEDURE IF EXISTS sp_userRead;
-- Returns a variable for the id
CREATE PROCEDURE sp_userRead (INOUT p_id INT)
BEGIN
	PREPARE prepared_stmt FROM "SELECT id INTO @safe_id FROM users WHERE id = ?";
	SET @id = p_id;	-- Original
	EXECUTE prepared_stmt USING @id;
    SET p_id = @safe_id; -- Safe (although, p_id is already an int so i would be fine either way); Return as a variable
    
    PREPARE prepared_stmt FROM "SELECT id, username, firstname, lastname, email FROM users WHERE id = ?";
	EXECUTE prepared_stmt USING @safe_id; -- List result
	DEALLOCATE PREPARE prepared_stmt;
END//
DELIMITER ;
