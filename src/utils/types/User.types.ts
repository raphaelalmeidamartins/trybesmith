interface Login {
  username: string;
  password: string;
}

interface User extends Login {
  id?: number,
  classe: string;
  level: number,
}

interface UserReturned extends User {
  id: number,
}

export {
  User,
  UserReturned,
  Login,
};
