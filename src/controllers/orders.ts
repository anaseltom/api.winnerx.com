import { BaseRepository } from "../app/repositories/Base/BaseReprository";
import Orders from "../app/entities/Orders";
import { Op } from "sequelize";
import sequelize from "sequelize";
import { v4 as uuidv4 } from "uuid";
import DeliveriesRest from "./deliveries";
import { format, parseISO } from "date-fns";

export default class OrdersRest extends BaseRepository<Orders> {
  FetchOrder = async (req: any, res: any) => {
    try {
      const { id, customer_id, user_id, status } = req.body;

      let condition = {};
      if (id) {
        condition = { ...condition, id };
      }
      if (customer_id) {
        condition = { ...condition, customer_id };
      }
      if (user_id) {
        condition = { ...condition, user_id };
      }
      if (status) {
        condition = { ...condition, status };
      } else {
        condition = { ...condition, status: { [Op.ne]: "deleted" } };
      }

      this._db = req.db;

      this._db["orders"].hasMany(this._db["order_items"], {
        foreignKey: "order_id",
      });
      this._db["orders"].hasMany(this._db["order_fulfillments"], {
        foreignKey: "order_id",
      });
      this._db["orders"].hasMany(this._db["order_returns"], {
        foreignKey: "order_id",
      });
      // this._db["orders"].hasMany(this._db["order_refunds"], { foreignKey: "order_id" });
      // this._db["orders"].belongsTo(this._db["users"], { foreignKey: "user_id" });
      this._db["orders"].belongsTo(this._db["customers"], {
        foreignKey: "customer_id",
      });
      this._db["orders"].hasOne(this._db["billing_addresses"], {
        foreignKey: "order_id",
      });
      this._db["orders"].hasOne(this._db["shipping_addresses"], {
        foreignKey: "order_id",
      });

      this._db["order_items"].belongsTo(this._db["products"], {
        foreignKey: "product_id",
      });
      this._db["order_fulfillments"].belongsTo(this._db["products"], {
        foreignKey: "product_id",
      });

      // this._db["order_items"].hasOne(this._db["order_returns"], { foreignKey: "order_item_id" });
      // this._db["order_items"].hasOne(this._db["order_refunds"], { foreignKey: "order_item_id" });

      // this._db["users"].hasOne(this._db["customers"], { foreignKey: "user_id" });
      this._db["products"].belongsTo(this._db["sellers"], {
        foreignKey: "seller_id",
      });

      const order = await this.findOne(
        {
          where: condition,
          order: [["created_at", "DESC"]],
          include: [
            // { model: this._db["users"], attributes: ["id"], include: [{ model: this._db["customers"] }] },
            { model: this._db["customers"] },
            {
              model: this._db["order_items"],
              // where: { status: { [Op.ne]: 'deleted' } },
              include: [
                {
                  model: this._db["products"],
                  include: [{ model: this._db["sellers"] }],
                },
                // { model: this._db["order_returns"] },
                // { model: this._db["order_refunds"] },
              ],
            },
            { model: this._db["billing_addresses"] },
            { model: this._db["shipping_addresses"] },
          ],
        },
        "orders"
      );

      if (order) {
        res.status(200).json({
          status: 200,
          msg: `Order details fetched successfully.`,
          order,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "No order details available.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  FetchOrders = async (req: any, res: any) => {
    try {
      const { id, customer_id, user_id, status } = req.body;

      let condition = {},
        condition2 = {};
      if (id) {
        condition = { ...condition, id };
      }
      if (customer_id) {
        condition = { ...condition, customer_id };
      }
      // if (user_id) { condition = { ...condition, user_id }; }
      if (status) {
        condition = { ...condition, status };
      } else {
        condition = { ...condition, status: { [Op.ne]: "deleted" } };
      }

      if (user_id) {
        condition2 = { ...condition2, user_id };
      }

      // console.log("id, customer_id, user_id, status >>>", id, customer_id, user_id, status )
      console.log("condition >>>", condition);
      this._db = req.db;

      this._db["orders"].hasMany(this._db["order_items"], {
        foreignKey: "order_id",
      });
      this._db["orders"].hasMany(this._db["order_fulfillments"], {
        foreignKey: "order_id",
      });
      this._db["orders"].hasMany(this._db["order_returns"], {
        foreignKey: "order_id",
      });
      // this._db["orders"].hasMany(this._db["order_refunds"], { foreignKey: "order_id" });
      // this._db["orders"].belongsTo(this._db["users"], { foreignKey: "user_id" });
      this._db["orders"].belongsTo(this._db["customers"], {
        foreignKey: "customer_id",
      });
      this._db["orders"].hasOne(this._db["billing_addresses"], {
        foreignKey: "order_id",
      });
      this._db["orders"].hasOne(this._db["shipping_addresses"], {
        foreignKey: "order_id",
      });

      this._db["order_items"].belongsTo(this._db["products"], {
        foreignKey: "product_id",
      });
      this._db["order_fulfillments"].belongsTo(this._db["products"], {
        foreignKey: "product_id",
      });

      // this._db["order_items"].hasOne(this._db["order_returns"], { foreignKey: "order_item_id" });
      // this._db["order_items"].hasOne(this._db["order_refunds"], { foreignKey: "order_item_id" });

      this._db["users"].hasOne(this._db["customers"], {
        foreignKey: "user_id",
      });
      this._db["products"].belongsTo(this._db["sellers"], {
        foreignKey: "seller_id",
      });

      // console.log("condition>>>", condition);
      const orders = await this.findAllByCondition(
        {
          where: condition,
          order: [["created_at", "DESC"]],
          include: [
            // { model: this._db["users"], attributes: ["id"], include: [{ model: this._db["customers"] }] },
            { model: this._db["customers"], where: condition2 },
            {
              model: this._db["order_items"],
              // where: { status: { [Op.ne]: 'deleted' } },
              include: [
                {
                  model: this._db["products"],
                  include: [{ model: this._db["sellers"] }],
                },
                // { model: this._db["order_returns"] },
                // { model: this._db["order_refunds"] },
              ],
            },

            {
              model: this._db["order_fulfillments"],
              include: [
                {
                  model: this._db["products"],
                  include: [{ model: this._db["sellers"] }],
                },
              ],
            },
            // { model: this._db["order_returns"], where: { status: { [Op.ne]: 'deleted' } }, },
            { model: this._db["order_returns"] },
            { model: this._db["billing_addresses"] },
            { model: this._db["shipping_addresses"] },
            // { model: this._db["order_refunds"], where: { status: { [Op.ne]: 'deleted' } }, },
          ],
        },
        "orders"
      );

      if (orders) {
        res.status(200).json({
          status: 200,
          msg: `Order details fetched successfully.`,
          orders,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "No order details available.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  UpdateOrder = async (req: any, res: any) => {
    try {
      const {
        id = 0,
        customer_id,
        items,
        shipping_address,
        status,
        user_addresses,
        ref = null,
      } = req.body;

      // console.log(" req.body>>>>", req.body.items);
      this._db = req.db;

      if (ref) {
        const orderByRefrence = await this.findOne(
          {
            where: { refrence: ref },
          },
          "orders"
        );
        if (orderByRefrence) {
          return res.status(401).send({ msg: "refrence already exists" });
        }
      }

      if (id === 0) {
        const order: any = await this.findOne(
          {
            attributes: [
              [sequelize.fn("MAX", sequelize.col("order_no")), "last_order_no"],
            ],
            raw: true,
          },
          "orders"
        );
        req.body.order_no = "10001";
        if (order) {
          const { last_order_no } = order;
          if (last_order_no) {
            req.body.order_no = parseInt(last_order_no) + 1;
          }
        }
      }

      items?.map(async (val: any) => {
        const product: any = await this.findOne(
          {
            where: { id: val.product_id },
          },
          "products"
        );
        await this.updateByCondition(
          { where: { id: val.product_id } },
          {
            units_in_stock: product.dataValues.units_in_stock -= val.quantity,
          },
          "products"
        );
      });

      const result = await this.updateOrCreate(req.body, "orders", {
        where: { id },
      });

      let order_id: number = id;
      if (id === 0) {
        order_id = result.item.id;
      }

      await this.updateByCondition(
        { where: { order_id } },
        { status: "deleted" },
        "order_items"
      );

      if (user_addresses) {
        await this.updateOrCreate(user_addresses, "user_addresses", {
          where: { id: user_addresses?.id || 0 },
        });
      }

      if (shipping_address) {
        shipping_address.order_id = order_id;
        // shipping_address.customer_id = user_id;
        shipping_address.customer_id = customer_id;

        // await this.updateByCondition({ where: { order_id } }, shipping_address, "shipping_addresses");
        await this.updateOrCreate(shipping_address, "shipping_addresses", {
          where: { order_id },
        });
      }
      // if (items) {

      let total_quantity = 0,
        total_price = 0;
      await Promise.all(
        items.map(async (item: any) => {
          const { product_id } = item;
          item.order_id = order_id;
          total_quantity += item.quantity;
          if (item.quantity) {
            total_price += item.quantity * item.price;
          }
          // item.total_quantity=total_quantity;
          // item.total_price=total_price;
          await this.updateOrCreate(item, "order_items", {
            where: { order_id, product_id },
          });
          if (item?.deal_id) {
            // console.log("item >>>>", item)
            /***
              order_id: DataTypes.INTEGER, 
              customer_id: DataTypes.INTEGER,
              deal_id: DataTypes.INTEGER,
              entry_code: DataTypes.STRING, 
               { deal_id: 1, product_id: 1, quantity: 11, price: 11.2, order_id: 1 }
               */
            const { deal_id, quantity, product_id } = item;
            const MAX_ENTRY_CODE = 8;

            await this.updateByCondition(
              { where: { order_id, deal_id } },
              { status: "deleted" },
              "deal_entries"
            );

            let entries = JSON.parse(JSON.stringify(item));
            // console.log("entries >>>>", entries);
            for (let i = 0; i < quantity; i++) {
              // entries = { ...entries, customer_id: user_id, product_id, entry_code: uuidv4().replace("-", "").toUpperCase().substring(0, MAX_ENTRY_CODE) }
              entries = {
                ...entries,
                customer_id,
                product_id,
                entry_code: uuidv4()
                  .replace("-", "")
                  .toUpperCase()
                  .substring(0, MAX_ENTRY_CODE),
              };
              this.create(entries, "deal_entries");
            }
            /**********
             await this.updateOrCreate(
               entries,
               "deal_entries",
               {
                 where: { order_id, deal_id },
               },
             );
             */
          }
        })
      );
      // }
      // console.log(
      //   "id, total_quantity, total_price >>>",
      //   order_id,
      //   total_quantity,
      //   total_price
      // );

      req.body.id = order_id;
      await new DeliveriesRest().DeliveryOrders(req, res);
      let package_status = res?.data?.result?.orderStatus;
      if (package_status === "PENDING") {
        package_status = "Order Created";
      }
      console.log("package_status >>>", package_status);

      await this.updateByCondition(
        { where: { id: order_id } },
        { total_quantity, total_price, package_status },
        "orders"
      );
      if (result) {
        const { id } = result.item;
        return res.status(200).json({
          status: 200,
          id,
          msg: `Order has been ${id ? "created" : "updated"} successfully.`,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "Unable to create or update order details.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  Test = async (req: any, res: any) => {
    try {
      const { id = 0, customer_id, items, shipping_address, status } = req.body;

      const deliveries = new DeliveriesRest();
      await deliveries.DeliveryOrders(req, res);

      const package_status = res.data.result.orderStatus;
      console.log("package_status >>>", package_status);

      return res.status(200).json(res.data);
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  getSum = (table: any, fieldName: string) => {
    return table?.reduce((total: number, item: any) => {
      // console.log(">>>>>>>>>>>>>>>>",item?.deleted, item[fieldName])
      return (
        total + (item?.status === "deleted" ? 0 : parseFloat(item[fieldName]))
      );
    }, 0);
  };

  formatDate = (objDate: any, dateFormat: string = "yyyy-MM-dd") => {
    const str_date = typeof objDate === "string" ? parseISO(objDate) : objDate;
    return format(str_date, dateFormat);
  };

  Summary = async (req: any, res: any) => {
    try {
      // const { id, customer_id, user_id, status } = req.body;

      this._db = req.db;

      let summary: any = [];
      const customers = await this.findAllByCondition(
        { where: { status: { [Op.ne]: "deleted" } } },
        "customers"
      );
      const orders = await this.findAllByCondition(
        { where: { status: { [Op.ne]: "deleted" } } },
        "orders"
      );

      const monthly = orders.reduce((group: any, order: any) => {
        const { created_at, total_price, status } = order;
        const month = this.formatDate(created_at, "MMMM");
        const year_month = this.formatDate(created_at, "yyyy-MM");
        let total: number =
          parseFloat("0" + group[month]?.total) +
          (status === "deleted" ? 0 : parseFloat(total_price));
        group[year_month] = { ...group[year_month], name: month, total };
        return group;
      }, {});

      const earnings_monthly: any = Object.keys(monthly).map((key: any) => {
        console.log("monthly[key]>>>", monthly[key]);
        return monthly[key];
      });

      const earnings = this.getSum(orders, "total_price");
      const earnings_today = this.getSum(
        orders.filter((f: any) => {
          return this.formatDate(f.created_at) === this.formatDate(Date.now());
        }),
        "total_price"
      );
      const balance = this.getSum(orders, "total_price");

      summary = [
        ...summary,
        {
          customers: customers.length,
          orders: orders.length,
          earnings,
          balance,
          earnings_today,
          earnings_monthly,
        },
      ];
      console.log("here >>>");
      if (summary) {
        res.status(200).json({
          status: 200,
          msg: `Summary details fetched successfully.`,
          summary,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "No summary details available.",
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
