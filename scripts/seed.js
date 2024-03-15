const { db } = require('@vercel/postgres')
const bcrypt = require('bcrypt')

async function seedUsers(client) {
  try {
    // Borrar las tablas creadas pro vercel
    const deleteTables = await client.sql`
      DROP TABLE IF EXISTS "Profile";
      DROP TABLE IF EXISTS "Post";
      DROP TABLE IF EXISTS "User";
      DROP TABLE IF EXISTS "users";
    `

    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS "User" (
        id SERIAL PRIMARY KEY,
        fullname VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `

    console.log(`Created "User" table`)

    const insertUsers = async () => {
      const hashedPassword = await bcrypt.hash('Idele227', 10) // Hash de la contraseña
      return await client.sql`
        INSERT INTO "User" (fullname, username, email, password)
        VALUES ('Ibrahim Ayodeji Sanusi', 'sanuzi', 'sanuzi1hp@gmail.com', ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `
    }

    // Insertar datos en la tabla "User"
    const insertedUsers = await insertUsers()

    if (insertedUsers) console.log(`Seeded user: ` + insertedUsers)

    return {
      createTable,
      insertedUsers,
    }
  } catch (error) {
    console.error('Error seeding users:', error)
    throw error
  }
}

async function seedPosts(client) {
  try {
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS "Post" (
        id SERIAL PRIMARY KEY,
        content VARCHAR(255) NOT NULL
      );
    `

    console.log(`Created "Post" table`)

    const insertPost = async () => {
      return await client.sql`
        INSERT INTO "Post" (content)
        VALUES ('Hi everyone, today I was on the most beautiful mountain in the world 😍, I also want to say hi to Silena, Olya and Davis!')
        ON CONFLICT (id) DO NOTHING;
      `
    }

    // Insertar datos en la tabla "User"
    const insertedPost = await insertPost()

    if (insertedPost) console.log(`Seeded post: ` + insertedPost)

    return {
      createTable,
      insertedPost,
    }
  } catch (error) {
    console.error('Error seeding posts:', error)
    throw error
  }
}

async function main() {
  const client = await db.connect()

  await seedUsers(client)
  await seedPosts(client)

  await client.end()
}

main().catch((err) => {
  console.error('An error occurred while attempting to seed the database:', err)
})
