/**
 * Parses an array of string and combines them into a className string.
 * EX: ["hello", "world", undefined, "parent"] -> "hello world parent"
 * @param args 
 * @returns string
 */
export function classCombine(...args: Array<string | undefined>): string {
    return args.reduce((acc: string, className: string | undefined) => {
        if (!className) return acc + "";
        return acc + className + " ";
    }, "").trim();
}