import Permissions from "./../app/entities/Permissions";
import { BaseRepository } from "../app/repositories/Base/BaseReprository";
import User from "../app/entities/User";
import config from "../config/config";
import RolesPermissionsController from "./roles_permissions";
import InitDB from "../database/model";
import { reject } from "lodash";
import db from "../dbConnection/mysql";
import { Op } from "sequelize";
import { resolve } from "path";

//modified by anas
const { uploadFile } = require("../server/s3");
import Users from "../database/model/Users";
// end of mod

const path = require("path");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Importer = require("mysql-import");
const pug = require("pug");
const fs = require("fs");
const request = require("request");
const mysql = require("mysql");

const util = require("util");
const read = util.promisify(fs.readFile);

var con = mysql.createPool({
  connectionLimit: 5,
  host: config.mysql.host,
  user: config.mysql.username,
  password: config.mysql.password,
  database: config.mysql.databaseName,
  port: config.mysql.port,
});

export default class UsersRest extends BaseRepository<User> {
  /***
   SignupUser = async (req: any, res: any) => {
    try {
      req.setTimeout(0);
        if(req.body.email) {
            console.log('**Hi I am User API**');
            console.log(req.body);
            req.body.org_name = req.body.org_name.toLowerCase();
            
            this._db = req.db;
            
            const orgDB = await this.findOne({
              where: { org_name: req.body.org_name }
            }, 'org_db')
            if(orgDB !== null) {
              return res.status(200).json({
                  status: 500,
                  msg: 'The organization domain already registered with us. If you\'re a member of that organization please signin to your domain.',
                  auth: false,
                  orgExist: true
              });
            }
            console.log("++++++IAMTHERE++++++")
            this._db = req.db;

            const user: any = await this.findOne({
                where: {
                    email: req.body.email
                }
            }, 'users');
            if(user === null) {
                // FINALLY CREATE USER FROM THE PARAMS FROM FRONTEND

                const result: any = await this.create(req.body, 'users');

                if(result) {
                  let org_db_res: any = await this.create({
                    org_name: req.body.org_name.toLowerCase(),
                    email: req.body.email,
                    status: 'active'
                  }, 'org_db');

                  if(org_db_res) {
                    const token = jwt.sign({ result: {id: result.id, org: req.body.org_name, email: req.body.email} }, config.passphrase, { expiresIn: '1h' });
                    // create reusable transporter object using the default SMTP transport
                    let transporter = nodemailer.createTransport(config.mail);
                    fs.readFile(path.join(__dirname, '../templates/emails/userVerification.pug'),
                    'utf8',
                    async (err: any, data: any) => {
                      if (err) throw err;

                      let fn = pug.compile(data);
                      let emailTemp = fn({
                        url: `${config.baseURL}/signin?uveid=${token}`
                      });
                      // send mail with defined transport object
                      let info = await transporter.sendMail({
                          from: '"WinnerX Support" <support@winnerx.shop>', // sender address
                          to: req.body.email, // list of receivers
                          subject: "WinnerX Account Verification", // Subject line
                          text: "Please verify your email by clicking on the below button in-order for us to proceed further.", // plain text body
                          html: emailTemp, // html body
                      });

                      return res.status(200).json({
                        status: 200,
                        msg: 'User Signedup Successfully',
                        id: result.id,
                        mlID: info.msgId,
                        session: req.body.session,
                        user_action: req.body.status,
                        utk: token,
                        auth: true,
                        org: org_db_res,
                        user_status: 'first_time'
                      });
                    });
                  } else {
                    return res.status(200).json({
                      status: 500,
                      msg: 'Oops! Something went wrong while activating your organization.'
                  });
                  }
                } else {
                    return res.status(200).json({
                        status: 500,
                        msg: 'Oops! Something went wrong while creating your account.'
                    });
                }
            } else {
                return res.status(200).json({
                    status: 500,
                    msg: 'Oops! User with provided email already exists.',
                    auth: false,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    user_status: 'existing_user'
                });
            }
        } else {
          return res.status(200).json({ status: 500, msg: 'Please add user detail to signup.'});
        }
    } catch(err) {
        console.log(err);
        return res.status(200).json({ status: 500, msg: `Oops! Something went wrong. We are unable to register. ${err}`});
    }
  }
 
 */
  uploadProfileImage = async (req: any, res: any, next: any = undefined) => {
    // let DB_NAME = config.mysql.databaseName;
    this._db = req.db;
    let { files, body } = req;
    let { id } = req.params;
    const user: any = await this.findOne(
      {
        where: { id },
      },
      "users"
    );
    // console.log(user);
    try {
      if (user.dataValues) {
        const result = await uploadFile(files[0]);
        const updatedUser: any = await this.update(
          id,
          {
            profile_url: result.Location,
          },
          "users"
        );
        return res
          .status(200)
          .send({ msg: "image uploaded successfully", url: result.Location });
      }
      return res.status(404).send({ msg: "User with given id not found" });
    } catch (error) {
      return res.status(500).send(error);
    }
    next();
  };
  SignupUser = async (req: any, res: any, next: any = undefined) => {
    const {
      email,
      user_type,
      password,
      social_media = false,
      org_name = "WinnerX",
    } = req.body;
    let result_msg = {};
    try {
      // console.log("SignupUser - req.body>>>>>>>>>>>>>>>>", req.body);
      if (email) {
        let DB_NAME = config.mysql.databaseName;
        this._db = req.db;

        const user: any = await this.findOne(
          {
            // where: {
            //   [Op.or]: [
            //     { email: email },
            //     { user_name: req.body.user_name },
            //   ],
            // },
            where: { email },
          },
          "users"
        );

        // console.log("user>>>>>>>>>>", user);
        if (user == null) {
          const parseIp = (req: any) =>
            req.headers["x-forwarded-for"]?.split(",").shift() ||
            req.socket?.remoteAddress;
          const geoip = require("geoip-lite");
          // var ip = "207.97.227.239";
          const ip_address = parseIp(req);
          const geo = geoip.lookup(ip_address);
          // console.log(parseIp(req), req.socket?.remoteAddress);
          // console.log("geo>>>>", ip_address, geo);

          let prmReqObj: Permissions = new Permissions(email);
          // let rolesPermissions = new RolesPermissionsController(DB_NAME);
          let rolesPermissions = new RolesPermissionsController();
          let permissions: any = await rolesPermissions.CreatePermissions(
            prmReqObj,
            res
          );

          // GRAB THE ORG DB NAME & PERMISSION ID, FINALLY CREATE USER
          req.body.permission_id = permissions.id;
          req.body.team_status = "creator";
          req.body.status = "first_time";
          req.body.ip_address = ip_address;

          // console.log("req.body>>>>>>>>>>", req.body);

          const result: any =
            (password || social_media) &&
            (await this.create(req.body, "users"));

          if (result) {
            // await this.SendNewOTP(req, res);

            // console.log("req?.result>>>>>>>>>>", req?.result);

            /*
            const token = jwt.sign(
              { result: result.id, org: DB_NAME },
              config.passphrase
            );
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport(config.mail);
            fs.readFile(
              path.join(__dirname, "../templates/emails/userVerification.pug"),
              "utf8",
              async (err: any, data: any) => {
                if (err) throw err;

                let fn = pug.compile(data);
                let emailTemp = fn({
                  url: `${config.baseURL}/signin/v?uveid=${token}`,
                });


                // console.log('config.baseURL>>>>>>>>>>>',config.baseURL)
                // console.log('emailTemp>>>>>>>>>>>',emailTemp)

                // send mail with defined transport object
                let info = await transporter.sendMail({
                  from: '"No reply" <no-reply@winnerx.shop>', // sender address
                  to: email, // list of receivers
                  subject: "WinnerX Verification", // Subject line
                  text:
                    "Please verify your email by clicking on the below button in-order for us to proceed further.", // plain text body
                  html: emailTemp, // html body
                });

                result_msg = {
                  status: 200,
                  msg: "User signed up successfully",
                  id: result.id,
                  mlID: info.msgId,
                  utk: token,
                  auth: true,
                };
                if (req.body.is_register) {
                  // console.log("1>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                  return result_msg;
                } else {
                  return res.status(200).json(result_msg);
                }
              }
            );
            */

            let tablename = "";
            if (user_type == "customer") {
              tablename = "customers";
            } else if (user_type == "seller") {
              tablename = "sellers";
            }

            // console.log("user_type >>>>", user_type, tablename)
            if (tablename) {
              const user_id = result?.id;
              req.body.user_id = user_id;
              // console.log("tablename, user_id >>>", tablename, user_id)
              // ** new ** encryption for custom id

              const result1 = await this.updateOrCreate(
                { ...req.body, customer_id: user_id, id: user_id },
                tablename,
                {
                  where: { user_id },
                }
              );
            }

            return res.status(200).json({
              status: 200,
              msg: "User signed up successfully",
              id: result.id,
              success: true,
            });
          } else {
            return res.status(200).json({
              status: 500,
              msg: "Error Creating User",
            });
          }
        } else {
          if (req.body.user_name && user.user_name === req.body.user_name) {
            return res.status(200).json({
              status: 500,
              msg: "Username already exists!",
              auth: false,
              user_name: user.user_name,
              email: user.email,
              first_name: user.first_name,
              last_name: user.last_name,
            });
          } else {
            return res.status(200).json({
              status: 500,
              msg: "Email already exists!",
              auth: false,
              email: user.email,
              first_name: user.first_name,
              last_name: user.last_name,
            });
          }
        }
      } else {
        return res
          .status(200)
          .json({ status: 500, msg: "Please add user detail to signup." });
      }
    } catch (err) {
      return res.status(500).json({ msg: "Unable to Register User" });
    }
  };

  // VerifyAccount = async (req: any, res: any) => {
  //   try {
  //     const { uveid } = req.query;

  //     if (uveid) {
  //       jwt.verify(uveid, config.passphrase, async (err: any, decoded: any) => {
  //         if (err)
  //           return res.status(200).json({
  //             status: 500,
  //             msg: "Incorrect User Verification Details or Session Expired.",
  //           });
  //         console.log(decoded.id);
  //         let id = decoded.result.id;
  //         let email = decoded.result.email;
  //         let orgName = decoded.result.org;

  //         //config.mysql.databaseName = orgName;
  //         this._db = (await req.dbConn).conn[orgName];

  //         const checkVerification = await this.findOne(
  //           {
  //             where: { email_status: "verified" },
  //           },
  //           "org_members"
  //         );

  //         if (!checkVerification) {
  //           const user = await this.updateByCondition(
  //             {
  //               where: { email },
  //             },
  //             { email_status: "verified" },
  //             "org_members"
  //           );
  //           if (user) {
  //             return res.status(200).json({
  //               status: 200,
  //               verified: true,
  //               msg: "User Account Verified Successfully",
  //             });
  //           } else {
  //             return res.status(200).json({
  //               status: 500,
  //               verified: false,
  //               msg:
  //                 "Something went wrong while verifying account please try again.",
  //             });
  //           }
  //         } else {
  //           return res.status(200).json({
  //             status: 403,
  //             verified: true,
  //             msg: "User Already Verified.",
  //           });
  //         }
  //       });
  //     } else {
  //       return res.status(200).json({
  //         status: 500,
  //         verified: false,
  //         msg: "Verification Decoded Failed",
  //       });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     return res.status(500).json({ msg: "Unable to Verify User Email." });
  //   }
  // };

  VerifyAccount = async (req: any, res: any) => {
    try {
      const { uveid } = req.body;

      if (uveid) {
        jwt.verify(uveid, config.passphrase, async (err: any, decoded: any) => {
          if (err)
            return res.status(200).json({
              status: 500,
              msg: "Incorrect user verification details or session expired.",
            });

          let id = decoded.result;
          this._db = req.db;
          const checkVerification = await this.findOne(
            {
              where: { id, email_status: "verified" },
            },
            "users"
          );

          if (!checkVerification) {
            const user = await this.updateByCondition(
              {
                where: { id },
              },
              { email_status: "verified" },
              "users"
            );
            if (user) {
              // res;
              return res.status(200).json({
                status: 200,
                verified: true,
                msg: "User account verified successfully",
              });
            } else {
              return res.status(200).json({
                status: 500,
                verified: false,
                msg:
                  "Something went wrong while verifying account please try again.",
              });
            }
          } else {
            return res.status(200).json({
              status: 403,
              verified: true,
              msg: "User already verified.",
            });
          }
        });
      } else {
        return res.status(200).json({
          status: 500,
          verified: false,
          msg: "Verification Decoded Failed",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Unable to Verify User Email." });
    }
  };

  checkUserByPhone = async (req: any, res: any) => {
    try {
      let { phone } = req.body;
      this._db = req.db;

      if (!phone)
        return res.status(400).json({
          status: 400,
          creds: false,
          msg: `Please provide phone number`,
        });

      const customer: any = await this.findOne(
        {
          // where: { email, password },
          where: { phone_no: phone },
        },
        "customers"
      );
      console.log(customer?.dataValues);

      if (!customer) {
        return res.status(404).json({
          status: 404,
          msg: `User with given phone number not found.`,
        });
      }

      const user: any = await this.findOne(
        {
          where: { id: customer?.user_id },
        },
        "users"
      );
      if (!user) {
        return res.status(500).send({
          status: 500,
          msg: `Something went wrong`,
        });
      }
      return res.status(200).send({
        status: 200,
        msg: `User was found.`,
        user: { ...user?.dataValues, customer: customer?.dataValues },
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        msg: `Something went wrong ${error}`,
      });
    }
  };

  LoginUser = async (req: any, res: any) => {
    try {
      let { email, password, billing = false, social_media = false } = req.body;
      this._db = req.db;

      if (email && (password || social_media)) {
        let condition: any = { email };
        if (email) {
          condition = { ...condition, email };
        }
        if (!social_media) {
          if (password) {
            condition = { ...condition, password };
          }
        }

        const user: any = await this.findOne(
          {
            // where: { email, password },
            where: condition,
          },
          "users"
        );
        const customer: any = await this.findOne(
          {
            where: { email },
          },
          "customers"
        );
        console.log("customer?.customer_id >>>>", customer?.customer_id);

        let customer_id = customer?.customer_id;

        if (user !== null) {
          if (user?.email_status === "not_verified") {
            return res.status(400).json({
              status: 500,
              msg:
                "We sent you an email verification to your email, please read the instruction on how to verify your email.",
            });
          }
          return res.status(200).json({
            status: 200,
            msg: "User Credentials Matched.",
            creds: true,
            id: user.id,
            session: user.session,
            user_type: user.user_type,
            user_action: user.status,
            email: user.email,
            customer_id,
            // customer
          });
        } else {
          return res.status(400).json({
            status: 500,
            creds: false,
            msg: `Invalid Credentials, Wrong Email or Password. Please try again.`,
          });
        }
      } else {
        return res
          .status(400)
          .json({ status: 500, msg: "Please add user detail to signin." });
      }
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ msg: `Something went wrong while logging in. ${err}` });
    }
  };

  SendNewOTP = async (req: any, res: any) => {
    try {
      let { email, orgName } = req.body;
      // console.log("  email, orgName >>>",  email, orgName)
      if (orgName) {
        orgName = orgName?.toLowerCase();
        config.mysql.databaseName = orgName;
      }
      this._db = req.db;
      // SEND AN OTP
      const otp: number = Math.ceil(Math.random() * 8000) + 1000;
      const otpFind: any = await this.findOne(
        { where: { email } },
        "otp_verification"
      );
      if (otpFind !== null) {
        const otp = await this.delete(otpFind.id, "otp_verification");
      }

      const otpDB: any = await this.create(
        { otp, email, status: "otp_sent" },
        "otp_verification"
      );

      // ****AFTER TOKEN SEND OTP FOR 2-STEP VERIFICATION****
      // create reusable transporter object using the default SMTP transport
      if (otpDB) {
        await Promise.all([
          read(path.join(__dirname, "../templates/emails/userOTP.pug"), "utf8"),
        ]).then(async (data: any) => {
          let fn = pug.compile(data);
          let emailTemp = fn({ otp });
          let transporter = nodemailer.createTransport(config.mail);

          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: '"Support" <support@winnerx.shop>', // sender address
            to: req.body.email, // list of receivers
            subject: "WinnerX OTP For Account Verification", // Subject line
            text:
              "Please verify your account by using the below provided 4 digit OTP. If you didn't initiated this request please change your account password & don't share this OTP with anyone else.", // plain text body
            html: emailTemp, // html body
          });

          if (info) {
            console.log(info);
            console.log(" SendNewOTP>>>>>>>>>>", otp);
            req.result = {
              status: 200,
              msg: "OTP Sent Successfully.",
              otp: true,
              oid: otpDB.id,
              // orgName,
            };
          } else {
            req.result = {
              status: 200,
              msg: "Failed to send an OTP. Please try again or reach support.",
              otp: false,
              oid: null,
              // orgName,
            };
          }
        });
      }
    } catch (err) {
      req.result = {
        status: 500,
        msg: `Oops! Something went wrong while sending your OTP. ERR: ${err}`,
      };
    }
  };

  SendOTP = async (req: any, res: any) => {
    try {
      // let { email, orgName } = req.body;
      await this.SendNewOTP(req, res);

      if (req?.result) {
        return res.status(200).json(req.result);
      } else {
        res.status(200).json({
          status: 500,
          msg: "Unable to send OTP.",
        });
      }
    } catch (err) {
      res.status(200).json({
        status: 500,
        msg: `Oops! Something went wrong while sending your OTP. ERR: ${err}`,
      });
    }
  };

  CheckOTP = async (req: any, res: any) => {
    try {
      // let { otp, email, id, oid, orgName } = req.body;
      let { otp, email } = req.body;

      console.log("otp, email  >>>", otp, email);
      this._db = req.db;

      if (otp && email) {
        const otpResult = await this.findOne(
          { where: { otp, email } },
          "otp_verification"
        );

        if (otpResult !== null) {
          return {
            status: 200,
            msg: "OTP successfully validated.",
          };
          /********
          const otp = await this.delete(oid, "otp_verification");
          // CHECK ORG EXIST OR NOT
          ////// config.mysql.databaseName = orgName; 
          // this._db = req.db;
          // FIND CPANEL CREDS IF IT EXISTS
          const usercPDetails = await this.findAll("org_cpanel");

          const token = jwt.sign({ result: { id, email } }, config.passphrase, {
            expiresIn: "1h",
          });

          if (usercPDetails.length > 0) {
            let respObj: any = {
              status: 200,
              msg: "User Signedin Successfully",
              id: id,
              email,
              utk: token,
              auth: true,
              authcP: usercPDetails,
            };
            if (res !== null) {
              return res.status(200).json(respObj);
            } else {
              return respObj;
            }
          } else {
            let respObj: any = {
              status: 200,
              msg: "User Signedin Successfully",
              id,
              email,
              utk: token,
              auth: true,
              authcP: [],
            };

            if (res !== null) {
              return res.status(200).json(respObj);
            } else {
              return respObj;
            }
          }
          */
        } else {
          let respObj: any = {
            status: 500,
            msg: "Incorrect OTP please try again.",
          };

          if (res !== null) {
            return res.status(200).json(respObj);
          } else {
            return respObj;
          }
        }
      } else {
        let respObj: any = {
          status: 500,
          msg: "Please add otp detail for verification.",
        };
        if (res !== null) {
          return res.status(200).json(respObj);
        } else {
          return respObj;
        }
      }
    } catch (err) {
      console.log(err);
      let respObj: any = { msg: "Something went wrong while verifying OTP." };
      if (res !== null) {
        return res.status(500).json(respObj);
      } else {
        return respObj;
      }
    }
  };

  VerifyOTP = async (req: any, res: any) => {
    try {
      let { otp, email } = req.body;
      // console.log("otp, email  >>>", otp, email)
      this._db = req.db;

      if (otp && email) {
        const otpResult: any = await this.findOne(
          { where: { otp, email } },
          "otp_verification"
        );
        if (otpResult) {
          const { id } = otpResult;
          await this.delete(id, "otp_verification");
          await this.updateByCondition(
            { where: { email } },
            { email_status: "verified" },
            "users"
          );
          return res.status(200).json({
            status: 200,
            msg: `OTP successfully validated.`,
          });
        } else {
          res.status(200).json({
            status: 500,
            msg: "Incorrect OTP please try again.",
          });
        }
      } else {
        res.status(200).json({
          status: 500,
          msg: "Please add otp detail for verification.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  ForgotPassword = async (req: any, res: any) => {
    try {
      let { email, orgName } = req.body;
      orgName = orgName.toLowerCase();
      if (email) {
        this._db = (await req.dbConn).conn["WinnerX_db"];

        const org: any = await this.findOne(
          { where: { org_name: orgName } },
          "org_db"
        );

        if (org) {
          // CHECK ORG EXIST OR NOT
          this._db = (await req.dbConn).conn[orgName];

          const user: any = await this.findOne(
            { where: { email } },
            "org_members"
          );

          if (user || req.body.user) {
            const passResetReqExists = await this.findOne(
              {
                where: {
                  email,
                  status: "password_reset_initiated",
                },
              },
              "org_password_reset"
            );
            if (!passResetReqExists) {
              let prid = `JKHDUI${Math.ceil(
                Math.random() * 10000
              )}HKDSKJHOPI${Math.ceil(
                Math.random() * 10000
              )}IOPPKHJHKJ${Date.now()}`;
              console.log(prid, ">>>>>>>>", email);

              const passReset: any = await this.create(
                {
                  email:
                    req.body.company_email == null ||
                    req.body.company_email == undefined ||
                    req.body.company_email == ""
                      ? email
                      : req.body.company_email,
                  old_password: user ? user.password : null,
                  pass_reset_id: prid,
                  expiry_time: req.body.emailTemplateURL
                    ? req.body.emailTemplateURL.expiry_time
                    : 5,
                  status: "password_reset_initiated",
                },
                "org_password_reset"
              );
              if (passReset) {
                let templateURL = "../templates/emails/userResetPassword.pug";

                console.log(templateURL);

                fs.readFile(
                  path.join(__dirname, templateURL),
                  "utf8",
                  async (err: any, data: any) => {
                    if (err) throw err;

                    const encodeGetParams = (p: any) =>
                      Object.entries(p)
                        .map((kv: any) => kv.map(encodeURIComponent).join("="))
                        .join("&");

                    const params = {
                      _prid: prid,
                      _org: orgName,
                      _eml:
                        req.body.company_email == ""
                          ? email
                          : req.body.company_email,
                    };

                    let fn = pug.compile(data);
                    let emailTemp = fn({
                      url: `${config.baseURL}/password-reset?${encodeGetParams(
                        params
                      )}`,
                      orgName: req.body.orgName,
                      admin_email: req.body.email,
                      first_name: user.first_name,
                    });
                    let transporter = nodemailer.createTransport(config.mail);
                    // send mail with defined transport object
                    let info = await transporter.sendMail({
                      from: '"WinnerX Support" <support@winnerx.shop>', // sender address
                      to: req.body.email, // list of receivers,
                      // bcc: "ahmed@meekd.work",
                      subject: "WinnerX Account Password Reset", // Subject line
                      text:
                        "Please verify your account by using the below provided 4 digit OTP. If you didn't initiated this request please change your account password & don't share this OTP with anyone else.", // plain text body
                      html: emailTemp, // html body
                    });
                    let response = {
                      status: 200,
                      userExist: true,
                      passReset: passReset.id,
                      msg: "Password Reset Request Initiated Successfully.",
                    };
                    console.log(response);
                    if (req.body.noStatus) return response;
                    return res.status(200).json(response);
                  }
                );
              } else {
                let response = {
                  status: 500,
                  userExist: true,
                  passReset: null,
                  msg: "Could initiate password request procedure.",
                };
                console.log(response);
                if (req.body.noStatus) return response;

                return res.status(200).json(response);
              }
            } else {
              let response = {
                status: 500,
                userExist: true,
                passReset: null,
                msg:
                  "Password Reset Already Initiated. Please use the existing link sent to your email to reset your password.",
              };
              console.log(response);
              if (req.body.noStatus) return response;

              return res.status(200).json(response);
            }
          } else {
            let response = {
              status: 500,
              userExist: false,
              msg: "Could not find any user related to the provided email.",
            };
            console.log(response);
            if (req.body.noStatus) return response;

            return res.status(200).json(response);
          }
        } else {
          let response = {
            status: 500,
            userExist: false,
            msg: "Could not find any organization with provide name.",
          };
          console.log(response);
          if (req.body.noStatus) return response;

          return res.status(200).json(response);
        }
      } else {
        let response = {
          status: 500,
          msg: "Please add valid email for password reset.",
        };
        console.log(response);
        if (req.body.noStatus) return response;

        return res.status(200).json(response);
      }
    } catch (err) {
      let response = {
        status: 500,
        msg: `Something went wrong while process your request for password reset. ERR ${err}`,
      };
      console.log(response);
      if (req.body.noStatus) return response;

      return res.status(500).json(response);
    }
  };

  ResetPassword = async (req: any, res: any) => {
    try {
      let { email, orgName, password, prid } = req.body;
      orgName = orgName.toLowerCase();
      if (email && password) {
        // CHECK ORG DB EXIST
        this._db = (await req.dbConn).conn["WinnerX_db"];

        const org: any = await this.findOne(
          { where: { org_name: orgName } },
          "org_db"
        );

        if (org) {
          //CONNECT TO ORG DB
          //config.mysql.databaseName = orgName;
          this._db = (await req.dbConn).conn[orgName];
          const userPassResetID: any = await this.findOne(
            { where: { email, pass_reset_id: prid } },
            "org_password_reset"
          );
          if (userPassResetID) {
            // CHECK THE DURATION OF PASSWORD WHICH IS 30 Mintues By Default.
            let timePassedHrs =
              new Date().getHours() - new Date(userPassResetID.ts).getHours();
            let timePassed =
              new Date().getMinutes() -
              new Date(userPassResetID.ts).getMinutes();

            if (
              timePassedHrs <= 0 &&
              timePassed <= userPassResetID.expiry_time
            ) {
              const user: any = await this.findAllByCondition(
                { where: { email } },
                "org_members"
              );
              let usedPasswords = [];
              if (user.length > 0) {
                user.forEach((usr: any) => {
                  if (usr.password == password) {
                    usedPasswords.push(usr);
                  }
                });
                if (usedPasswords.length <= 0) {
                  const updatePass = await this.update(
                    user[user.length - 1].id,
                    { password },
                    "org_members"
                  );
                  if (updatePass) {
                    const userPassResetUpdate: any = await this.update(
                      userPassResetID.id,
                      { status: "password_reset_done" },
                      "org_password_reset"
                    );
                    return res.status(200).json({
                      status: 200,
                      passReset: true,
                      timePassed,
                      msg:
                        "Password Reset Successfully Completed. You can now proceed to Signin.",
                    });
                  } else {
                    return res.status(200).json({
                      status: 500,
                      passReset: false,
                      timePassed,
                      msg:
                        "Invalid Password Request, Could not find any user related to the provided email.",
                    });
                  }
                } else {
                  return res.status(200).json({
                    status: 500,
                    passReset: false,
                    msg:
                      "The password you are trying to use is same as your previously use password. Please try again with new password.",
                  });
                }
              } else {
                return res.status(200).json({
                  status: 500,
                  passReset: false,
                  msg:
                    "Invalid Password Request, Could not find any user related to the provided email.",
                });
              }
            } else {
              const userPassResetUpdate: any = await this.update(
                userPassResetID.id,
                { status: "link_expired" },
                "org_password_reset"
              );
              return res.status(200).json({
                status: 500,
                passReset: false,
                timePassed,
                msg:
                  "Password Reset Link Expired. Please Try Resetting Your Password Again.",
              });
            }
          } else {
            return res.status(200).json({
              status: 500,
              passReset: false,
              msg: "Invalid Password Request.",
            });
          }
        } else {
          return res.status(200).json({
            status: 500,
            userExist: false,
            msg: "Could not find any related organization.",
          });
        }
      } else {
        return res.status(200).json({
          status: 500,
          msg: "Please add valid password for password reset.",
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: 500,
        msg: `Something went wrong while process your request for password reset. ERR: ${err}`,
      });
    }
  };

  CheckUserStatus = async (req: any, res: any) => {
    try {
      let { email } = req.body;

      if (email !== "") {
        this._db = req.db;

        const userStatus: any = await this.findOne(
          {
            where: { email },
          },
          "org_members"
        );

        if (userStatus) {
          res.status(200).json({
            status: 200,
            msg: "Successfully found valid user status.",
            emailStatus: userStatus.email_status,
            userStatus: userStatus.status,
          });
        } else {
          res.status(200).json({
            status: 500,
            msg:
              "Oops! Unable to find valid user status with provide credentials.",
            emailStatus: null,
            userStatus: null,
          });
        }
      } else {
        res.status(200).json({
          status: 500,
          msg: "Oops! Please provide a valid email address.",
        });
      }
    } catch (error) {
      res.status(200).json({
        status: 500,
        msg: "Oops! Something went wrong while checking verifying your status.",
      });
    }
  };

  AccountSettings = async (req: any, res: any) => {
    try {
      let { oldEmail, oldPassword, oid, otp } = req.body;

      this._db = req.db;

      if (oldEmail !== "" && oldPassword !== "") {
        const verifyUserCreds: any = await this.findAllByCondition(
          { where: { email: oldEmail, password: oldPassword } },
          "org_members"
        );

        if (verifyUserCreds.length > 0) {
          // USER IS VALID & HAS CORRECT CREDENTIALS
          // NOW VERIFY USER OTP
          req.body.oid = oid;
          req.body.id = verifyUserCreds.id;
          req.body.otp = otp;

          const checkOTP = await this.CheckOTP(req, null);

          if (checkOTP) {
            if (
              checkOTP.status === 200 &&
              checkOTP.utk !== "" &&
              checkOTP.authcP.length > 0
            ) {
              if (req.body.newEmail || req.body.newPassword) {
                const tables = [
                  "billing",
                  "billing_capture",
                  "org_compute_engine",
                  "org_cpanel",
                  "org_datacenter_locations",
                  "org_details",
                  "org_domain",
                  "org_invoices",
                  "org_members",
                  "org_members_profile",
                  "org_notifications",
                  "otp_verification",
                  "org_password_reset",
                  "org_products",
                  "org_roles_permission",
                  "org_term_service",
                  "org_support_tickets",
                ];

                for (let table of tables) {
                  console.log("table>>>", table);
                  let obj: any = {};
                  if (req.body.newEmail) {
                    obj.email = req.body.newEmail;
                  }
                  if (table === "org_members" && req.body.newPassword) {
                    obj.password = req.body.newPassword;
                  }
                  if (Object.keys(obj).length > 0) {
                    await this.updateByCondition(
                      { where: { email: oldEmail } },
                      obj,
                      table
                    );
                  }
                }

                // CONNECT TO NEW W1 MAIN DB
                this._db = (await req.dbConn).conn["WinnerX_db"];

                for (let table of ["org_db", "users"]) {
                  let obj: any = {};
                  if (req.body.newEmail) {
                    obj.email = req.body.newEmail;
                  }
                  if (table === "users" && req.body.newPassword) {
                    obj.password = req.body.newPassword;
                  }
                  if (Object.keys(obj).length > 0) {
                    await this.updateByCondition(
                      { where: { email: oldEmail } },
                      obj,
                      table
                    );
                  }
                }

                return res.status(200).json({
                  status: 200,
                  msg: "Successfully updated your account settings.",
                  account: checkOTP,
                });
              } else {
                return res.status(200).json({
                  status: 200,
                  msg: "No account details provided to be updated.",
                  account: null,
                });
              }
            } else {
              return res.status(200).json(checkOTP);
            }
          } else {
            return res.status(200).json({
              status: 500,
              msg: "Something went wrong while verifying your OTP.",
            });
          }
        } else {
          return res.status(200).json({
            status: 200,
            msg:
              "Oops! Your provided credentials didn't match with your current account details.",
          });
        }
      } else {
        res.status(200).json({
          status: 500,
          msg: "Please provide vaild account settings to be updated.",
        });
      }
    } catch (err) {
      res.status(200).json({
        status: 500,
        msg: `Oops! Something went wrong while updating your account settings. ERR: ${err}`,
      });
    }
  };

  AuthenticateUser = async (req: any, res: any) => {
    // AUTHENTICATE ME
    try {
      this._db = req.db;

      if (req.user_email !== "" && req.org_name !== "") {
        res.status(200).json({
          status: 200,
          msg: "Authenticated User",
          auth: true,
        });
      } else {
        res.status(500).json({
          status: 500,
          msg: "Not Authenticated User",
          auth: false,
        });
      }
    } catch (err) {
      res.status(200).json({
        status: 500,
        msg: "The user is not authenticated.",
        auth: false,
      });
    }
  };

  EmailTestingAPI = async (req: any, res: any) => {
    try {
      request.get(
        "https://winnerx.shop/emails/templates/billing.html",
        async function(err: any, resp: any, billing: any) {
          // Body is the example.docx data.
          // let fn = pug.compile(data);
          let emailTemp = billing;
          let transporter = nodemailer.createTransport(config.mail);
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: '"WinnerX Support" <support@winnerx.shop>', // sender address
            to: req.body.email, // list of receivers
            subject: "WinnerX OTP For Account Verification", // Subject line
            text:
              "Please verify your account by using the below provided 4 digit OTP. If you didn't initiated this request please change your account password & don't share this OTP with anyone else.", // plain text body
            html: emailTemp, // html body
          });

          if (info) {
            request.get(
              "https://winnerx.shop/emails/templates/invitation.html",
              async function(err: any, resp: any, invitation: any) {
                let emailTemp = invitation;
                let transporter = nodemailer.createTransport(config.mail);
                // send mail with defined transport object
                let info = await transporter.sendMail({
                  from: '"WinnerX Support" <support@winnerx.shop>', // sender address
                  to: req.body.email, // list of receivers
                  subject: "WinnerX OTP For Account Verification", // Subject line
                  text:
                    "Please verify your account by using the below provided 4 digit OTP. If you didn't initiated this request please change your account password & don't share this OTP with anyone else.", // plain text body
                  html: emailTemp, // html body
                });

                if (info) {
                  request.get(
                    "https://winnerx.shop/emails/templates/cpanel_creds.html",
                    async function(err: any, resp: any, cpanel_creds: any) {
                      if (err) throw err;

                      // let fn = pug.compile(data);
                      let emailTemp = cpanel_creds;
                      let transporter = nodemailer.createTransport(config.mail);
                      // send mail with defined transport object
                      let info = await transporter.sendMail({
                        from: '"WinnerX Support" <support@winnerx.shop>', // sender address
                        to: req.body.email, // list of receivers
                        subject: "WinnerX OTP For Account Verification", // Subject line
                        text:
                          "Please verify your account by using the below provided 4 digit OTP. If you didn't initiated this request please change your account password & don't share this OTP with anyone else.", // plain text body
                        html: emailTemp, // html body
                      });

                      if (info) {
                        request.get(
                          "https://winnerx.shop/emails/templates/email_verification.html",
                          async function(
                            err: any,
                            resp: any,
                            email_verification: any
                          ) {
                            let emailTemp = email_verification;
                            let transporter = nodemailer.createTransport(
                              config.mail
                            );
                            // send mail with defined transport object
                            let info = await transporter.sendMail({
                              from: '"WinnerX Support" <support@winnerx.shop>', // sender address
                              to: req.body.email, // list of receivers
                              subject: "WinnerX OTP For Account Verification", // Subject line
                              text:
                                "Please verify your account by using the below provided 4 digit OTP. If you didn't initiated this request please change your account password & don't share this OTP with anyone else.", // plain text body
                              html: emailTemp, // html body
                            });

                            if (info) {
                              request.get(
                                "https://winnerx.shop/emails/templates/otp.html",
                                async function(err: any, resp: any, otp: any) {
                                  let emailTemp = otp;
                                  let transporter = nodemailer.createTransport(
                                    config.mail
                                  );
                                  // send mail with defined transport object
                                  let info = await transporter.sendMail({
                                    from:
                                      '"WinnerX Support" <support@winnerx.shop>', // sender address
                                    to: req.body.email, // list of receivers
                                    subject:
                                      "WinnerX OTP For Account Verification", // Subject line
                                    text:
                                      "Please verify your account by using the below provided 4 digit OTP. If you didn't initiated this request please change your account password & don't share this OTP with anyone else.", // plain text body
                                    html: emailTemp, // html body
                                  });

                                  if (info) {
                                    request.get(
                                      "https://winnerx.shop/emails/templates/reset_p.html",
                                      async function(
                                        err: any,
                                        resp: any,
                                        reset_p: any
                                      ) {
                                        let emailTemp = reset_p;
                                        let transporter = nodemailer.createTransport(
                                          config.mail
                                        );
                                        // send mail with defined transport object
                                        let info = await transporter.sendMail({
                                          from:
                                            '"WinnerX Support" <support@winnerx.shop>', // sender address
                                          to: req.body.email, // list of receivers
                                          subject:
                                            "WinnerX OTP For Account Verification", // Subject line
                                          text:
                                            "Please verify your account by using the below provided 4 digit OTP. If you didn't initiated this request please change your account password & don't share this OTP with anyone else.", // plain text body
                                          html: emailTemp, // html body
                                        });

                                        if (info) {
                                          res.status(200).json({
                                            status: 200,
                                            msg:
                                              "All email templates has been sent successfully",
                                          });
                                        } else {
                                          res.status(200).json({
                                            status: 500,
                                            msg:
                                              "Reset_p email templates cannot be sent",
                                          });
                                        }
                                      }
                                    );
                                  } else {
                                    res.status(200).json({
                                      status: 500,
                                      msg: "OTP email templates cannot be sent",
                                    });
                                  }
                                }
                              );
                            } else {
                              res.status(200).json({
                                status: 500,
                                msg:
                                  "EMAIL VERIFICATION email templates cannot be sent",
                              });
                            }
                          }
                        );
                      } else {
                        res.status(200).json({
                          status: 500,
                          msg: "CPANEL CREDS email templates cannot be sent",
                        });
                      }
                    }
                  );
                } else {
                  res.status(200).json({
                    status: 500,
                    msg: "invitation email templates cannot be sent",
                  });
                }
              }
            );
          } else {
            res.status(200).json({
              status: 500,
              msg: "billing email templates cannot be sent",
            });
          }
        }
      );
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: "Oops! something went wrong while sending your email templates",
      });
    }
  };

  ResendEmailVerification = async (req: any, res: any) => {
    try {
      let { email, orgName } = req.body;

      this._db = (await req.dbConn).conn[orgName];

      const result: any = await this.findAllByCondition(
        {
          where: { email, email_status: "not_verified" },
        },
        "org_members"
      );

      if (result.length > 0) {
        const token = jwt.sign(
          { result: { id: result.id, org: orgName, email } },
          config.passphrase,
          { expiresIn: "1h" }
        );
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport(config.mail);
        fs.readFile(
          path.join(__dirname, "../templates/emails/userVerification.pug"),
          "utf8",
          async (err: any, data: any) => {
            if (err) throw err;

            let fn = pug.compile(data);
            let emailTemp = fn({
              url: `${config.baseURL}/signin?uveid=${token}`,
            });
            // send mail with defined transport object
            let info = await transporter.sendMail({
              from: '"WinnerX Support" <support@winnerx.shop>', // sender address
              to: req.body.email, // list of receivers
              subject: "WinnerX Account Verification", // Subject line
              text:
                "Please verify your email by clicking on the below button in-order for us to proceed further.", // plain text body
              html: emailTemp, // html body
            });

            if (info) {
              return res.status(200).json({
                status: 200,
                msg: "Account verification email send successfully.",
              });
            }
          }
        );
      } else {
        res.status(200).json({
          status: 200,
          msg: `Your account is already verified.`,
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while sending you email for your account verification. Please try again. ERR: ${err}`,
      });
    }
  };

  UpdateDashboardStatus = async (req: any, res: any) => {
    try {
      this._db = req.db;

      let dashStatus = await this.findAllByCondition(
        {
          where: { status: req.body.status },
        },
        "org_members"
      );

      if (dashStatus.length === 0) {
        let status = await this.updateByCondition(
          {
            where: { status: { [Op.not]: req.body.status } },
          },
          { status: req.body.status },
          "org_members"
        );

        res.status(200).json({
          status: 200,
          dashStatus: true,
          msg: "Dashboard status updated successfully.",
        });
      } else {
        res.status(200).json({
          status: 200,
          dashStatus: false,
          msg: "Dashboard status already updated",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        dashStatus: false,
        msg: `Oops! something went wrong while updating your dashboard. ERR: ${err}`,
      });
    }
  };

  FetchUser = async (req: any, res: any) => {
    try {
      const { id, email, user_type, status } = req.body;

      let condition = {};
      if (id) {
        condition = { ...condition, id };
      }
      if (email) {
        condition = { ...condition, email };
      }
      if (user_type) {
        condition = { ...condition, user_type };
      }
      if (status) {
        condition = { ...condition, status };
      }

      this._db = req.db;

      this._db["users"].hasOne(this._db["customers"], {
        foreignKey: "user_id",
      });
      this._db["users"].hasOne(this._db["sellers"], { foreignKey: "user_id" });

      const user = await this.findOne(
        {
          // attributes: { exclude: ["password"] },
          where: condition,
          include: [
            { model: this._db["customers"] },
            { model: this._db["sellers"] },
          ],
        },
        "users"
      );

      if (user) {
        res.status(200).json({
          status: 200,
          msg: `User details fetched successfully.`,
          user,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "No user details found.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  FetchUsers = async (req: any, res: any) => {
    try {
      const { id, user_type, status } = req.body;

      let condition = {};
      if (id) {
        condition = { ...condition, id };
      }
      if (user_type) {
        condition = { ...condition, user_type };
      }
      if (status) {
        condition = { ...condition, status };
      }

      this._db = req.db;

      this._db["users"].hasOne(this._db["customers"], {
        foreignKey: "user_id",
      });
      this._db["users"].hasOne(this._db["sellers"], { foreignKey: "user_id" });
      // this._db["customers"].belongsTo(this._db["users"], { foreignKey: "user_id" });
      // this._db["sellers"].belongsTo(this._db["users"], { foreignKey: "user_id" });

      const users = await this.findAllByCondition(
        {
          attributes: { exclude: ["password"] },
          where: condition,
          include: [
            { model: this._db["customers"] },
            { model: this._db["sellers"] },
          ],
        },
        "users"
      );

      if (users) {
        res.status(200).json({
          status: 200,
          msg: `User details fetched successfully.`,
          users,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "Unable to fetch users.",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        msg: `Something went wrong while processing your request. ERR: ${err}`,
      });
    }
  };

  UpdateUser = async (req: any, res: any) => {
    try {
      const { id = 0, user_type_main } = req.body;
      // console.log(" req.body>>>>", req.body);
      this._db = req.db;

      const result = await this.updateOrCreate(req.body, "users", {
        where: { id },
      });
      console.log(result);
      let tablename = "";
      if (user_type_main == "customer") {
        tablename = "customers";
      } else if (user_type_main == "seller") {
        tablename = "sellers";
      }

      if (tablename) {
        const user_id = id ? id : result.item?.id;
        // console.log("tablename, user_id >>>", tablename, user_id)
        const result1 = await this.updateOrCreate({ ...req.body }, tablename, {
          where: { user_id },
        });
      }

      if (result) {
        const { id } = result.item;
        return res.status(200).json({
          status: 200,
          id,
          msg: `User has been ${id ? "created" : "updated"} successfully.`,
        });
      } else {
        res.status(200).json({
          status: 500,
          msg: "Unable to create or update user details.",
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
