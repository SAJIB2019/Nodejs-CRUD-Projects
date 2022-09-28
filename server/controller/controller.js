var Userdb = require("../model/model");

//create and save new user

exports.create = (req, res) => {
  //validate request
  if (!req.body) {
    res.status(400).send({ message: "content can not be empty" });
    return;
  }

  //new user
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  //sava user in the database
  user
    .save(user)
    .then((data) => {
      //res.send(data);
      res.redirect("/add-user");
    })

    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred white creating a create operation",
      });
    });
};

//retrieve and return all users / retrive and return a single user
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found user with id" + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error retrieving with id" + id });
      });
  } else {
    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error occured white entered information",
        });
      });
  }
};

//Update a new identified user by user id

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }

  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })

    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with ${id}.May be user not found`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error update user information" });
    });
};

//delete a user with specified id in hte request

exports.delete = (req, res) => {
  const id = req.params.id;
  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Can not Delete with id${id} May be this is wrong`,
        });
      } else {
        res.send({
          message: "User was deleted successfully",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Message could not delete User with id=" + id,
      });
    });
};
