SELECT house_name, item_count.num_items as total_items, room_count.num_rooms as total_rooms FROM house
LEFT JOIN (
    SELECT COUNT(item.house_id) as num_items, house_id FROM item
    WHERE item.house_id = 3
    GROUP BY item.house_id
) as item_count
ON item_count.house_id = house.house_id
LEFT JOIN (
    SELECT COUNT(room.house_id) as num_rooms, house_id FROM room
    WHERE room.house_id = 3
    GROUP BY room.house_id
) as room_count
ON room_count.house_id = house.house_id
WHERE house.house_id = 3;