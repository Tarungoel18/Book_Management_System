import bcrypt from "bcrypt";

export const comparePassword = (password,hash) => bcrypt.compare(password,hash);