const Users = require('./auth.controller');
module.exports = (router) => {

  router.post('/register', Users.createUser);
  router.post('/login', Users.loginUser);
  router.get('/list', Users.getUsers);
  router.post('/listForRole', Users.getUsersForRole);
  router.post('/findById', Users.findById);
  router.post('/findById/:id', Users.findByIdByParams);
  router.delete('/:id', Users.deleteUser);
  router.put('/edit', Users.editUser);
}