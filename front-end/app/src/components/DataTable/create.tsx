import { Button, ButtonProps, Input, Label, Popover, PopoverContent, PopoverTrigger, Select, SelectContent, SelectGroup, SelectTrigger, SelectValue } from "../ui"

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

interface CreateFieldChildProps {
    value: any,
    onChange: (value: any) => void,
    label?: string
    disabled?: boolean
}

export const CreateInputField = ({ value, onChange, label, disabled }: CreateFieldChildProps) => {
    return (
        <CreateField
            label={label}
        >
            <Input
                className="col-span-2 h-8"
                value={value ?? ""}
                onChange={(e) => {
                    onChange(e.currentTarget.value)
                }}
                disabled={disabled}
            />
        </CreateField>
    )
}

interface CreateSelectFieldProps extends Omit<CreateFieldChildProps, 'onChange'> {
    onValueChange?: (value: string) => void
    placeholder?: string
    children: React.ReactNode
    defaultValue?: string
}

export const CreateSelectField = ({ value, onValueChange, label, placeholder, children, defaultValue, disabled }: CreateSelectFieldProps) => {
    return (
        <CreateField
            label={label}
        >
            <Select
                value={value}
                onValueChange={onValueChange}
            >
                <SelectTrigger
                    className="col-span-2 h-8"
                    disabled={disabled}
                >
                    <SelectValue
                        placeholder={placeholder}
                        defaultValue={defaultValue}
                    />
                </SelectTrigger>
                <SelectContent

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