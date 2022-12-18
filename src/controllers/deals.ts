import { BaseRepository } from "../app/repositories/Base/BaseReprository";
import Deals from "../app/entities/Deals";
import { Op, where } from "sequelize";

export default class DealsRest extends BaseRepository<Deals> {
  FetchDeal = async (req: any, res: any) => {
    try {
      const { id, item_name, product_id, status } = req.body;

      let condition = {};
      if (id) {
        condition = { ...condition, id };
      }
      if (item_name) {
        condition = {
          ...condition,
          item_name: { [Op.like]: "%" + item_name + "%" },
        };
      }
      if (product_id) {
        condition = { ...condition, product_id };
      }
      if (status) {
        condition = { ...condition, status };
      } else {
        condition = { ...condition, status: { [Op.ne]: "deleted" } };
      }

      this._db = req.db;
      this._db["deals"].hasMany(this._db["deal_products"], {
        foreignKey: "deal_id",
      });
      this._db["deal_products"].belongsTo(this._db["products"], {
        foreignKey: "product_id",
      });

      const deal = await this.findOne(
        {
          where: condition,
          include: [
            {
              model: this._db["deal_products"],
              include: [{ model: this._db["products"] }],
            },
          ],
        },
        "deals"
      );

      if (deal) {
        res.status(200).json({
          status: 200,
          msg: `Deal details fetched successfully.`,
          deal,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "No deal details available.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  FetchDeals = async (req: any, res: any) => {
    try {
      const { id, item_name, product_id, status } = req.body;

      let condition = {};
      if (id) {
        condition = { ...condition, id };
      }
      if (item_name) {
        condition = {
          ...condition,
          item_name: { [Op.like]: "%" + item_name + "%" },
        };
      }
      if (product_id) {
        condition = { ...condition, product_id };
      }
      if (status) {
        condition = { ...condition, status };
      } else {
        condition = { ...condition, status: { [Op.ne]: "deleted" } };
      }

      this._db = req.db;
      this._db["deals"].hasMany(this._db["deal_products"], {
        foreignKey: "deal_id",
      });
      this._db["deal_products"].belongsTo(this._db["products"], {
        foreignKey: "product_id",
      });

      const deals = await this.findAllByCondition(
        {
          where: condition,
          include: [
            {
              model: this._db["deal_products"],
              include: [{ model: this._db["products"] }],
            },
          ],
        },
        "deals"
      );

      if (deals) {
        res.status(200).json({
          status: 200,
          msg: `Deal details fetched successfully.`,
          deals,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "No deal details available.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  UpdateDeal = async (req: any, res: any) => {
    try {
      // const { email } = req.body;
      const { id = 0 } = req.body;
      console.log(" req.body>>>>", req.body.image);
      this._db = req.db;

      const result = await this.updateOrCreate(req.body, "deals", {
        where: { id },
      });

      if (result) {
        const { id } = result.item;
        return res.status(200).json({
          status: 200,
          id,
          msg: `Deal has been ${id ? "created" : "updated"} successfully.`,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "Unable to create or update deal details.",
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
