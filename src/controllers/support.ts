import { Op } from "sequelize";
import Email from "../app/entities/Email";
import { BaseRepository } from "../app/repositories/Base/BaseReprository";
import config from "../config/config";

const path = require("path");
const nodemailer = require("nodemailer");
const pug = require("pug");
const fs = require("fs");
const _ = require("lodash");

export default class SupportController extends BaseRepository<Email> {
  CreateSupportTicket = async (req: any, res: any) => {
    req.setTimeout(0);
    try {
      let { serial, subject, message, msgType, email, orgName } = req.body;
      if (email) {
        this._db = req.db;
        let ticketSerial = `ticket-${Math.ceil(Math.random() * 10000000)}`;
        const createTicket = await this.create(
          {
            serial:
              serial !== undefined && serial !== null ? serial : ticketSerial,
            subject,
            message,
            message_type: msgType,
            created: new Date(),
            last_updated: new Date(),
            org_id: req.org_id,
            email,
          },
          "org_support_tickets"
        );

        if (createTicket) {
          let notif: any = {
            org_id: req.org_id,
            email,
            message: "Your new support ticket has been created successfully",
            message_type: "system",
            serial: ticketSerial,
            status: "unread",
            subject,
          };

          const notificationRes: any = await this.create(
            notif,
            "org_notifications"
          );

          if (notificationRes) {
            fs.readFile(
              path.join(
                __dirname,
                "../templates/emails/supportNotification.pug"
              ),
              "utf8",
              async (err: any, data: any) => {
                if (err) throw err;
                let fn = pug.compile(data);
                let emailTemp = fn({
                  orgName,
                  email,
                  message,
                });
                let transporter = nodemailer.createTransport(config.mail);
                // send mail with defined transport object
                let info = await transporter.sendMail({
                  from: `"WinnerX Notification" <admin@winnerx.shop>`, // sender address
                /////////   to: "support@winnerx.shop", // list of receivers
                //   subject: `New Support Ticket From ${orgName} WinnerX Dashboard`, // Subject line
                  to: "mysupport@winnerx.shop", // list of receivers
                  subject: `New Support Ticket From ${email}`, // Subject line
                  text: `
                                    Dear WinnerX Support Team, 
                                    This is an automated notification from system as a new ticket has been created from ${orgName} WinnerX dashboard. 
                                    Please reply to the ticket and solve the query as soon as possible. 
                                    User has the following query:
                                    ${message}

                                    Best,
                                    WinnerX Admin Team
                                    `, // plain text body
                  html: emailTemp, // html body
                });

                if (info) {
                  res.status(200).json({
                    status: 200,
                    msg: `Support Ticket Created Successfully.`,
                  });
                } else {
                  res.status(200).json({
                    status: 500,
                    msg: `Something went wrong while sending notification to WinnerX Support Team but your support ticket has been created.`,
                  });
                }
              }
            );
          } else {
            res.status(200).json({
              status: 500,
              msg: `Something went wrong while createing your notification`,
            });
          }
        } else {
          res.status(200).json({
            status: 500,
            msg: `Something went wrong while creating your support ticket.`,
          });
        }
      } else {
        res.status(200).json({
          status: 500,
          msg: "Please add email details for verification.",
        });
      }
    } catch (err) {
      res.status(200).json({
        status: 500,
        msg: "Something went wrong while processing your request. " + err,
      });
    }
  };

  FetchSupportTickets = async (req: any, res: any) => {
    try {
      let { email } = req.body;
      if (email) {
        this._db = req.db;

        const tickets = await this.findAllByCondition(
          {
            where: {
              message_type: "user",
              status: {
                [Op.not]: "deleted",
              },
            },
          },
          "org_support_tickets"
        );

        // console.log("tickets.length >>>", tickets.length )

        if (tickets.length > 0) {
          let unqTickets = _.uniqBy(tickets, "serial");
          res.status(200).json({
            status: 200,
            msg: `Support Tickets Fetched Successfully.`,
            tickets: unqTickets,
          });
        } else {
          res.status(200).json({
            status: 200,
            msg: `Sorry no support tickets found.`,
            tickets: [],
          });
        }
      } else {
        res.status(200).json({
          status: 500,
          msg: "Please add email details for verification.",
        });
      }
    } catch (err) {
      res.status(200).json({
        status: 500,
        msg: "Something went wrong while processing your request. " + err,
      });
    }
  };

  FetchSupportTicketDetails = async (req: any, res: any) => {
    try {
      let { serial, email } = req.body;
      if (email) {
        this._db = req.db;
        const tickets = await this.findAllByCondition(
          {
            where: {
              serial: serial,
            },
          },
          "org_support_tickets"
        );
        if (tickets.length > 0) {
          res.status(200).json({
            status: 200,
            msg: `Support Ticket Details Fetched Successfully.`,
            tickets: tickets,
          });
        } else {
          res.status(200).json({
            status: 200,
            msg: `No details found related to current support ticket.`,
            tickets: [],
          });
        }
      } else {
        res.status(200).json({
          status: 500,
          msg: "Please add email details for verification.",
        });
      }
    } catch (err) {
      res.status(200).json({
        status: 500,
        msg: "Something went wrong while processing your request. " + err,
      });
    }
  };

  CloseDeleteSupportTicket = async (req: any, res: any) => {
    try {
      let { id, status, email } = req.body;
      if (email) {
        this._db = req.db;
        const tickets = await this.updateByCondition(
          { where: { id } },
          { status },
          "org_support_tickets"
        );
        if (tickets) {
          res.status(200).json({
            status: 200,
         
            msg: `Support ticket status successfully channged to '${status}'.`,
          });
        } else {
          res.status(200).json({
            status: 500,
            msg: `Something went wrong while changing your support tickets status.`,
          });
        }
      } else {
        res.status(200).json({
          status: 500,
          msg: "Please add email details for verification.",
        });
      }
    } catch (err) {
      res.status(200).json({
        status: 500,
        msg: "Something went wrong while processing your request. " + err,
      });
    }
  };
}
