-- name: GetHouses :many
SELECT * FROM houses
WHERE owner = $1
ORDER BY name
LIMIT $2
OFFSET $3;