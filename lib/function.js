import bcrypt from "bcryptjs"

export const genPassword = async(password) =>
    Promise.resolve(bcrypt.hash(password,bcrypt.getRounds(process.env.BCRYPT_SALT)))