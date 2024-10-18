
export type ItemCreate = {
    item_name: string,
    room_id: string,
    description: string,
}

export type Item = {
    item_id: number,
    item_name: string,
    description: string,
    created_at: string,
    created_by: string,
    house_id: number,
    room_id: number,
    room_name: string,
    house_name: string,
    email: string,
}