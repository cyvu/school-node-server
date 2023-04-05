DELIMITER / / DROP PROCEDURE IF EXISTS sp_userCreate;
CREATE PROCEDURE sp_userCreate(
	IN p_username VARCHAR(255),
	IN p_firstname VARCHAR(255),
	IN p_lastname VARCHAR(255),
	IN p_email VARCHAR(255)
) BEGIN
DECLARE stmt TEXT;
DECLARE args VARCHAR(255);
SET @stmt = CONCAT(
		'INSERT INTO users(',
		'username',
		IF(NOT ISNULL(p_firstname), ', firstname', ''),
		IF(NOT ISNULL(p_lastname), ', lastname', ''),
		', email ',
		') VALUES (',
		'?',
		IF(NOT ISNULL(p_firstname), ', ?', ''),
		IF(NOT ISNULL(p_lastname), ', ?', ''),
		', ?',
		')'
	);
SET @username = p_username;
SET @firstname = p_firstname;
SET @lastname = p_lastname;
SET @email = p_email;
PREPARE prepared_stmt
FROM @stmt;
IF (
	NOT ISNULL(@firstname)
	AND NOT ISNULL(@lastname)
) THEN EXECUTE prepared_stmt USING @username,
@firstname,
@lastname,
@email;
ELSEIF (
	NOT ISNULL(@firstname)
	AND ISNULL(@lastname)
) THEN EXECUTE prepared_stmt USING @username,
@firstname,
@email;
ELSEIF (
	ISNULL(@firstname)
	AND NOT ISNULL(@lastname)
) THEN EXECUTE prepared_stmt USING @username,
@lastname,
@email;
ELSE EXECUTE prepared_stmt USING @username,
@email;
END IF;
DEALLOCATE PREPARE prepared_stmt;
END / / DELIMITER;