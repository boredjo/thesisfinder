CREATE FUNCTION get_likes_function(p_user varchar(100), p_idea varchar(50))
RETURNS BOOLEAN
BEGIN
    DECLARE pair_exists BOOLEAN;

    -- Check if the user/idea pair exists in the Likes table
    SELECT EXISTS (
        SELECT 1
        FROM Likes
        WHERE `user` = p_user AND `idea` = p_idea
    ) INTO pair_exists;
    RETURN pair_exists;
END 