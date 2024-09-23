
import { render, screen } from "@testing-library/react";
import { ItemCreateForm } from "./createForm";
import { useRooms } from "@/features/room";
import { useItemCreateMutation } from "@/features/item";
import { TanQueryProvider } from "@/providers/query";

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

vi.mock("@/features/room", () => ({
  useRooms: vi.fn()
}));

vi.mock("@/features/item", () => ({
  useItemCreateMutation: vi.fn()
}));

// vi.mock("@/features/room", () => ({
//   useRooms: () => {
//     console.log('mocked')
//     return { rooms: mockRooms, isPending: false, error: null }
//   }
// }));
// vi.mock("@/features/item", () => ({
//   useItemCreateMutation: () => {
//     console.log('mocked2')
//     return { mutate: () => { }, isPending: false }
//   }
// }));


describe("ItemCreateForm", () => {

  beforeEach(() => {
    vi.mocked(useRooms).mockImplementation(() => ({ rooms: mockRooms, isPending: false, error: null }));
    vi.mocked(useItemCreateMutation).mockImplementation(() => ({ mutate: () => { }, isPending: false }));
  })

  // it("useRoom mocked to return mockRooms", () => {
  //   expect(useRooms()).toStrictEqual({ rooms: mockRooms, isPending: false, error: null });
  // });

  // it("useITemCreateMutation mocked to return mutatae fn", () => {
  //   expect(useItemCreateMutation()).toHaveProperty("mutate");
  // });

  it("renders the form correctly", () => {
    render(
      <TanQueryProvider>
        <ItemCreateForm />
      </TanQueryProvider>
    );
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Description/i)).toBeInTheDocument();
  });
});