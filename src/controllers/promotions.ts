import { BaseRepository } from "../app/repositories/Base/BaseReprository";
import Promotions from "../app/entities/Promotions";

export default class PromotionsRest extends BaseRepository<Promotions> {
  FetchPromotion = async (req: any, res: any) => {
    try {
      const { id, product_id, status } = req.body;

      let condition = {};
      if (id) { condition = { ...condition, id }; }
      if (product_id) { condition = { ...condition, product_id }; }
      if (status) { condition = { ...condition, status }; }
 
      this._db = req.db;

      // this._db["users"].hasMany(this._db["users_profile"], { foreignKey: "user_id" });
      // this._db["users"].hasMany(this._db["providers_profile"], { foreignKey: "user_id" });

      const promotion = await this.findOne(
        {
          // attributes: { exclude: ["password"] },
          where: condition,
          // include: [
          //   { model: this._db["users_profile"] },
          //   { model: this._db["providers_profile"] },
          // ],
        },
        "promotions"
      );

      if (promotion) {
        res.status(200).json({
          status: 200,
          msg: `Promotion details fetched successfully.`,
          promotion,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "No promotion details available.", 
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  FetchPromotions = async (req: any, res: any) => {
    try {
      const { id, product_id,  status } = req.body;

      let condition = {};
      if (id) { condition = { ...condition, id }; }
      if (product_id) { condition = { ...condition, product_id }; }
      if (status) { condition = { ...condition, status }; }

      this._db = req.db;

      // this._db["users"].hasMany(this._db["users_profile"], { foreignKey: "user_id" });
      // this._db["users"].hasMany(this._db["providers_profile"], { foreignKey: "user_id" });

      const promotions = await this.findAllByCondition(
        {
          // attributes: { exclude: ["password"] },
          where: condition,
          // include: [
          //   { model: this._db["users_profile"] },
          //   { model: this._db["providers_profile"] },
          // ],
        },
        "promotions"
      );

      if (promotions) {
        res.status(200).json({
          status: 200,
          msg: `Promotion details fetched successfully.`,
          promotions,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "No promotion details available.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  UpdatePromotion = async (req: any, res: any) => {
    try {
      // const { email } = req.body;
      const { id = 0 } = req.body;
      // console.log(" req.body>>>>", req.body);
      this._db = req.db;

      const result = await this.updateOrCreate(
        req.body,
        "promotions",
        {
          where: { id },
        },
      );

      if (result) {
        const { id } = result.item;
        return res.status(200).json({
          status: 200,
          id,
          msg: `Promotion has been ${id ? "created" : "updated"} successfully.`
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "Unable to create or update promotion details.",
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
