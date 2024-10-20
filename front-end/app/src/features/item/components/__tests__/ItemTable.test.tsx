
import { render, RenderResult, fireEvent } from "@testing-library/react";
import { ItemTable } from "../ItemTable";
import { RouterWrapper } from "@/lib";
import { Item, ItemCreate } from "../../types";

describe("ItemTable", () => {
    let items: Array<Item> = [];
    const mockRooms = [
        {
            "room_id": 1,
            "room_name": "room-1",
            "count": "100",
            "email": "test@gmail.com",
            "house_id": 1
        },
        {
            "room_id": 2,
            "room_name": "room-2",
            "count": "100",
            "email": "test@gmail.com",
            "house_id": 1
        },
    ]

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
                house_name: "house2",
                email: "test2@gmail.com"
            },
        ]
    })

    describe("without a houseId", () => {
        let table: RenderResult;
        let onItemChange = vi.fn();
        let item: Partial<ItemCreate> = {}
        const onSubmit = vi.fn();
        let disabled = false;

        beforeEach(() => {
            table = render(
                <RouterWrapper path={"/"} initialEntries={["/"]}>
                    <ItemTable 
                        items={items} 
                        item={item}
                        onItemChange={onItemChange}
                        onSubmit={onSubmit}
                        disabled={disabled}
                        rooms={mockRooms}
                    />
                </RouterWrapper>
            );
        })

        it("renders the table correctly", () => {


            // columns
            expect(table.getByText("Items")).toBeInTheDocument();
            expect(table.getByText("Item")).toBeInTheDocument();
            expect(table.getByText("Description")).toBeInTheDocument();
            expect(table.getByText("Room")).toBeInTheDocument();
            expect(table.getByText("Created By")).toBeInTheDocument();
            expect(table.getByText("House")).toBeInTheDocument();
            expect(table.getByRole("button", { name: /Create/i })).toBeInTheDocument();
            // expect(table.getByText(/house-1/i)).toBeInTheDocument();
        });

        it("renders the table data correctly", () => {
            // columns
            expect(table.getByText("Book")).toBeInTheDocument();
            expect(table.getByText("A book")).toBeInTheDocument();
            expect(table.getByText("room1")).toBeInTheDocument();
            expect(table.getByText("house1")).toBeInTheDocument();
            expect(table.getByText("test@gmail.com")).toBeInTheDocument();

            expect(table.getByText("Book2")).toBeInTheDocument();
            expect(table.getByText("A book2")).toBeInTheDocument();
            expect(table.getByText("room2")).toBeInTheDocument();
            expect(table.getByText("house2")).toBeInTheDocument();
            expect(table.getByText("test2@gmail.com")).toBeInTheDocument();
            // expect(table.getByText(/house-1/i)).toBeInTheDocument();
        });
    })

    describe("with a houseId", () => {
        let table: RenderResult;
        let onItemChange = vi.fn();
        let item: Partial<ItemCreate> = {}
        const onSubmit = vi.fn();
        let disabled = false;

        beforeEach(() => {
            table = render(
                <RouterWrapper path={"/house/:houseId/items"} initialEntries={["/house/1/items"]}>
                    <ItemTable 
                        items={items} 
                        item={item}
                        onItemChange={onItemChange}
                        onSubmit={onSubmit}
                        disabled={disabled}
                        rooms={mockRooms}
                    />
                </RouterWrapper>
            );
        })
        it("renders the table correctly", () => {
            expect(table.getByText("Items")).toBeInTheDocument();
            expect(table.getByText("Item")).toBeInTheDocument();
            expect(table.getByText("Description")).toBeInTheDocument();
            expect(table.getByText("Room")).toBeInTheDocument();
            expect(table.getByText("Created By")).toBeInTheDocument();
            expect(table.queryByText("House")).not.toBeInTheDocument();
            // expect(table.getByText(/house-1/i)).toBeInTheDocument();
        });


        it("renders the table data correctly", () => {

            // columns
            expect(table.getByText("Book")).toBeInTheDocument();
            expect(table.getByText("A book")).toBeInTheDocument();
            expect(table.getByText("room1")).toBeInTheDocument();
            expect(table.getByText("test@gmail.com")).toBeInTheDocument();

            expect(table.getByText("Book2")).toBeInTheDocument();
            expect(table.getByText("A book2")).toBeInTheDocument();
            expect(table.getByText("room2")).toBeInTheDocument();
            expect(table.getByText("test2@gmail.com")).toBeInTheDocument();
            // expect(table.getByText(/house-1/i)).toBeInTheDocument();
        });

        it("renders the popover correctly when clicking on the create button", () => {
            const createButton = table.getByRole("button", { name: /Create/i });
            expect(createButton).toBeInTheDocument();
            fireEvent.click(createButton);
            expect(table.getByText("Add an item.")).toBeInTheDocument();
        });
    })
})