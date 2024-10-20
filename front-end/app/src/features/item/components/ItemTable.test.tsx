
import { render, RenderResult } from "@testing-library/react";
import { Item } from "../types";
import { ItemTable } from "./ItemTable";
import { RouterWrapper } from "@/lib";

describe("ItemTable", () => {
    let items: Array<Item> = [];

    beforeEach(() => {
        items = [
            {
                item_id: 1,
                item_name: "Book",
                description: "A book",
                created_at: "2023-01-01",
                created_by: "test@gmail.com",
                house_id: 1,
                room_id: 1,
                room_name: "room1",
                house_name: "house1",
                email: "test@gmail.com"
            },
            {
                item_id: 2,
                item_name: "Book2",
                description: "A book2",
                created_at: "2023-01-01",
                created_by: "test@gmail.com",
                house_id: 1,
                room_id: 1,
                room_name: "room2",
                house_name: "house1",
                email: "test@gmail.com"
            },
        ]
    })

    describe("without a houseId", () => {
        let table: RenderResult;

        it("renders the table correctly", () => {


            table = render(
                <RouterWrapper path={"/"} initialEntries={["/"]}>
                    <ItemTable items={items}/>
                </RouterWrapper>
            );
            // columns
            expect(table.getByText("Items")).toBeInTheDocument();
            expect(table.getByText("Item")).toBeInTheDocument();
            expect(table.getByText("Description")).toBeInTheDocument();
            expect(table.getByText("Room")).toBeInTheDocument();
            expect(table.getByText("Created By")).toBeInTheDocument();
            expect(table.getByText("House")).toBeInTheDocument();
            // expect(table.getByText(/house-1/i)).toBeInTheDocument();
        });
    })

    describe("with a houseId", () => {
        let table: RenderResult;
        it("renders the table correctly", () => {

            // columns
    
            table = render(
                <RouterWrapper path={"/house/:houseId/items"} initialEntries={["/house/1/items"]}>
                    <ItemTable items={items}/>
                </RouterWrapper>
            );
            expect(table.getByText("Items")).toBeInTheDocument();
            expect(table.getByText("Item")).toBeInTheDocument();
            expect(table.getByText("Description")).toBeInTheDocument();
            expect(table.getByText("Room")).toBeInTheDocument();
            expect(table.getByText("Created By")).toBeInTheDocument();
            expect(table.queryByText("House")).not.toBeInTheDocument();
            // expect(table.getByText(/house-1/i)).toBeInTheDocument();
        });
    })
})