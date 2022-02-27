module.exports = {
  "development": {
    "username": db.USERNAME,
    "password": db.PASSWORD,
    "database": db.DATABASE,
    "host": db.HOSTNAME,
    "port":db.PORT,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DBUSERNAME,
    "password": process.env.DBPASSWORD,
    "database": process.env.DBDATABASE,
    "host": process.env.DBHOSTNAME,
    "port":process.env.DBPORT,
    "dialect": "mysql"
  }
}
