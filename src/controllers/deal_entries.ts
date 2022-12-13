import { BaseRepository } from "../app/repositories/Base/BaseReprository";
import DealEntries from "../app/entities/DealEntries";
import { Op } from "sequelize";

export default class DealEntriesRest extends BaseRepository<DealEntries> {
  FetchDealEntry = async (req: any, res: any) => {
    try {
      const { id, order_id, customer_id, deal_id, entry_code, status } = req.body;

      let condition = {};
      if (id) { condition = { ...condition, id }; }
      if (order_id) { condition = { ...condition, order_id }; }
      if (customer_id) { condition = { ...condition, customer_id }; }
      if (deal_id) { condition = { ...condition, deal_id }; }
      if (entry_code) { condition = { ...condition, entry_code }; }
      if (status) { condition = { ...condition, status }; }
      else { condition = { ...condition, status: { [Op.ne]: 'deleted' } }; }

      this._db = req.db;

      this._db["deal_entries"].belongsTo(this._db["customers"], { foreignKey: "customer_id" });
      // this._db["deal_entries"].belongsTo(this._db["orders"], { foreignKey: "order_id" });
      this._db["deal_entries"].belongsTo(this._db["deals"], { foreignKey: "deal_id" });
      this._db["deal_entries"].belongsTo(this._db["products"], { foreignKey: "product_id" });
      
      const deal_entry = await this.findOne(
        {
          where: condition,
          include: [
            { model: this._db["customers"], },
            // { model: this._db["orders"], },
            { model: this._db["products"], },
            { model: this._db["deals"], }
          ]
        },
        "deal_entries"
      );
       
      if (deal_entry) {
        res.status(200).json({
          status: 200,
          msg: `Deal entry details fetched successfully.`,
          deal_entry,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "No deal entry details available.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  FetchDealEntries = async (req: any, res: any) => {
    try {
      const { id, order_id, customer_id, deal_id, entry_code, status } = req.body;
      let condition = {};
      if (id) { condition = { ...condition, id }; }
      if (order_id) { condition = { ...condition, order_id }; }
      if (customer_id) { condition = { ...condition, customer_id }; }
      if (deal_id) { condition = { ...condition, deal_id }; }
      if (entry_code) { condition = { ...condition, entry_code }; }
      if (status) { condition = { ...condition, status }; }
      else { condition = { ...condition, status: { [Op.ne]: 'deleted' } }; }

      this._db = req.db;

      this._db["deal_entries"].belongsTo(this._db["customers"], { foreignKey: "customer_id" });
      // this._db["deal_entries"].belongsTo(this._db["orders"], { foreignKey: "order_id" });
      this._db["deal_entries"].belongsTo(this._db["deals"], { foreignKey: "deal_id" });
      this._db["deal_entries"].belongsTo(this._db["products"], { foreignKey: "product_id" });
      
      const deal_entries = await this.findAllByCondition(
        {
          where: condition,
          include: [
            { model: this._db["customers"], },
            // { model: this._db["orders"], },
            { model: this._db["products"], },
            { model: this._db["deals"], }
          ]
        },
        "deal_entries"
      );

      if (deal_entries) {
        res.status(200).json({
          status: 200,
          msg: `Deal entry details fetched successfully.`,
          deal_entries,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "No deal entry details available.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  UpdateDealEntry = async (req: any, res: any) => {
    try {
      // const { email } = req.body;
      const { id = 0 } = req.body;
      // console.log(" req.body>>>>", req.body);
      this._db = req.db;

      const result = await this.updateOrCreate(
        req.body,
        "deal_entries",
        {
          where: { id },
        },
      );

      if (result) {
        const { id } = result.item;
        return res.status(200).json({
          status: 200,
          id,
          msg: `Deal entry has been ${id ? "created" : "updated"} successfully.`
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "Unable to create or update deal_entry details.",
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
