CREATE FUNCTION update_like_function(p_user varchar(100), p_idea varchar(50))
RETURNS BOOLEAN
BEGIN
    DECLARE pair_exists BOOLEAN;

    -- Check if the user/idea pair exists in the Likes table
    SELECT EXISTS (
        SELECT 1
        FROM Likes
        WHERE `user` = p_user AND `idea` = p_idea
    ) INTO pair_exists;

    IF pair_exists THEN
        -- Pair exists, delete the pair from Likes table
        DELETE FROM Likes
        WHERE `user` = p_user AND `idea` = p_idea;

        -- Return false (pair removed)
        RETURN FALSE;
    ELSE
        -- Pair does not exist, insert the pair into Likes table
        INSERT INTO Likes (`user`, `idea`)
        VALUES (p_user, p_idea);

        -- Return true (pair inserted)
        RETURN TRUE;
    END IF;
END