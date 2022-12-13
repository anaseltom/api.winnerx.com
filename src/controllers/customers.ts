import { BaseRepository } from "../app/repositories/Base/BaseReprository";
import Customers from "../app/entities/Customers";
import { Op } from "sequelize";

export default class CustomersRest extends BaseRepository<Customers> {
  FetchCustomer = async (req: any, res: any) => {
    try {
      const { id, user_id, email, userName, status } = req.body;

      let condition = {};
      if (id) {
        condition = { ...condition, id };
      }
      if (user_id) {
        condition = { ...condition, user_id };
      }
      if (email) {
        condition = { ...condition, email };
      }
      if (userName) {
        condition = { ...condition, userName };
      }
      if (status) {
        condition = { ...condition, status };
      } else {
        condition = { ...condition, status: { [Op.ne]: "deleted" } };
      }

      this._db = req.db;

      // this._db["users"].hasMany(this._db["users_profile"], { foreignKey: "user_id" });
      // this._db["users"].hasMany(this._db["providers_profile"], { foreignKey: "user_id" });

      const customer = await this.findOne(
        {
          // attributes: { exclude: ["password"] },
          where: condition,
          // include: [
          //   { model: this._db["users_profile"] },
          //   { model: this._db["providers_profile"] },
          // ],
        },
        "customers"
      );

      if (customer) {
        res.status(200).json({
          status: 200,
          msg: `Customer details fetched successfully.`,
          customer,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "No customer details available.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  FetchCustomers = async (req: any, res: any) => {
    try {
      const {
        id,
        user_id,
        customerCode,
        userName,
        keywords,
        status,
      } = req.body;

      let condition = {};
      if (id) {
        condition = { ...condition, id };
      }
      if (user_id) {
        condition = { ...condition, user_id };
      }
      if (customerCode) {
        condition = { ...condition, customerCode };
      }
      if (userName) {
        condition = { ...condition, userName };
      }
      if (keywords) {
        condition = { ...condition, keywords };
      }
      if (status) {
        condition = { ...condition, status };
      } else {
        condition = { ...condition, status: { [Op.ne]: "deleted" } };
      }

      this._db = req.db;

      this._db["customers"].belongsTo(this._db["users"], {
        foreignKey: "user_id",
      });

      const customers = await this.findAllByCondition(
        {
          attributes: { exclude: ["password"] },
          where: condition,
          include: [
            {
              model: this._db["users"],
              attributes: { exclude: ["password"] },
            },
          ],
        },
        "customers"
      );

      if (customers) {
        res.status(200).json({
          status: 200,
          msg: `Customer details fetched successfully.`,
          customers,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "No customer details available.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  DeleteCustomer = async (req: any, res: any) => {};
  UpdateCustomer = async (req: any, res: any) => {
    try {
      // const { email } = req.body;
      const { id = 0 } = req.body;
      // console.log(" req.body>>>>", req.body);
      this._db = req.db;

      const result = await this.updateOrCreate(req.body, "customers", {
        where: { id },
      });

      if (result) {
        const { id } = result.item;
        return res.status(200).json({
          status: 200,
          id,
          msg: `Customer has been ${id ? "created" : "updated"} successfully.`,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "Unable to create or update customer details.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };
}
