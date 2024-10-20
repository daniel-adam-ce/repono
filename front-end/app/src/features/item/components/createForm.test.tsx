
import { fireEvent, render, RenderResult, screen, within} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { ItemCreateForm } from "./createForm";
import { ItemCreate, } from "@/features/item";
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
class MockPointerEvent extends Event {
  button: number;
  ctrlKey: boolean;
  pointerType: string;

  constructor(type: string, props: PointerEventInit) {
    super(type, props);
    this.button = props.button || 0;
    this.ctrlKey = props.ctrlKey || false;
    this.pointerType = props.pointerType || 'mouse';
  }
}
window.PointerEvent = MockPointerEvent as any;
window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();


describe("ItemCreateForm", () => {
  let form: RenderResult;
  let onItemChange = vi.fn();
  let item: Partial<ItemCreate> = {}
  const onSubmit = vi.fn();
  let disabled = false;

  beforeEach(() => {


    form = render(
      <TanQueryProvider>
        <ItemCreateForm
          item={item}
          onItemChange={onItemChange}
          onSubmit={onSubmit}
          disabled={disabled}
          rooms={mockRooms}
        />
      </TanQueryProvider>
    );
  })

  it("renders the form correctly", () => {
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Description/i)).toBeInTheDocument();
  });

  it("calls the onItemChange function correctly for all field", async () => {

    const nameInput = screen.getByRole("textbox", { name: /Item Name/i });
    const descriptionInput = screen.getByRole("textbox", { name: /Item Description/i });
    fireEvent.change(nameInput, { target: { value: "new item name" } });
    fireEvent.change(descriptionInput, { target: { value: "new item description" } });

    const trigger = screen.getByRole('combobox', );
    expect(trigger).toBeInTheDocument();
    expect(within(trigger).getByText('Room')).toBeInTheDocument();
    const user = userEvent.setup();
  
    await user.click(trigger);
  
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('option', { name: '1-room-1' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '2-room-2' })).toBeInTheDocument();
  
    await user.click(screen.getByRole('option', { name: '1-room-1' }));
  
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(within(trigger).getByText('1-room-1')).toBeInTheDocument();


    expect(onItemChange).toHaveBeenCalledTimes(3);
    expect(onItemChange).toHaveBeenNthCalledWith(1, { item_name: "new item name"})
    expect(onItemChange).toHaveBeenNthCalledWith(2, { description: "new item description"})
    expect(onItemChange).toHaveBeenNthCalledWith(3, { room_id: 1})  
  });

  it ("calls the onSubmit function correctly", async () => {

    const submitButton = screen.getByRole("button", { name: /Create/i });
    fireEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(1);
  }); 

  it ("disables all fields when disabled is true", async () => {
    disabled = true;
    form.rerender(
      <TanQueryProvider>
        <ItemCreateForm
          item={item}
          onItemChange={onItemChange}
          onSubmit={onSubmit}
          disabled={disabled}
          rooms={mockRooms}
        />
      </TanQueryProvider>
    )

    const nameInput = screen.getByRole("textbox", { name: /Item Name/i });
    expect(nameInput).toBeDisabled();

    const descriptionInput = screen.getByRole("textbox", { name: /Item Description/i });
    expect(descriptionInput).toBeDisabled();

    const trigger = screen.getByRole('combobox', );
    expect(trigger).toBeDisabled(); 

    const submitButton = screen.getByRole("button", { name: /Create/i });
    expect(submitButton).toBeDisabled();
  });

});