db = db.getSiblingDB('admin');
db.auth("admin", "123");
db = db.getSiblingDB('JamesTestDB');
db.createUser({
  'user': "dbUser",
  'pwd': "dbPwd",
  'roles': [
    {
      'role': 'dbOwner',
      'db': 'DB_test'
    }
  ]
});
db.createCollection('dummy');