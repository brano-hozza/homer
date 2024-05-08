import bcrypt from 'bcrypt';


const password = process.argv[2];
if(!password) {
    console.error('Please provide a password');
    process.exit(1);
}

console.log(`
---------------------------------
-         Hash generator        -
---------------------------------
`)

const saltRounds = 10;

const hashedPassword = await bcrypt.hash(password, saltRounds);

console.log(`
Your hash: ${hashedPassword}
`)