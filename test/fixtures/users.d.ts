export type Users = {
  [userType: string]: User;
};

export interface User {
  firstName: string;
  lastName: string;
  zipCode: string;
  username: string;
  password: string;
}
