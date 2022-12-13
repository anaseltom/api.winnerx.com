import { BaseRepository } from "../app/repositories/Base/BaseReprository";
import OrderRefunds from "../app/entities/OrderRefunds";
import { Op } from "sequelize";

export default class OrderRefundsRest extends BaseRepository<OrderRefunds> {
  FetchOrderRefund = async (req: any, res: any) => {
    try {
      const { id, user_id, order_id, product_id, package_status, status } = req.body;

      let condition = {};
      if (id) { condition = { ...condition, id }; }


      if (user_id) { condition = { ...condition, user_id }; }
      if (order_id) { condition = { ...condition, order_id }; }
      if (product_id) { condition = { ...condition, product_id }; }
      if (package_status) { condition = { ...condition, package_status }; }
      if (status) { condition = { ...condition, status }; }

      this._db = req.db;

      this._db["order_refunds"].belongsTo(this._db["customers"], { foreignKey: "user_id" });
      this._db["order_refunds"].belongsTo(this._db["products"], { foreignKey: "product_id" });

      const order_refund = await this.findOne(
        {
          where: condition,
          include: [
            { model: this._db["customers"] },
            { model: this._db["products"], },
          ],
        },
        "order_refunds"
      );

      if (order_refund) {
        res.status(200).json({
          status: 200,
          msg: `Order refund details fetched successfully.`,
          order_refund,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "No order refund details available.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  FetchOrderRefunds = async (req: any, res: any) => {
    try {
      const { id, user_id, order_id, product_id, package_status, status } = req.body;

      let condition = {};
      if (id) { condition = { ...condition, id }; }


      if (user_id) { condition = { ...condition, user_id }; }
      if (order_id) { condition = { ...condition, order_id }; }
      if (product_id) { condition = { ...condition, product_id }; }
      if (package_status) { condition = { ...condition, package_status }; }
      if (status) { condition = { ...condition, status }; }

      this._db = req.db;

      this._db["order_refunds"].belongsTo(this._db["customers"], { foreignKey: "user_id" });
      this._db["order_refunds"].belongsTo(this._db["products"], { foreignKey: "product_id" });

      const order_refunds = await this.findAllByCondition(
        {
          where: condition,
          include: [
            { model: this._db["customers"] },
            { model: this._db["products"], },
          ],
        },
        "order_refunds"
      );

      if (order_refunds) {
        res.status(200).json({
          status: 200,
          msg: `Order refund details fetched successfully.`,
          order_refunds,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "No order refund details available.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  UpdateOrderRefund = async (req: any, res: any) => {
    try {
      const { order_id = 0, product_id = 0, status } = req.body;
      this._db = req.db;

      const result = await this.updateOrCreate(
        req.body,
        "order_refunds",
        {
          where: { order_id, product_id },
        },
      );

      if (result) {
        if (!(order_id === 0 && product_id === 0)) {
          await this.updateByCondition({ where: { order_id, product_id } }, { status }, "order_items");
          if (status.toLowerCase().includes('refund')) {
            console.log("status >>>>", status)
            await this.updateByCondition({ where: { id: order_id } }, { payment_status: status }, "orders");
          }
        }

        const { id } = result.item;
        return res.status(200).json({
          status: 200,
          id,
          msg: `Order refund has been ${id ? "created" : "updated"} successfully.`
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "Unable to create or update order_refund details.",
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
