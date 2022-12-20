import { BaseRepository } from "../app/repositories/Base/BaseReprository";
import UserAddresses from "../app/entities/UserAddresses";

export default class ShippingAddressesRest extends BaseRepository<
  UserAddresses
> {
  FetchUserAddress = async (req: any, res: any) => {
    try {
      const { id, customer_id, status } = req.body;

      let condition = {};
      if (id) {
        condition = { ...condition, id };
      }
      if (customer_id) {
        condition = { ...condition, customer_id };
      }
      if (status) {
        condition = { ...condition, status };
      }

      this._db = req.db;

      const user_address = await this.findOne(
        {
          where: condition,
        },
        "user_addresses"
      );

      if (user_address) {
        res.status(200).json({
          status: 200,
          msg: `User address details fetched successfully.`,
          user_address,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "No User address details available.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  FetchUserAddresses = async (req: any, res: any) => {
    try {
      const { id, customer_id, status } = req.body;

      let condition = {};
      if (id) {
        condition = { ...condition, id };
      }

      if (customer_id) {
        condition = { ...condition, customer_id };
      }
      if (status) {
        condition = { ...condition, status };
      }

      this._db = req.db;

      const user_addresses = await this.findAllByCondition(
        {
          where: condition,
        },
        "user_addresses"
      );

      if (user_addresses) {
        res.status(200).json({
          status: 200,
          msg: `User address details fetched successfully.`,
          user_addresses,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "No user address details available.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  UpdateUserAddress = async (req: any, res: any) => {
    try {
      const { id = 0, status = "active" } = req.body;
      const { customer_id } = req.body;
      // console.log(" req.body>>>>", req.body);
      this._db = req.db;

      const result = await this.updateOrCreate(
        { ...req.body, status },
        "user_addresses",
        {
          where: { id },
        }
      );

      if (result) {
        const { newId } = result.item;
        return res.status(200).json({
          status: 200,
          id: newId,
          msg: `User address has been ${
            id == 0 ? "created" : "updated"
          } successfully.`,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "Unable to create or update user address details.",
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
