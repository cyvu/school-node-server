DELIMITER //
DROP PROCEDURE IF EXISTS sp_userDelete;
CREATE PROCEDURE sp_userDelete(
	IN p_id INT
)
proc_this:BEGIN
	SET @id = p_id;
    PREPARE prepared_stmt FROM "DELETE FROM users WHERE id = ?";
    EXECUTE prepared_stmt USING @id;
    DEALLOCATE PREPARE prepared_stmt;
END //
DELIMITER ;