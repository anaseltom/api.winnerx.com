import { BaseRepository } from "../app/repositories/Base/BaseReprository";
import Categories from "../app/entities/Categories";

export default class CategoriesRest extends BaseRepository<Categories> {
  FetchCategory = async (req: any, res: any) => {
    try {
      const { id, categoryCode, categoryName, keywords, seller_id, status } = req.body;

      let condition = {};
      if (id) { condition = { ...condition, id }; }
      if (categoryCode) { condition = { ...condition, categoryCode }; }
      if (categoryName) { condition = { ...condition, categoryName }; }
      if (keywords) { condition = { ...condition, keywords }; }
      if (seller_id) { condition = { ...condition, seller_id }; }
      if (status) { condition = { ...condition, status }; }

      this._db = req.db;

      this._db["categories"].belongsTo(this._db["sellers"], { foreignKey: "seller_id" });

      const category = await this.findOne(
        {
          where: condition,
          include: [
            { model: this._db["sellers"] },
          ],
        },
        "categories"
      );


      if (category) {
        res.status(200).json({
          status: 200,
          msg: `Category details fetched successfully.`,
          category,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "No category details available.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  FetchCategories = async (req: any, res: any) => {
    try {
      const { id, categoryCode, categoryName, keywords, seller_id, status } = req.body;

      let condition = {};
      if (id) { condition = { ...condition, id }; }
      if (categoryCode) { condition = { ...condition, categoryCode }; }
      if (categoryName) { condition = { ...condition, categoryName }; }
      if (keywords) { condition = { ...condition, keywords }; }
      if (seller_id) { condition = { ...condition, seller_id }; }
      if (status) { condition = { ...condition, status }; }

      this._db = req.db;

      this._db["categories"].belongsTo(this._db["sellers"], { foreignKey: "seller_id" });

      const categories = await this.findAllByCondition(
        {
          where: condition,
          include: [
            { model: this._db["sellers"] },
          ],
        },
        "categories"
      );

      if (categories) {
        res.status(200).json({
          status: 200,
          msg: `Category details fetched successfully.`,
          categories,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "No category details available.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  UpdateCategory = async (req: any, res: any) => {
    try {
      // const { email } = req.body;
      const { id = 0 } = req.body;
      // console.log(" req.body>>>>", req.body);
      this._db = req.db;

      const result = await this.updateOrCreate(
        req.body,
        "categories",
        {
          where: { id },
        },
      );

      if (result) {
        const { id } = result.item;
        return res.status(200).json({
          status: 200,
          id,
          msg: `Category has been ${id ? "created" : "updated"} successfully.`
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "Unable to create or update category details.",
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
