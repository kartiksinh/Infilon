export type User = {
  id: string;
  name: string;
  email: string;
  // address: string;
  // phone: string;
};

type UserResponse = {
  user: User[];
};

export const fetchUsers = (url: string) =>
  fetch(url).then<UserResponse>((r) => r.json());
