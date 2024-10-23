import { TableType, Tables } from "@/db";

export * from "./User";
export * from "./Session";
export * from "./House";
export * from "./Room";
export * from "./Item";


// export type FooType = Record<Tables, string>;

export interface Model<S, I, U> {
    readonly table: TableType

    findById(id: number): Promise<S | any>
    findAll(): Promise<Array<S | any>> 

    createOne(row: I): Promise<S> 
    // createMany(rows: Array<S>): Promise<Array<S>>

    deleteOne(id: number): Promise<S>
    // deleteMany(ids: Array<number>): Promise<Array<S>>

    updateOne(id: number, updateWith: U): Promise<S>
    // updateMany()
}