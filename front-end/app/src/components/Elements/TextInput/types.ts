export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "label"> {
    onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => any
    label?: React.ReactNode
}
