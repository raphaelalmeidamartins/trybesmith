interface Login {
  username: string;
  password: string;
}

interface User extends Login {
  id?: number,
  classe: string;
  level: number,
}

export {
  User,
  Login,
};
