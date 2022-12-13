import { BaseRepository } from "../app/repositories/Base/BaseReprository";
import Vendors from "../app/entities/Vendors";

export default class VendorsRest extends BaseRepository<Vendors> {
  FetchVendor = async (req: any, res: any) => {
    try {
      const { id, vendorCode, vendorName, keywords, status } = req.body;

      let condition = {};
      if (id) { condition = { ...condition, id }; }
      if (vendorCode) { condition = { ...condition, vendorCode }; }
      if (vendorName) { condition = { ...condition, vendorName }; }
      if (keywords) { condition = { ...condition, keywords }; }
      if (status) { condition = { ...condition, status }; }
 
      this._db = req.db;

      // this._db["users"].hasMany(this._db["users_profile"], { foreignKey: "user_id" });
      // this._db["users"].hasMany(this._db["providers_profile"], { foreignKey: "user_id" });

      const vendor = await this.findOne(
        {
          // attributes: { exclude: ["password"] },
          where: condition,
          // include: [
          //   { model: this._db["users_profile"] },
          //   { model: this._db["providers_profile"] },
          // ],
        },
        "vendors"
      );

      if (vendor) {
        res.status(200).json({
          status: 200,
          msg: `Vendor details fetched successfully.`,
          vendor,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "No vendor details available.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  FetchVendors = async (req: any, res: any) => {
    try {
      const { id, vendorCode, vendorName, keywords, status } = req.body;

      let condition = {};
      if (id) { condition = { ...condition, id }; }
      if (vendorCode) { condition = { ...condition, vendorCode }; }
      if (vendorName) { condition = { ...condition, vendorName }; }
      if (keywords) { condition = { ...condition, keywords }; }
      if (status) { condition = { ...condition, status }; }

      this._db = req.db;

      // this._db["users"].hasMany(this._db["users_profile"], { foreignKey: "user_id" });
      // this._db["users"].hasMany(this._db["providers_profile"], { foreignKey: "user_id" });

      const vendors = await this.findAllByCondition(
        {
          // attributes: { exclude: ["password"] },
          where: condition,
          // include: [
          //   { model: this._db["users_profile"] },
          //   { model: this._db["providers_profile"] },
          // ],
        },
        "vendors"
      );

      if (vendors) {
        res.status(200).json({
          status: 200,
          msg: `Vendor details fetched successfully.`,
          vendors,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "No vendor details available.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  UpdateVendor = async (req: any, res: any) => {
    try {
      // const { email } = req.body;
      const { id = 0 } = req.body;
      // console.log(" req.body>>>>", req.body);
      this._db = req.db;

      const result = await this.updateOrCreate(
        req.body,
        "vendors",
        {
          where: { id },
        },
      );

      if (result) {
        const { id } = result.item;
        return res.status(200).json({
          status: 200,
          id,
          msg: `Vendor has been ${id ? "created" : "updated"} successfully.`
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "Unable to create or update vendor details.",
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
