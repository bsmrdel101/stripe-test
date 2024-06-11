import { atom } from "jotai";

export const userAtom = atom<User>({
  id: null,
  username: null,
  password: null,
});
