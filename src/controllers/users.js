const usersService = require('../servises/users');

const getAll = (req, res) => {
  const users = usersService.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;
  const foundUser = usersService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(422);

    return;
  }

  const newUser = usersService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const isUser = usersService.getById(userId);

  if (!isUser) {
    res.sendStatus(404);

    return;
  }

  usersService.remove(userId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  const foundUser = usersService(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  if (!name) {
    res.sendStatus(400);

    return;
  }

  usersService.edit(foundUser, name);

  res.statusCode = 200;
  res.send(foundUser);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};