const connection = require("../config.js");

module.exports = {
  Get: async (req, res, next) => {
    const { limit } = req.params;

    if (limit) {
      connection.execute("SELECT * FROM receipts LIMIT ?", [limit], function(
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
      connection.query("SELECT * FROM receipts WHERE `is_status` = 1", function(
        err,
        results
      ) {
        if (err) {
          res.status(400);
        } else {
          res.json(results);
        }
      });
    }
  },
  GetDetail: async (req, res, next) => {
    const id = req.params.id;

    connection.execute(
      "SELECT * FROM receipts WHERE `product_id` = ?",
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
    const { product_id, quantity, date } = req.body;
    try {
      connection.execute(
        "INSERT INTO `receipts`(`product_id`, `quantity`, `date`) VALUES (?,?,?)",
        [product_id, quantity, date],
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
    const { id, product_id, quantity, date } = req.body;
    try {
      connection.execute(
        "UPDATE `receipts` SET `product_id` = ?, `quantity`  = ?, `date`  = ? WHERE receipt_id = ?",
        [product_id, quantity, date, id],
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
        "UPDATE `receipts` SET `is_status`= 0 WHERE receipt_id = ?",
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
