import { BaseRepository } from "../app/repositories/Base/BaseReprository";
import Winners from "../app/entities/Winners";
import { Op } from "sequelize";

export default class WinnersRest extends BaseRepository<Winners> {
  FetchWinner = async (req: any, res: any) => {
    try {
      const { id, entry_code, customer_id, product_id, deal_id, status } = req.body;

      let condition = {};
      if (id) { condition = { ...condition, id }; }
      if (entry_code) { condition = { ...condition, entry_code }; }
      if (customer_id) { condition = { ...condition, customer_id }; }
      if (product_id) { condition = { ...condition, product_id }; }
      if (deal_id) { condition = { ...condition, deal_id }; }
      if (status) { condition = { ...condition, status }; }
      else { condition = { ...condition, status: { [Op.ne]: 'deleted' } }; }

      this._db = req.db;
      this._db["winners"].belongsTo(this._db["customers"], { foreignKey: "customer_id" });
      this._db["winners"].belongsTo(this._db["products"], { foreignKey: "product_id" });
      this._db["winners"].belongsTo(this._db["deals"], { foreignKey: "deal_id" });

      const deal_product = await this.findOne(
        {
          where: condition,
          include: [
            { model: this._db["customers"] },
            { model: this._db["products"] },
            { model: this._db["deals"] },
          ],
        },
        "winners"
      );

      if (deal_product) {
        res.status(200).json({
          status: 200,
          msg: `Winner details fetched successfully.`,
          deal_product,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "No winner details available.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  FetchWinners = async (req: any, res: any) => {
    try {
      const { id, entry_code, customer_id, product_id, deal_id, status } = req.body;

      let condition = {};
      if (id) { condition = { ...condition, id }; }
      if (entry_code) { condition = { ...condition, entry_code }; }
      if (customer_id) { condition = { ...condition, customer_id }; }
      if (product_id) { condition = { ...condition, product_id }; }
      if (deal_id) { condition = { ...condition, deal_id }; }
      if (status) { condition = { ...condition, status }; }
      else { condition = { ...condition, status: { [Op.ne]: 'deleted' } }; }

      this._db = req.db;
      this._db["winners"].belongsTo(this._db["customers"], { foreignKey: "customer_id" });
      this._db["winners"].belongsTo(this._db["products"], { foreignKey: "product_id" });
      this._db["winners"].belongsTo(this._db["deals"], { foreignKey: "deal_id" });

      const winners = await this.findAllByCondition(
        {
          where: condition,
          include: [
            { model: this._db["customers"] },
            { model: this._db["products"] },
            { model: this._db["deals"] },
          ],
        },
        "winners"
      );

      if (winners) {
        res.status(200).json({
          status: 200,
          msg: `Winner details fetched successfully.`,
          winners,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "No winner details available.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  UpdateWinner = async (req: any, res: any) => {
    try {
      const { id = 0 } = req.body;
      console.log("req.body >>>>>>>>>>>>>>>>>", req.body)

      this._db = req.db;

      const result = await this.updateOrCreate(
        req.body,
        "winners",
        {
          where: { id },
        },
      );

      if (result) {
        const { id } = result.item;
        return res.status(200).json({
          status: 200,
          id,
          msg: `Winner has been ${id ? "created" : "updated"} successfully.`
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "Unable to create or update winner details.",
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
