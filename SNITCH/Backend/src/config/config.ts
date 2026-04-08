import dontenv from 'dotenv';

dontenv.config();


type CONFIG = {
readonly MONGO_URI: string;
};


if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variables");
}

export const config: CONFIG = {
    MONGO_URI: process.env.MONGO_URI !,
};