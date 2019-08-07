export interface User {
  readonly id: number;
  readonly name_first: string;
  readonly name_last: string;
  readonly email: string;
  readonly password_hash: string;
  readonly user_groups_id: number;
}
