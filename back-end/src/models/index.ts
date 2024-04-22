import { Tables } from "../db";

export * from "./User";
export * from "./Session";
export * from "./House";


export type FooType = Record<Tables, string>;

export interface Model<S, I, U> {
    readonly table: keyof FooType

    findById(id: number): Promise<S>
    findAll(): Promise<Array<S>> 

    createOne(row: I): Promise<S> 
    // createMany(rows: Array<S>): Promise<Array<S>>

    deleteOne(id: number): Promise<S>
    // deleteMany(ids: Array<number>): Promise<Array<S>>

    updateOne(id: number, updateWith: U): Promise<S>
    // updateMany()
}