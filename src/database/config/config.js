const db = process.env.DATABASE_URL

module.exports = {
  "development": {
    "username": "root",
    "password": null,
    "database": "andalue_db",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port":3306
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": db.USERNAME,
    "password": db.PASSWORD,
    "database": db.DATABASE,
    "host": db.HOSTNAME,
    "port":db.PORT,
    "dialect": "mysql"
  }
}
