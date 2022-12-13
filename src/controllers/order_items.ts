import { BaseRepository } from "../app/repositories/Base/BaseReprository";
import OrderItems from "../app/entities/OrderItems";
import { Op } from "sequelize";

export default class OrderItemsRest extends BaseRepository<OrderItems> {
  FetchOrderItem = async (req: any, res: any) => {
    try {
      const { id, order_id, product_id, seller_id, status } = req.body;

      let condition = {};
      if (id) { condition = { ...condition, id }; }
      if (order_id) { condition = { ...condition, order_id }; }
      if (product_id) { condition = { ...condition, product_id }; }
      if (seller_id) { condition = { ...condition, seller_id }; }
      if (status) { condition = { ...condition, status }; }
      else { condition = { ...condition, status: { [Op.ne]: 'deleted' } }; }

      this._db = req.db;

      this._db["order_items"].belongsTo(this._db["products"], { foreignKey: "product_id" });
      this._db["products"].belongsTo(this._db["sellers"], { foreignKey: "seller_id" });

      const order_item = await this.findOne(
        {
          where: condition,
          include: [
            {
              model: this._db["products"],
              include: [{ model: this._db["sellers"] }]
            }
          ]
        },
        "order_items"
      );

      if (order_item) {
        res.status(200).json({
          status: 200,
          msg: `Order item details fetched successfully.`,
          order_item,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "No order item details available.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  FetchOrderItems = async (req: any, res: any) => {
    try {
      const { id, order_id, product_id, seller_id, status } = req.body;

      let condition = {};
      if (id) { condition = { ...condition, id }; }
      if (order_id) { condition = { ...condition, order_id }; }
      if (product_id) { condition = { ...condition, product_id }; }
      if (seller_id) { condition = { ...condition, seller_id }; }
      if (status) { condition = { ...condition, status }; }
      else { condition = { ...condition, status: { [Op.ne]: 'deleted' } }; }

      this._db = req.db;

      this._db["order_items"].belongsTo(this._db["products"], { foreignKey: "product_id" });
      this._db["products"].belongsTo(this._db["sellers"], { foreignKey: "seller_id" });

      const order_items = await this.findAllByCondition(
        {
          where: condition,
          include: [
            {
              model: this._db["products"],
              include: [{ model: this._db["sellers"] }]
            }
          ]
        },
        "order_items"
      );

      if (order_items) {
        res.status(200).json({
          status: 200,
          msg: `OrderItem details fetched successfully.`,
          order_items,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "No order item details available.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  UpdateOrderItem = async (req: any, res: any) => {
    try {
      // const { email } = req.body;
      const { id = 0 } = req.body;
      // console.log(" req.body>>>>", req.body);
      this._db = req.db;

      const result = await this.updateOrCreate(
        req.body,
        "order_items",
        {
          where: { id },
        },
      );

      if (result) {
        const { id } = result.item;
        return res.status(200).json({
          status: 200,
          id,
          msg: `OrderItem has been ${id ? "created" : "updated"} successfully.`
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "Unable to create or update order_item details.",
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
