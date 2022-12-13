import { BaseRepository } from "../app/repositories/Base/BaseReprository";
import OrderReturns from "../app/entities/OrderReturns";
import sequelize, { Op } from "sequelize";

export default class OrderReturnsRest extends BaseRepository<OrderReturns> {
  FetchOrderReturn = async (req: any, res: any) => {
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

      this._db["order_returns"].belongsTo(this._db["customers"], { foreignKey: "user_id" });
      this._db["order_returns"].belongsTo(this._db["products"], { foreignKey: "product_id" });

      const order_return = await this.findOne(
        {
          where: condition,
          include: [
            { model: this._db["customers"] },
            { model: this._db["products"], },
          ],
        },
        "order_returns"
      );

      if (order_return) {
        res.status(200).json({
          status: 200,
          msg: `Order return details fetched successfully.`,
          order_return,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "No order return details available.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  FetchOrderReturns = async (req: any, res: any) => {
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

      this._db["order_returns"].belongsTo(this._db["customers"], { foreignKey: "user_id" });
      this._db["order_returns"].belongsTo(this._db["products"], { foreignKey: "product_id" });

      const order_returns = await this.findAllByCondition(
        {
          where: condition,
          include: [
            { model: this._db["customers"] },
            { model: this._db["products"], },
          ],
        },
        "order_returns"
      );

      if (order_returns) {
        res.status(200).json({
          status: 200,
          msg: `Order return details fetched successfully.`,
          order_returns,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "No order return details available.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  UpdateOrderReturn = async (req: any, res: any) => {
    try {
      const { order_id = 0, product_id = 0, status } = req.body;
      this._db = req.db;

      const result = await this.updateOrCreate(
        req.body,
        "order_returns",
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
          msg: `Order return has been ${id ? "created" : "updated"} successfully.`
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "Unable to create or update order_return details.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  UpdateOrderReturnList = async (req: any, res: any) => {
    try {
      const { order_id, items } = req.body;
      this._db = req.db;

      console.log("order_id, items >>>>", order_id, items);
      await this.updateByCondition({ where: { order_id } }, { status: 'deleted' }, "order_returns");

      const result =
        items.map(async (item: any) => {
          const { order_id, product_id, quantity, reason } = item;
          if (quantity && quantity > 0) {
            item.status = "active";
            await this.updateOrCreate(
              item,
              "order_returns",
              {
                where: { order_id, product_id, reason },
              },
            );
          }
          // await this.updateByCondition({ where: { order_id, product_id  } }, item, "order_returns");
          return { order_id, product_id };
        })

      if (result) {
        return res.status(200).json({
          status: 200,
          msg: `Order return list has been updated successfully.`
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "Unable to update product list details.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  CreateOrderReturn = async (req: any, res: any) => {
    try {
      const { ref_no = "", order_no = "", items } = req.body;
      this._db = req.db;

      // console.log("order_id, items >>>>", ref_no, order_no, items);
      // await this.updateByCondition({ where: { ref_no } }, { status: 'deleted' }, "order_returns");

      const order_return: any = await this.findOne(
        {
          attributes: [[sequelize.fn('MAX', sequelize.col('ref_no')), 'last_ref_no']],
          where: { ref_no: { [Op.like]: order_no + '-R%' } },
          raw: true,
        },
        "order_returns"
      );

      const prefix = `${order_no}-R`;
      let last_ref_no: string = `${prefix}1`;
      if (order_return) {
        last_ref_no = order_return.last_ref_no?.toUpperCase();
        const series = parseInt("0" + last_ref_no?.replace(prefix, "")) + 1;
        last_ref_no = `${prefix}${series}`
      }

      const result =
        items.map(async (item: any) => {
          const { quantity } = item;
          if (quantity && quantity > 0) {
            item.ref_no = last_ref_no;
            item.status = "active";
            await this.create(item, "order_returns");
          }
          // await this.updateByCondition({ where: { order_id, product_id  } }, item, "order_returns");
          return { ref_no };
        })

      if (result) {
        return res.status(200).json({
          status: 200,
          last_ref_no,
          msg: `Order return list has been updated successfully.`
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "Unable to update product list details.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  DeleteOrderReturn = async (req: any, res: any) => {
    try {
      const { ref_no = "" } = req.body;
      this._db = req.db;
      const result = await this.updateByCondition({ where: { ref_no } }, { status: 'deleted' }, "order_returns");
      if (result) {
        return res.status(200).json({
          status: 200,
          msg: `Order return list has been deleted successfully.`
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "Unable to deleted product list details.",
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