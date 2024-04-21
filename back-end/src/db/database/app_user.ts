
import {
  Generated,
  Insertable,
  Selectable,
  Updateable
} from 'kysely'
  
export interface UserTable {
  user_id: Generated<number>
  email: string
}
export type User = Selectable<UserTable>
export type NewUser = Insertable<UserTable>
export type UserUpdate = Updateable<UserTable>
