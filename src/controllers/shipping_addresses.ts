import { BaseRepository } from "../app/repositories/Base/BaseReprository";
import ShippingAddresses from "../app/entities/ShippingAddresses";

export default class ShippingAddressesRest extends BaseRepository<
  ShippingAddresses
> {
  FetchShippingAddress = async (req: any, res: any) => {
    try {
      const { id, order_id, customer_id, status } = req.body;

      let condition = {};
      if (id) {
        condition = { ...condition, id };
      }
      if (order_id) {
        condition = { ...condition, order_id };
      }
      if (customer_id) {
        condition = { ...condition, customer_id };
      }
      if (status) {
        condition = { ...condition, status };
      }

      this._db = req.db;

      const shipping_address = await this.findOne(
        {
          where: condition,
        },
        "shipping_addresses"
      );

      if (shipping_address) {
        res.status(200).json({
          status: 200,
          msg: `Shipping address details fetched successfully.`,
          shipping_address,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "No shipping address details available.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  FetchShippingAddresses = async (req: any, res: any) => {
    try {
      const { id, order_id, customer_id, status } = req.body;

      let condition = {};
      if (id) {
        condition = { ...condition, id };
      }
      if (order_id) {
        condition = { ...condition, order_id };
      }
      if (customer_id) {
        condition = { ...condition, customer_id };
      }
      if (status) {
        condition = { ...condition, status };
      }

      this._db = req.db;

      const shipping_addresses = await this.findAllByCondition(
        {
          where: condition,
        },
        "shipping_addresses"
      );

      if (shipping_addresses) {
        res.status(200).json({
          status: 200,
          msg: `Shipping address details fetched successfully.`,
          shipping_addresses,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "No shipping address details available.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  UpdateShippingAddress = async (req: any, res: any) => {
    try {
      // const { id = 0 } = req.body;
      const { order_id, customer_id } = req.body;
      // console.log(" req.body>>>>", req.body);
      this._db = req.db;

      const result = await this.updateOrCreate(req.body, "shipping_addresses", {
        where: { order_id, customer_id },
      });

      if (result) {
        const { id } = result.item;
        return res.status(200).json({
          status: 200,
          id,
          msg: `Shipping address has been ${
            id ? "created" : "updated"
          } successfully.`,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "Unable to create or update shipping address details.",
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
