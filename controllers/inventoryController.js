const connection = require("../config.js");

module.exports = {
  Get: async (req, res, next) => {
    const { limit } = req.params;

    if (limit) {
      connection.execute("SELECT * FROM inventory LIMIT ?", [limit], function(
        err,
        results
      ) {
        if (err) {
          res.status(400);
        } else {
          res.json(results);
        }
      });
    } else {
      connection.query(
        "SELECT * FROM inventory WHERE `is_status` = 1",
        function(err, results) {
          if (err) {
            res.status(400);
          } else {
            res.json(results);
          }
        }
      );
    }
  },
  GetDetail: async (req, res, next) => {
    const id = req.params.id;

    connection.execute(
      "SELECT * FROM inventory WHERE `product_id` = ?",
      [id],
      function(err, results) {
        if (err) {
          res.status(400);
        } else {
          res.json(results);
        }
      }
    );
  },
  CreateData: async (req, res, next) => {
    const { name, description, quantity, price, category_id } = req.body;
    try {
      connection.execute(
        "INSERT INTO `inventory`(`name`, `description`, `quantity`, `price`, `category_id`) VALUES (?,?,?,?,?)",
        [name, description, quantity, price, category_id],
        function(err, results) {
          if (err) {
            res.json({
              status: false,
              message: "error"
            });
          } else {
            res.json({
              status: true,
              message: "success"
            });
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
  UpdateData: async (req, res, next) => {
    const { id, name, description, quantity, price, category_id } = req.body;
    try {
      connection.execute(
        "UPDATE `inventory` SET `name`= ?,`description`= ?,`quantity`= ?,`price`= ?,`category_id`= ?,`updated_at`= ? WHERE product_id = ?",
        [name, description, quantity, price, category_id, Date.now(), id],
        function(err, results) {
          if (err) {
            res.json({
              status: false,
              message: "error"
            });
          } else {
            res.json({
              status: true,
              message: "success"
            });
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
  DeleteData: async (req, res, next) => {
    const { id } = req.body;
    try {
      connection.execute(
        "UPDATE `inventory` SET `is_status`= 0 WHERE product_id = ?",
        [id],
        function(err, results) {
          if (err) {
            res.json({
              status: false,
              message: "error"
            });
          } else {
            res.json({
              status: true,
              message: "success"
            });
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
};
