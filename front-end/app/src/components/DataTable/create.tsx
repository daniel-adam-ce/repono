import { SelectProps } from "@radix-ui/react-select"
import { Button, ButtonProps, Input, InputProps, Label, Popover, PopoverContent, PopoverTrigger, Select, SelectContent, SelectGroup, SelectTrigger, SelectValue } from "../ui"

interface CreateFieldProps {
    label?: string
    children: React.ReactNode
}

export const CreateField = ({ label, children }: CreateFieldProps) => {
    return (
        <div className="grid grid-cols-3 items-center gap-4">
            {label && <Label htmlFor={`${label}`}>{label}</Label>}
            {
                children
            }
        </div>
    )
}

// interface CreateFieldChildProps {
//     value: any,
//     onChange: (value: any) => void,
//     label?: string
//     disabled?: boolean
// }

interface CreateInputFieldProps extends Omit<InputProps, 'onChange'> {
    onChange: (value: any) => void
    label: string
}

export const CreateInputField = (props: CreateInputFieldProps) => {
    return (
        <CreateField
            label={props.label}
        >
            <Input
                {
                    ...props
                }
                className="col-span-2 h-8"
                value={props.value ?? ""}
                onChange={(e) => {
                    props.onChange(e.currentTarget.value)
                }}
                disabled={props.disabled}
            />
        </CreateField>
    )
}

interface CreateSelectFieldProps extends Omit<SelectProps, 'onChange'> {
    label: string
    // onValueChange?: (value: string) => void
    placeholder?: string
    children: React.ReactNode
    defaultValue?: string
}

export const CreateSelectField = ({ value, onValueChange, label, placeholder, children, defaultValue, disabled, ...props }: CreateSelectFieldProps) => {
    return (
        <CreateField
            label={label}
        >
            <Select
                value={value}
                onValueChange={onValueChange}
                {
                    ...props
                }
                aria-label="test"
            >
                <SelectTrigger
                    className="col-span-2 h-8"
                    disabled={disabled}
                    aria-label="test2"
                >
                    <SelectValue
                        placeholder={placeholder}
                        defaultValue={defaultValue}
                    />
                </SelectTrigger>
                <SelectContent

                    aria-label="test3"
                >
                    <SelectGroup
                    >
                        {
                            children
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>
        </CreateField>
    )
}

export const CreateFormButton = (props: ButtonProps) => {
    return (
        <div
            className="flex justify-end"
        >
            <Button
                size="sm"
                className="h-8"
                {
                    ...props
                }
            />
        </div>

    )
}

interface CreateFormProps {
    title: string,
    description: string,
    children: React.ReactNode
}

export const CreateForm = ({ title, description, children }: CreateFormProps) => {
    return (
        <div className="grid gap-4">
            <div className="space-y-2">
                <h4 className="font-medium leading-none">{title}</h4>
                <p className="text-sm text-muted-foreground">
                    {description}
                </p>
            </div>
            <div className="grid gap-2">
                {
                    children
                }
            </div>
        </div>
    )
}

interface CreateButtonTableProps {
    children: React.ReactNode
}

export const CreateButtonTable = ({ children }: CreateButtonTableProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    size="sm"
                    className="h-8"
                >
                    Create
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                {
                    children
                }
            </PopoverContent>
        </Popover>
    )
}