SELECT item_name, house.house_name, room.room_name, house.house_id, app_user.user_id, room.room_id, app_user.email, item.created_by
FROM item, house, house_user, app_user, room
WHERE 
item.house_id = house.house_id 
AND house_user.user_id = app_user.user_id 
AND house_user.house_id = house.house_id 
AND room.house_id = house.house_id
AND item.room_id = room.room_id
AND app_user.user_id = 3;

-- LEFT JOIN app_user ON item.created_by = app_user.user_id
-- LEFT JOIN house ON house.house_id = item.house_id
-- LEFT JOIN room ON room.house_id = item.house_id

SELECT item.item_name, house.house_name, room.room_name, house.house_id, app_user.user_id, room.room_id, app_user.email, item.created_by
FROM item
INNER JOIN house ON item.house_id = house.house_id
INNER JOIN room ON item.room_id = room.room_id AND room.house_id = house.house_id
INNER JOIN house_user ON house_user.house_id = house.house_id
INNER JOIN app_user ON house_user.user_id = app_user.user_id AND item.created_by = app_user.user_id
WHERE app_user.user_id = 3;

SELECT item.item_name, house.house_name, room.room_name, house.house_id, app_user.user_id, room.room_id, app_user.email, item.created_by
FROM item
INNER JOIN house on item.house_id = house.house_id
INNER JOIN room on item.room_id = room.room_id
INNER JOIN house_user ON house_user.house_id = house.house_id
INNER JOIN app_user ON item.created_by = app_user.user_id;

SELECT item.item_name, room.room_name, house.house_name, house.house_id, item.created_by, app_user.email
FROM item
LEFT JOIN house on item.house_id = house.house_id
LEFT JOIN house_user on house_user.house_id = house.house_id AND house_user.user_id = 3;
LEFT JOIN room ON item.room_id = room.room_id AND room.house_id = house.house_id
LEFT JOIN app_user on item.created_by = app_user.user_id;

SELECT item.item_name, house.house_name, room.room_name, house.house_id, app_user.user_id, room.room_id, app_user.email, item.created_by
FROM item
INNER JOIN
(
    SELECT * FROM house_user
    WHERE house_user.user_id = 3
) as house_user_temp ON house_user_temp.house_id = house_user_temp.house_id
INNER JOIN house on item.house_id = house.house_id
INNER JOIN room on item.room_id = room.room_id
INNER JOIN app_user on item.created_by = app_user.user_id
WHERE house_user_temp.house_id = house.house_id;
