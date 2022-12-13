import { BaseRepository } from "../app/repositories/Base/BaseReprository";
import OrderFulfillments from "../app/entities/OrderFulfillments";
import sequelize, { Op } from "sequelize";
import DeliveriesRest from "./deliveries";

export default class OrderFulfillmentsRest extends BaseRepository<OrderFulfillments> {
  FetchOrderFulfillment = async (req: any, res: any) => {
    try {
      const { id, user_id, order_id, product_id, status } = req.body;

      let condition = {};
      if (id) { condition = { ...condition, id }; }

      if (user_id) { condition = { ...condition, user_id }; }
      if (order_id) { condition = { ...condition, order_id }; }
      if (product_id) { condition = { ...condition, product_id }; }
      if (status) { condition = { ...condition, status }; }

      this._db = req.db;

      // this._db["order_fulfillments"].belongsTo(this._db["customers"], { foreignKey: "user_id" });
      this._db["order_fulfillments"].belongsTo(this._db["products"], { foreignKey: "product_id" });

      const order_fulfillment = await this.findOne(
        {
          where: condition,
          include: [
            // { model: this._db["customers"] },
            { model: this._db["products"], },
          ],
        },
        "order_fulfillments"
      );

      if (order_fulfillment) {
        res.status(200).json({
          status: 200,
          msg: `Order item fulfillment details fetched successfully.`,
          order_fulfillment,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "No order item fulfillment details available.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  FetchOrderFulfillments = async (req: any, res: any) => {
    try {
      const { id, user_id, order_id, product_id, status } = req.body;

      let condition = {};
      if (id) { condition = { ...condition, id }; }

      if (user_id) { condition = { ...condition, user_id }; }
      if (order_id) { condition = { ...condition, order_id }; }
      if (product_id) { condition = { ...condition, product_id }; }
      if (status) { condition = { ...condition, status }; }

      this._db = req.db;

      // this._db["order_fulfillments"].belongsTo(this._db["customers"], { foreignKey: "user_id" });
      this._db["order_fulfillments"].belongsTo(this._db["products"], { foreignKey: "product_id" });

      const order_fulfillments = await this.findAllByCondition(
        {
          where: condition,
          include: [
            // { model: this._db["customers"] },
            { model: this._db["products"], },
          ],
        },
        "order_fulfillments"
      );

      if (order_fulfillments) {
        res.status(200).json({
          status: 200,
          msg: `Order item fulfillment details fetched successfully.`,
          order_fulfillments,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "No order item fulfillment details available.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  CreateOrderFulfillment = async (req: any, res: any) => {
    try {
      const { order_id, order_no = "", items } = req.body;
      this._db = req.db;

      if (order_id) {
        await this.updateByCondition({ where: { id: order_id } }, { package_status: "Ready for shipment" }, "orders");
       
        const deliveries = new DeliveriesRest();
        req.body.orderId = order_id;
        req.body.readyForDelivery = true;
        await deliveries.DeliveryUpdate(req, res);
      }

      const order_fulfillment: any = await this.findOne(
        {
          attributes: [[sequelize.fn('MAX', sequelize.col('ref_no')), 'last_ref_no']],
          where: { ref_no: { [Op.like]: order_no + '-F%' } },
          raw: true,
        },
        "order_fulfillments"
      );

      const prefix = `${order_no}-F`;
      let last_ref_no: string = `${prefix}1`;
      if (order_fulfillment) {
        last_ref_no = order_fulfillment.last_ref_no?.toUpperCase();
        const series = parseInt("0" + last_ref_no?.replace(prefix, "")) + 1;
        last_ref_no = `${prefix}${series}`
      }

      console.log("last_ref_no >>>", last_ref_no)
      const result =
        await Promise.all(items.map(async (item: any) => {
          const { quantity } = item;
          if (quantity && quantity > 0) {
            item.ref_no = last_ref_no;
            item.status = "active";
            const order = await this.create(item, "order_fulfillments");
            if (order) {
              await this.updateByCondition(
                { where: { id: item.product_id } },
                { units_in_stock: sequelize.literal(`units_in_stock - ${quantity}`) },
                "products");

              const { order_id, product_id } = item;
              await this.updateByCondition(
                { where: { order_id, product_id } },
                { fulfillment_status: 'fulfilled' },
                "order_items");
            }
          }
          return { last_ref_no };
        }))

      if (result) {
        this._db["order_fulfillments"].belongsTo(this._db["products"], { foreignKey: "product_id" });
        const order_fulfillments = await this.findAllByCondition(
          {
            where: { ref_no: { [Op.like]: order_no + '-F%' } },
            include: [
              { model: this._db["products"], },
            ],
          },
          "order_fulfillments"
        );
        return res.status(200).json({
          status: 200,
          order_fulfillments,
          // last_ref_no,
          msg: `Order item fulfillment list has been created successfully.`
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "Unable to create order item fulfillment details.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  UpdateOrderFulfillment = async (req: any, res: any) => {
    try {
      const { ref_no = "" } = req.body;
      this._db = req.db;
      const result = await this.updateByCondition({ where: { ref_no } }, req.body, "order_fulfillments");
      if (result) {
        return res.status(200).json({
          status: 200,
          msg: `Order fulfillment has been updated successfully.`
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "Unable to updated order fulfillment list details.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  DeleteOrderFulfillment = async (req: any, res: any) => {
    try {
      const { order_id, ref_no = "" } = req.body;
      this._db = req.db;


      console.log("order_id >>>", order_id);

      if (order_id) {
        await this.updateByCondition({ where: { id: order_id } }, { package_status: "Order Created" }, "orders");
      }

      const result = await this.updateByCondition({ where: { ref_no } }, { status: 'deleted' }, "order_fulfillments");
      if (result) {

        const deliveries = new DeliveriesRest();
        req.body.orderId = order_id;
        req.body.readyForDelivery = false;
        await deliveries.DeliveryUpdate(req, res);

        return res.status(200).json({
          status: 200,
          msg: `Order fulfillment has been deleted successfully.`
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "Unable to deleted order fulfillment list details.",
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