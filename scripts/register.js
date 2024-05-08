import bcrypt from 'bcrypt';
import postgres from "postgres";
import * as z from 'zod';
import dotenv from 'dotenv';
import promptFactory from 'prompt-sync';

const prompt = promptFactory({ sigint: true});

const isProduction = process.env.NODE_ENV === 'production';

dotenv.config({
    path: isProduction ? '.env' : '.env.local'
});

const pgConfig = {
    url: process.env.PG_URL ?? 'localhost:5432',
    database: process.env.PG_DB ?? 'homer',
    username: process.env.PG_USERNAME ?? 'postgres',
    password: process.env.PG_PASSWORD ?? 'postgres'

}

const sql = postgres(`postgresql://${pgConfig.username}:${pgConfig.password}@${pgConfig.url}/${pgConfig.database}`);


console.log(`
---------------------------------
-        User registration      -
---------------------------------
`)

const usernameSchema = z.string().min(3).max(20);

let username = prompt('Enter your username: ')
let valid = true;
try {
    usernameSchema.parse(username);
} catch ({errors}) {
    errors.forEach(error => console.error(error.message));
    valid = false;
}
while (!valid) {
    username = prompt('Invalid! Enter your username: ')
    try {
        usernameSchema.parse(username);
        valid = true;
    } catch ({errors}) {
        errors.forEach(error => console.error(error.message));
        valid = false;
    }
}

const emailSchema = z.string().email();
valid = true;
let email = prompt('Enter your email: ')
try {
    emailSchema.parse(email);
} catch ({errors}) {
    errors.forEach(error => console.error(error.message));
    valid = false;
}
while (!valid) {
    email = prompt('Invalid! Enter your email: ')
    try {
        emailSchema.parse(email);
        valid = true;
    } catch ({errors}) {
        errors.forEach(error => console.error(error.message));
        valid = false;
    }
}

const passwordSchema = z.string().min(6);
valid = true;
let password = prompt('Enter your password: ')
try {
    passwordSchema.parse(password);
} catch ({errors}) {
    errors.forEach(error => console.error(error.message));
    valid = false;
}
while (!valid) {
    password = prompt('Invalid! Enter your password: ')
    try {
        passwordSchema.parse(password);
        valid = true;
    } catch ({errors}) {
        errors.forEach(error => console.error(error.message));
        valid = false;
    }
}

const saltRounds = 10;

const hashedPassword = await bcrypt.hash(password, saltRounds);

try{
    await sql`
        INSERT INTO users (name, email, password)
        VALUES (${username}, ${email}, ${hashedPassword})
        `;
} catch (error) {
    console.error(error.message);
    process.exit(1);
}

console.log('User registered successfully!');
process.exit(0);