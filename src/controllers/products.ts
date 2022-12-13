import { BaseRepository } from "../app/repositories/Base/BaseReprository";
import Products from "../app/entities/Products";
import { Op } from "sequelize";
import RedisCaching from "../caching";

export default class ProductsRest extends BaseRepository<Products> {
  FetchProduct = async (req: any, res: any) => {
    try {
      const { id, parent_id = null, sellerName, categoryCode, productName, brandName, description, color, gender, size, keywords, status } = req.body;

      let condition = {};
      condition = { ...condition, parent_id };
      if (id) { condition = { ...condition, id }; }
      // if (parent_id) { condition = { ...condition, parent_id: parseInt(parent_id) }; }
      if (sellerName) { condition = { ...condition, sellerName }; }
      if (categoryCode) { condition = { ...condition, categoryCode }; }
      if (productName) { condition = { ...condition, productName: { [Op.like]: '%' + productName + '%' } }; }
      if (brandName) { condition = { ...condition, brandName }; }
      if (description) { condition = { ...condition, description }; }
      if (color) { condition = { ...condition, color }; }
      if (gender) { condition = { ...condition, gender }; }
      if (size) { condition = { ...condition, size }; }
      if (keywords) { condition = { ...condition, keywords }; }
      if (status) { condition = { ...condition, status }; }
      else { condition = { ...condition, status: { [Op.ne]: 'deleted' } }; }

      this._db = req.db;

      this._db["products"].belongsTo(this._db["sellers"], { foreignKey: "sellerId" });

      const product = await this.findOne(
        {
          // attributes: { exclude: ["password"] },
          where: condition,
          include: [
            { model: this._db["sellers"] },
          ],
        },
        "products"
      );

      if (product) {
        res.status(200).json({
          status: 200,
          msg: `Product details fetched successfully.`,
          product,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "No product details available.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  FetchProducts = async (req: any, res: any) => {
    try {
      const { id, parent_id = null, sellerName, categoryCode, productName, brandName, description, color, gender, size, keywords, status } = req.body;

      let condition = {};
      // condition = { ...condition, parent_id  };
      if (id) { condition = { ...condition, id }; }
      if (sellerName) { condition = { ...condition, sellerName }; }
      if (categoryCode) { condition = { ...condition, categoryCode }; }
      if (productName) { condition = { ...condition, productName: { [Op.like]: '%' + productName + '%' } }; }
      if (brandName) { condition = { ...condition, brandName }; }
      if (description) { condition = { ...condition, description }; }
      if (color) { condition = { ...condition, color }; }
      if (gender) { condition = { ...condition, gender }; }
      if (size) { condition = { ...condition, size }; }
      if (keywords) { condition = { ...condition, keywords }; }
      if (status) { condition = { ...condition, status }; }
      else { condition = { ...condition, status: { [Op.ne]: 'deleted' } }; }

      this._db = req.db;

      this._db["products"].belongsTo(this._db["sellers"], { foreignKey: "seller_id" });

      const products = await this.findAllByCondition(
        {
          // attributes: { exclude: ["ts"] },
          where: condition,
          include: [
            { model: this._db["sellers"] },
          ],
        },
        "products"
      );

      if (products) {
        res.status(200).json({
          status: 200,
          msg: `Product details fetched successfully.`,
          products,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "No product details available.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  FetchProducts_Redis = async (req: any, res: any) => {
    try {
      const { id, parent_id = null, sellerName, categoryCode, productName, brandName, description, color, gender, size, keywords, status } = req.body;

      let condition = {};
      // condition = { ...condition, parent_id  };
      if (id) { condition = { ...condition, id }; }
      if (sellerName) { condition = { ...condition, sellerName }; }
      if (categoryCode) { condition = { ...condition, categoryCode }; }
      if (productName) { condition = { ...condition, productName: { [Op.like]: '%' + productName + '%' } }; }
      if (brandName) { condition = { ...condition, brandName }; }
      if (description) { condition = { ...condition, description }; }
      if (color) { condition = { ...condition, color }; }
      if (gender) { condition = { ...condition, gender }; }
      if (size) { condition = { ...condition, size }; }
      if (keywords) { condition = { ...condition, keywords }; }
      if (status) { condition = { ...condition, status }; }
      else { condition = { ...condition, status: { [Op.ne]: 'deleted' } }; }

      console.log("condition >>>", condition)
      this._db = req.db;

      this._db["products"].belongsTo(this._db["sellers"], { foreignKey: "seller_id" });

      const products = await this.findAllByCondition(
        {
          // attributes: { exclude: ["ts"] },
          where: condition,
          include: [
            { model: this._db["sellers"] },
          ],
        },
        "products"
      );

      if (products) {

        const redis_varname = `products:${JSON.stringify(condition)}`;
        // INIT RADIS CONNECTION
        let redisCache = new RedisCaching();
        redisCache
          .Connection()
          .then((redis: any) => {
            if (redis.connected) {
              redis.client.get(redis_varname, async (err: any, data: any) => {
                if (err) {
                  res.status(500).json({
                    status: 500,
                    msg: `Something went wrong while processing your request. ERR: ${err}`,
                  });
                }

                if (data) {
                  data = JSON.parse(data);
                  data.cached = true;

                  res.status(200).json({
                    cached: true,
                    status: 200,
                    msg: `Product details fetched successfully.`,
                    products: data,
                  });

                } else {


                  // CACHED THE CURRENCY ARRAY
                  redis.client.setex(
                    redis_varname,
                    3600,
                    JSON.stringify(products)
                  );


                  res.status(200).json({
                    cached: false,
                    status: 200,
                    msg: `Product details fetched successfully.`,
                    products,
                  });

                }
              });
            }
          })
          .catch((err: any) => {
            if (err.connected) {
              console.log(">>>>REDIS", err.connected);
              res.status(200).json({
                status: 500,
                msg:
                  "Oops! Something went wrong while setting up caching policy. Unable to connect to Cache",
                productsArr: [],
              });
            }
          });

      } else {
        res.status(200).json({
          status: 500,
          msg: "No product details available.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  FetchProductDeals = async (req: any, res: any) => {
    try {
      const { id, status } = req.body;

      let condition = {};
      // condition = { ...condition, parent_id  };
      if (id) { condition = { ...condition, id }; }
      if (status) { condition = { ...condition, status }; }
      else { condition = { ...condition, status: { [Op.ne]: 'deleted' } }; }

      this._db = req.db;

      this._db["products"].hasMany(this._db["deal_products"], { foreignKey: "product_id" });
      this._db["deal_products"].belongsTo(this._db["deals"], { foreignKey: "deal_id" });

      const products = await this.findAllByCondition(
        {
          where: condition,
          include: [
            {
              model: this._db["deal_products"],
              include: [
                { model: this._db["deals"] },
              ],
            },
          ],
        },
        "products"
      );

      if (products) {
        res.status(200).json({
          status: 200,
          msg: `Product details fetched successfully.`,
          products,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "No product details available.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  UpdateProduct = async (req: any, res: any) => {
    try {
      // const { email } = req.body;
      const { id = 0, ts } = req.body;

      //-- NOTE: datetime unable to save
      // console.log(" req.body==>>>>", req.body);

      // req.body = req.body.forEach((v: any) => { delete v.ts });

      // // const newArray: any = req.body.map(({ ts, ...keepAttrs }) => keepAttrs)

      // console.log(" req.body>>>>", req.body);

      this._db = req.db;

      const result = await this.updateOrCreate(
        req.body,
        "products",
        {
          where: { id },
        },
      );

      if (result) {
        const { id } = result.item;
        return res.status(200).json({
          status: 200,
          id,
          msg: `Product has been ${id ? "created" : "updated"} successfully.`
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "Unable to create or update product details.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  UpdateProductList = async (req: any, res: any) => {
    try {
      const { items } = req.body;
      this._db = req.db;

      let parent_id = 0;
      if (items && items?.length > 0) {
        parent_id = items[0]?.parent_id;
        await this.updateByCondition({ where: { parent_id } }, { status: 'deleted' }, "products");
      }
      const result =
        items.map(async (item: any) => {
          const { id = 0 } = item;
          item.status = "active";
          await this.updateOrCreate(
            item, "products", { where: { id } });
          return { id };
        })

      if (result) {
        return res.status(200).json({
          status: 200,

          msg: `Product list has been updated successfully.`
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "Unable to update product list details.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  ImportProducts = async (req: any, res: any) => {
    try {

      const { sellerId, sellerName } = req.body;

      const columns: any = ["skuParent", "sku", "color", "size", "productName", "brandName", "categoryName", "gender", "department", "currencyCode", " unitCost ", " unitPrice ", " alternativePrice ", "unitsInStock", "colorList", "deliveryDays", "keywords", "description", "bulletPoint1", "bulletPoint2", "bulletPoint3", "bulletPoint4", "bulletPoint5", "bulletPoint6", "bulletPoint7", "imageUrlMain", "imageUrlOther1", "imageUrlOther2", "imageUrlOther3", "imageUrlOther4", "imageUrlOther5", "imageUrlOther6", "imageUrlOther7", "videoLink", "countryMadeIn", "shippingCost", "length", "height", "weight", "weightShipping", "uom", "uomShipping", "leadTimeToShip", "reorderLevel", "productOrder", "manufacturer", "upc", "modelNumber", "legalDisclaimer", "scent", "flavor", "ageMinimum", "ageMaximum", "dateLaunch", "dateRelease"]
      let products: any = [];

      // https://remotestack.io/how-to-easily-read-and-parse-excel-file-data-in-node-js/
      const xlsxFile = require('read-excel-file/node')

      this._db = req.db;

      xlsxFile('./uploads/ecommerce-template.xlsx').then(async (rows: any) => {
        for (let i in rows) {
          let product: any = { row: parseInt(i) };
          for (let j in rows[i]) {
            if (parseInt(i) > 0) {
              // console.log("columns[j] >>>", columns[j])
              product[columns[j]] = rows[i][j];
            }
          }
          if (parseInt(i) > 0) {
            product = { ...product, sellerId, sellerName }
            products = [...products, product]

            const sku = product["sku"];
            const result = await this.updateOrCreate(
              product,
              "products",
              {
                where: { sellerId, sku },
              },
            );
          }
        }
        if (products) {
          return res.status(200).json({
            status: 200,
            msg: `Products imported successfully.`,
            products
          });
        } else {
          res.status(200).json({
            status: 500,
            msg: "Unable to import product details.",
          });
        }
      })
      // res.status(200).json({
      //   status: 500,
      //   msg: "Unable to import product details.",
      // });

    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  }

}
