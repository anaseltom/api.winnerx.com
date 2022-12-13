import { BaseRepository } from "../app/repositories/Base/BaseReprository";
import BillingAddresses from "../app/entities/BillingAddresses";

export default class BillingAddressesRest extends BaseRepository<BillingAddresses> {
  FetchBillingAddress = async (req: any, res: any) => {
    try {
      const { id, order_id, customer_id,  status } = req.body;

      let condition = {};
      if (id) { condition = { ...condition, id }; }
      if (order_id) { condition = { ...condition, order_id }; }
      if (customer_id) { condition = { ...condition, customer_id }; }
      if (status) { condition = { ...condition, status }; }

      this._db = req.db;

      const billing_address = await this.findOne(
        {
          where: condition,

        },
        "billing_addresses"
      );


      if (billing_address) {
        res.status(200).json({
          status: 200,
          msg: `Billing address details fetched successfully.`,
          billing_address,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "No billing address details available.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  FetchBillingAddresses = async (req: any, res: any) => {
    try {
      const { id, order_id, customer_id,  status } = req.body;

      let condition = {};
      if (id) { condition = { ...condition, id }; }
      if (order_id) { condition = { ...condition, order_id }; }
      if (customer_id) { condition = { ...condition, customer_id }; }
      if (status) { condition = { ...condition, status }; }

      this._db = req.db;

      const billing_addresses = await this.findAllByCondition(
        {
          where: condition,
        },
        "billing_addresses"
      );

      if (billing_addresses) {
        res.status(200).json({
          status: 200,
          msg: `Billing address details fetched successfully.`,
          billing_addresses,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "No billing address details available.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  UpdateBillingAddress = async (req: any, res: any) => {
    try {

      // const { id = 0 } = req.body;
      const { order_id, customer_id } = req.body;
      // console.log(" req.body>>>>", req.body);
      this._db = req.db;

      const result = await this.updateOrCreate(
        req.body,
        "billing_addresses",
        {
          where: { order_id, customer_id },
        },
      );

      if (result) {
        const { id } = result.item;
        return res.status(200).json({
          status: 200,
          id,
          msg: `Billing address has been ${id ? "created" : "updated"} successfully.`
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "Unable to create or update billing address details.",
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
