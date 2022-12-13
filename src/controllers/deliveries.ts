import { BaseRepository } from "../app/repositories/Base/BaseReprository";
// import Deliveries from "../app/entities/Deliveries";
// const https = require('https');
import axios from 'axios';
// import PDFDocument from 'pdfkit';
const fs = require('fs');

export default class DeliveriesRest extends BaseRepository<any> {

  DeliveryCountries = async (req: any, res: any) => {
    try {
      // https://sandbox-api.shipadelivery.com/v2/countries?apikey=Ydy9F0SDEfhkGjc0aIF9VtLhyB9wgPz1 
      // iso3Code = "ARE", "SAU", "KWT", "JOR", "EGY", "BHR", "QAT"
      const { id, iso3Code } = req.body;
      const URL = `${process.env.SHIPA_API_URL}countries${iso3Code ? `/${iso3Code}` : ""}?apikey=${process.env.SHIPA_API_KEY}`;
      await axios.get(URL).then((response: any) => {
        res.data = {
          status: 200,
          msg: `Country details fetched successfully.`,
          result: response.data
        }
      })
        .catch((error: any) => {
          res.data = {
            status: 500,
            msg: "No country details available..",
            result: error.response.data
          }
        });
    } catch (err: any) {
      res.data = {
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      };
    }
  }
  FetchDeliveryCountries = async (req: any, res: any) => {
    try {
      // https://sandbox-api.shipadelivery.com/v2/countries?apikey=Ydy9F0SDEfhkGjc0aIF9VtLhyB9wgPz1 
      // iso3Code = "ARE", "SAU", "KWT", "JOR", "EGY", "BHR", "QAT"
      // const { id, iso3Code } = req.body;
      await this.DeliveryCountries(req, res);
      res.status(200).json(res.data);
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  DeliveryOrders = async (req: any, res: any) => {
    try {
      const { id, customer_id, status, items } = req.body;

      let condition = {};
      if (id) { condition = { ...condition, id }; }

      this._db = req.db;

      this._db["orders"].hasMany(this._db["order_items"], { foreignKey: "order_id" });
      this._db["orders"].hasOne(this._db["shipping_addresses"], { foreignKey: "order_id" });
      this._db["order_items"].belongsTo(this._db["products"], { foreignKey: "product_id" });

      const order: any = await this.findOne(
        {
          where: condition,
          include: [
            {
              model: this._db["order_items"],
              include: [
                { model: this._db["products"] },
              ]
            },
            { model: this._db["shipping_addresses"] },
          ],
        },
        "orders"
      );

      if (order) {

        const { first_name, last_name, mobile_no, city, country, address } = order?.shipping_address;
        const packages = await order?.order_items?.map((item: any) => {
          return { name: item?.product?.product_name, customerRef: order?.order_no, }
        })

        const data: any = {
          // customerRef: "CUS-0006E",
          customerRef: order?.order_no,
          type: "Delivery",
          origin: {
            contactName: process.env.DELIVERY_ORIGIN_CONTACT_NAME,
            contactNo: process.env.DELIVERY_ORIGIN_CONTACT_NO,
            city: process.env.DELIVERY_ORIGIN_CITY,
            country: process.env.DELIVERY_ORIGIN_COUNTRY,
            address: process.env.DELIVERY_ORIGIN_ADDRESS,
          },
          destination: {
            contactName: first_name + " " + last_name,
            contactNo: mobile_no,
            city,
            country: "ARE",
            address,
          },
          packages,
          category: "Next Day",
        };

        const URL = `${process.env.SHIPA_API_URL}orders?apikey=${process.env.SHIPA_API_KEY}`;
        console.log("URL >>>", URL)
        await axios.post(URL, data).then((response: any) => {
          console.log("response.data >>>", response.data)
          res.data = {
            status: 200,
            msg: `Delivery order request successfully.`,
            result: response.data
          };

        })
          .catch((error: any) => {
            res.data = {
              status: 500,
              msg: "Delivery order request unsuccessful.",
              result: error.response.data
            };

          });

      } else {
        res.data = {
          status: 500,
          msg: "No order details available.",
        };
      }
    }
    catch (err: any) {
      res.data = {
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      };
    }
  }

  RequestDeliveryOrders = async (req: any, res: any) => {
    try {
      await this.DeliveryOrders(req, res);
      res.status(200).json(res.data);
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  DeliveryUpdate = async (req: any, res: any) => {
    try {
      // https://sandbox-api.shipadelivery.com/v2/orders/CUS-0005?apikey=Ydy9F0SDEfhkGjc0aIF9VtLhyB9wgPz1
      const { orderId, readyForDelivery } = req.body;

      const data = JSON.stringify(req.body);
      const URL = `${process.env.SHIPA_API_URL}orders/${orderId}?apikey=${process.env.SHIPA_API_KEY}`;
      await axios.put(URL, { readyForDelivery }).then((response: any) => {
        res.data = {
          status: 200,
          msg: `Delivery order updated successfully.`,
          result: response.data
        };
      })
        .catch((error: any) => {
          res.data = {
            status: 500,
            msg: "Delivery order update unsuccessful.",
            result: error.response.data
          };
        });

    } catch (err: any) {
      res.data = {
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      };
    }
  };

  UpdateDeliveryOrders = async (req: any, res: any) => {
    try {
      await this.DeliveryUpdate(req, res);
      res.status(200).json(res.data);
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };


  FetchDeliveryOrders = async (req: any, res: any) => {
    try {
      // https://sandbox-api.shipadelivery.com/v2/orders/CUS-0005?apikey=Ydy9F0SDEfhkGjc0aIF9VtLhyB9wgPz1
      //  
      const { orderId } = req.body;
      const URL = `${process.env.SHIPA_API_URL}orders/${orderId}?apikey=${process.env.SHIPA_API_KEY}`;

      await axios.get(URL).then((response: any) => {
        res.status(200).json({
          status: 200,
          msg: `Delivery order details fetched successfully.`,
          result: response.data
        });
      })
        .catch((error: any) => {
          res.status(200).json({
            status: 500,
            msg: "No delivery order details available.",
            result: error.response.data
          });
        });

    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  PrintDeliveryOrders = async (req: any, res: any) => {
    try {
      // https://sandbox-api.shipadelivery.com/v2/orders/{orderId}/pdf?apikey=Ydy9F0SDEfhkGjc0aIF9VtLhyB9wgPz1
      // https://sandbox-api.shipadelivery.com/v2/orders/CUS-0005/pdf?apikey=Ydy9F0SDEfhkGjc0aIF9VtLhyB9wgPz1
      //  
      const { orderId } = req.body;
      const URL = `${process.env.SHIPA_API_URL}orders/${orderId}/pdf?apikey=${process.env.SHIPA_API_KEY}`;

      await axios.get(URL, { responseType: 'arraybuffer' }).then((response: any) => {
        const dir = `${__dirname}/labels`;
        const filePath = `${dir}/${orderId}.pdf`;

        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(filePath, response.data);

        /********************************* */
        // // https://www.webmound.com/download-file-using-express-nodejs-server/
        // fs.readFile(filePath, (err: any, file: any) => {
        //   if (err) {
        //     console.log(err);
        //     return res.status(500).send('Could not download file');
        //   }

        //   res.setHeader('Content-Type', 'application/pdf');
        //   // res.setHeader('Content-Disposition', 'inline; filename="js.pdf"');
        //   res.setHeader('Content-Disposition', 'attachment; filename="js.pdf"');

        //   res.send(file);
        // });
        /********************************* */

        res.status(200).json({
          status: 200,
          msg: `Delivery order details printed successfully.`,
          // result: response.data
          filename: filePath
        });
      })
        .catch((error: any) => {
          res.status(200).json({
            status: 500,
            msg: "No delivery order details available.",
            result: error.response.data
          });
        });

    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };


  CancelDeliveryOrders = async (req: any, res: any) => {
    try {
      // https://sandbox-api.shipadelivery.com/v2/orders/CUS-0005/cancel?apikey=Ydy9F0SDEfhkGjc0aIF9VtLhyB9wgPz1
      /*
      15: "Changed in mind" 
      16: "Package not available" 
      17: "Others" Other values will be rejected
  
      */

      const { orderId, cancelReasonId } = req.body;
      const URL = `${process.env.SHIPA_API_URL}orders/${orderId}/cancel?apikey=${process.env.SHIPA_API_KEY}`;

      await axios.post(URL, { cancelReasonId }).then((response: any) => {
        res.status(200).json({
          status: 200,
          msg: `Delivery order canceled successfully.`,
          result: response.data
        });
      })
        .catch((error: any) => {
          res.status(200).json({
            status: 500,
            msg: "No delivery order details available.",
            result: error.response.data
          });
        });

    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };


  //-- parameters: req.body.orderId  ="10001"
  DeliveryStory = async (req: any, res: any) => {
    try {
      // https://sandbox-api.shipadelivery.com/v2/orders/CUS-0005/story?apikey=Ydy9F0SDEfhkGjc0aIF9VtLhyB9wgPz1
      //  
      const { orderId } = req.body;
      const URL = `${process.env.SHIPA_API_URL}orders/${orderId}/story?apikey=${process.env.SHIPA_API_KEY}`;
      
      await axios.get(URL).then((response: any) => {
        // console.log("orderId >>>", orderId)
        res.data = {
          status: 200,
          msg: `Delivery order story fetched successfully.`,
          result: response.data
        };
      })
        .catch((error: any) => {
          res.data = {
            status: 500,
            msg: "No delivery order story available.",
            result: error.response.data
          };
        });

    } catch (err) {
      res.data = {
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      };
    }
  };

  StoryDeliveryOrders = async (req: any, res: any) => {
    try {
      await this.DeliveryStory(req, res);
      res.status(200).json(res.data);
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };


}
