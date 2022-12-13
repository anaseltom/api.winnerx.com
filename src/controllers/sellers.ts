import { BaseRepository } from "../app/repositories/Base/BaseReprository";
import Sellers from "../app/entities/Sellers";

export default class SellersRest extends BaseRepository<Sellers> {
  FetchSeller = async (req: any, res: any) => {
    try {
      const { id, sellerCode, sellerName, keywords, status } = req.body;

      let condition = {};
      if (id) { condition = { ...condition, id }; }
      if (sellerCode) { condition = { ...condition, sellerCode }; }
      if (sellerName) { condition = { ...condition, sellerName }; }
      if (keywords) { condition = { ...condition, keywords }; }
      if (status) { condition = { ...condition, status }; }
 
      this._db = req.db;

      // this._db["users"].hasMany(this._db["users_profile"], { foreignKey: "user_id" });
      // this._db["users"].hasMany(this._db["providers_profile"], { foreignKey: "user_id" });

      const seller = await this.findOne(
        {
          // attributes: { exclude: ["password"] },
          where: condition,
          // include: [
          //   { model: this._db["users_profile"] },
          //   { model: this._db["providers_profile"] },
          // ],
        },
        "sellers"
      );

      if (seller) {
        res.status(200).json({
          status: 200,
          msg: `Seller details fetched successfully.`,
          seller,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "No seller details available.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  FetchSellers = async (req: any, res: any) => {
    try {
      const { id, sellerCode, sellerName, keywords, status } = req.body;

      let condition = {};
      if (id) { condition = { ...condition, id }; }
      if (sellerCode) { condition = { ...condition, sellerCode }; }
      if (sellerName) { condition = { ...condition, sellerName }; }
      if (keywords) { condition = { ...condition, keywords }; }
      if (status) { condition = { ...condition, status }; }

      this._db = req.db;

      // this._db["users"].hasMany(this._db["users_profile"], { foreignKey: "user_id" });
      // this._db["users"].hasMany(this._db["providers_profile"], { foreignKey: "user_id" });

      const sellers = await this.findAllByCondition(
        {
          // attributes: { exclude: ["password"] },
          where: condition,
          // include: [
          //   { model: this._db["users_profile"] },
          //   { model: this._db["providers_profile"] },
          // ],
        },
        "sellers"
      );

      if (sellers) {
        res.status(200).json({
          status: 200,
          msg: `Seller details fetched successfully.`,
          sellers,
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

  UpdateSeller = async (req: any, res: any) => {
    try {
      // const { email } = req.body;
      const { id = 0 } = req.body;
      // console.log(" req.body>>>>", req.body);
      this._db = req.db;

      const result = await this.updateOrCreate(
        req.body,
        "sellers",
        {
          where: { id },
        },
      );

      if (result) {
        const { id } = result.item;
        return res.status(200).json({
          status: 200,
          id,
          msg: `Seller has been ${id ? "created" : "updated"} successfully.`
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "Unable to create or update seller details.",
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
