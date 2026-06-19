import User from "../models/User";


export const regiterUser = async ({ name, email, password }) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        const error = new Error("User already exists with this emial");
        error.statusCode = 400;
        throw error
    }

    const user = await User.create({ name, email, password })

    return user;
};


export const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        const error = new Error("Invalid emial or password");
        error.statusCode = 401;
        throw error
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    return user
}
