DELIMITER //
DROP PROCEDURE IF EXISTS sp_userUpdate;
CREATE PROCEDURE sp_userUpdate(
  IN p_id INT,
  IN p_username VARCHAR(255),
  IN p_firstname VARCHAR(255),
  IN p_lastname VARCHAR(255),
  IN p_email VARCHAR(255)
)
this_proc:BEGIN
	DECLARE stmt TEXT;
	DECLARE args VARCHAR(255);

    SET @id = p_id;
    SET @username = COALESCE(p_username, NULL);
    SET @firstname = COALESCE(p_firstname, NULL);
    SET @lastname = COALESCE(p_lastname, NULL);
    SET @email = COALESCE(p_email, NULL);
    
    -- Guard clause
    IF (@username IS NULL AND @firstname IS NULL AND @lastname IS NULL AND @email IS NULL)
		THEN LEAVE this_proc;
    END IF;
    
    IF (@username IS NOT NULL) THEN
		PREPARE prepared_stmt FROM "UPDATE users SET username = ? WHERE id = ?";
		EXECUTE prepared_stmt USING @username, @id;
		DEALLOCATE PREPARE prepared_stmt;
	END IF;
	IF (@firstname IS NOT NULL) THEN
		PREPARE prepared_stmt FROM "UPDATE users SET firstname = ? WHERE id = ?";
		EXECUTE prepared_stmt USING @firstname, @id;
		DEALLOCATE PREPARE prepared_stmt;
	END IF;
	IF (@lastname IS NOT NULL) THEN
		PREPARE prepared_stmt FROM "UPDATE users SET lastname = ? WHERE id = ?";
		EXECUTE prepared_stmt USING @lastname, @id;
		DEALLOCATE PREPARE prepared_stmt;
	END IF;
	IF (@email IS NOT NULL) THEN
		PREPARE prepared_stmt FROM "UPDATE users SET email = ? WHERE id = ?";
		EXECUTE prepared_stmt USING @email, @id;
		DEALLOCATE PREPARE prepared_stmt;
	END IF;
END //
DELIMITER ;
