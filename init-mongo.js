db = db.getSiblingDB('solomon');

db.createUser({
  user: "root",
  pwd: "root",
  roles: [{ role: "readWrite", db: "solomon" }]
});

print("Usuário criado com sucesso para o banco 'solomon'.");
