import { BaseRepository } from "../app/repositories/Base/BaseReprository";
import DealProducts from "../app/entities/DealProducts";
import { Op } from "sequelize";

export default class DealProductsRest extends BaseRepository<DealProducts> {
  FetchDealProduct = async (req: any, res: any) => {
    try {
      const { id, item_name, product_id, status } = req.body;

      let condition = {};
      if (id) { condition = { ...condition, id }; }
      if (item_name) { condition = { ...condition, item_name: { [Op.like]: '%' + item_name + '%' } }; }
      if (product_id) { condition = { ...condition, product_id }; }
      if (status) { condition = { ...condition, status }; }
      else { condition = { ...condition, status: { [Op.ne]: 'deleted' } }; }

      this._db = req.db;
      this._db["deal_products"].belongsTo(this._db["products"], { foreignKey: "product_id" });

      const deal_product = await this.findOne(
        {
          where: condition,
          include: [
            { model: this._db["products"] },
          ],
        },
        "deal_products"
      );

      if (deal_product) {
        res.status(200).json({
          status: 200,
          msg: `Deal product details fetched successfully.`,
          deal_product,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "No deal product details available.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  FetchDealProducts = async (req: any, res: any) => {
    try {
      const { id, item_name, product_id, status } = req.body;

      let condition = {};
      if (id) { condition = { ...condition, id }; }
      if (item_name) { condition = { ...condition, item_name: { [Op.like]: '%' + item_name + '%' } }; }
      if (product_id) { condition = { ...condition, product_id }; }
      if (status) { condition = { ...condition, status }; }
      else { condition = { ...condition, status: { [Op.ne]: 'deleted' } }; }

      this._db = req.db;
      this._db["deal_products"].belongsTo(this._db["products"], { foreignKey: "product_id" });

      const deal_products = await this.findAllByCondition(
        {
          where: condition,
          include: [
            { model: this._db["products"] },
          ],
        },
        "deal_products"
      );

      if (deal_products) {
        res.status(200).json({
          status: 200,
          msg: `Deal product details fetched successfully.`,
          deal_products,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "No deal product details available.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  // FetchProducts = async (req: any, res: any) => {
  //   try {
  //     const { id, item_name, product_id, status } = req.body;

  //     let condition = {};
  //     if (id) { condition = { ...condition, id }; }
  //     // if (item_name) { condition = { ...condition, item_name: { [Op.like]: '%' + item_name + '%' } }; }
  //     // if (product_id) { condition = { ...condition, product_id }; }
  //     // if (status) { condition = { ...condition, status }; }
  //     else { condition = { ...condition, status: { [Op.ne]: 'deleted' } }; }

  //     this._db = req.db;
  //     this._db["deal_products"].belongsTo(this._db["products"], { foreignKey: "product_id" });

  //     // this._db = req.db;

  //     // this._db["products"].belongsTo(this._db["deal_products"], { foreignKey: "product_id" });

  //     const products = await this.findAllByCondition(
  //       { 
  //         where: condition,
  //         include: [
  //           { model: this._db["deal_products"] },
  //         ],
  //       },
  //       "products"
  //     );

  //     if (products) {
  //       res.status(200).json({
  //         status: 200,
  //         msg: `Product details fetched successfully.`,
  //         products,
  //       });
  //     } else {
  //       res.status(200).json({
  //         status: 500,
  //         msg: "No product details available.",
  //       });
  //     }
  //   } catch (err) {
  //     res.status(500).json({
  //       status: 500,
  //       msg: `Something went wrong while processing your request. ERR: ${err}`,
  //     });
  //   }
  // };

  UpdateDealProduct = async (req: any, res: any) => {
    try {
      const { deal_id = 0, items } = req.body;
      this._db = req.db;

      await this.updateByCondition({ where: { deal_id } }, { status: 'deleted' }, "deal_products");

      const result = items.map(async (item: any) => {
        const { deal_id, product_id, quantity_max } = item;
        // console.log("item >>>>",  items)
        if (quantity_max && quantity_max > 0) {
          item.status = "active";
          await this.updateOrCreate(
            item,
            "deal_products",
            {
              where: { deal_id, product_id },
            },
          );
        }

      })


      if (result) {
        // const { id } = result.item;
        return res.status(200).json({
          status: 200,
          // result
          // id,
          // msg: `Deal product has been ${id ? "created" : "updated"} successfully.`
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "Unable to create or update deal product details.",
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
