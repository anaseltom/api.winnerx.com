require("dotenv");
const cookieSession = require("cookie-session");
const path = require("path");
const express = require("express");
const session = require("express-session");
const logger = require("morgan");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const shortId = require("shortid");
const config = require("../config/config");
const uploadController = require("./../controllers/upload");
const { uploadFile } = require("../server/s3");
const sid = process.env.TWILIO_SID;
const auth_token = process.env.TWILIO_AUTH;
const client = require("twilio")(sid, auth_token);

const app = express();
const templates_url = path.join(__dirname, "../templates/");

//modified by anas
import ConnectDB from "../middlewares/ConnectDB";
import createToken from "../payment/createToken";
import createOrder from "../payment/createOrder";
import checkState from "../payment/checkState";
const DB = new ConnectDB();

import UserController from "../controllers/user";
const upload = multer({ dest: "./uploads" });

const User = new UserController();
// const s_url = path.join(__dirname, "../../uploads/");

app.use(
  cookieSession({
    name: "session",
    keys: ["tividad"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

var whitelist = ["http://example1.com", "http://example2.com"];
// var corsOptions = {
//   origin: (origin: any, callback: any) => {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
app.use(cors());
// app.use(
//   cors({
//     //     origin:'*',
//     // origin: "http://localhost:3000",
//     origin: process.env.CLIENT_URL,
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true,
//   })
// );

app.set("view engine", "pug");

// app.set('trust proxy', 1); // trust first proxy
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {},
// }));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// multipart data handling
// set the directory for the uploads to the uploaded to
//-- Note: data order must be folder, isnewname and images
const DIR = "./uploads/user/don-store/";
const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    // console.log("req.body >>>>", req.body, file);
    // console.log("Got ya");
    // console.log(file.originalname);
    cb(null, DIR);
  },
  filename: (req: any, file: any, cb: any) => {
    // console.log("req.body >>>>", req.body.isnewname, file);
    let filename = file.originalname;
    if (req.body?.isnewname?.toLowerCase() === "true") {
      filename = Date.now() + path.extname(file.originalname);
    }
    cb(null, filename);
  },
});

app.use(multer({ storage }).any());
app.use(logger("dev"));
// app.use("/uploads", express.static(path.join(__dirname, "../../uploads/")));
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(express.static(templates_url));

app.post(
  "/upload",
  uploadController.uploadMedias,
  uploadController.moveMedias,
  ////// uploadController.resizeImages,
  uploadController.getUploadResult
);
app.post(
  "/upload/image",
  uploadController.uploadBase64Image,
  uploadController.resizeImages,
  uploadController.getUploadResult
);

// made by anas
// made by anas
// made by anas
// made by anas

app.post(
  "/upload/profile/:id",
  upload.single("image"),
  [DB.ConnectToDB],
  User.uploadProfileImage
);
app.post("/api/v1/phone/send-otp", async (req: any, res: any) => {
  const { phone } = req.body;
  if (!phone) return res.status(404).send({ msg: "Phone was not provided" });
  client.verify.v2
    .services("VA390aa10834183a898d6b63d46fff95e5")
    .verifications.create({ to: phone, channel: "sms" })
    .then((verification: any) =>
      res.status(200).send({ msg: "OTP was sent successfully" })
    )
    .catch((error: any) => res.status(500).send({ msg: error }));
});

app.post("/api/v1/phone/verify-otp", async (req: any, res: any) => {
  const { phone, code } = req.body;
  if (!phone) return res.status(404).send({ msg: "Phone was not provided" });
  if (!code) return res.status(404).send({ msg: "Code was not provided" });

  client.verify.v2
    .services("VA390aa10834183a898d6b63d46fff95e5")
    .verificationChecks.create({ to: phone, code: code })
    .then((verification_check: any) => {
      if (verification_check.status == "approved")
        return res.status(200).send({ msg: "OTP provided is valid" });

      return res.status(400).send({ msg: "Wrong verification code" });
    })
    .catch((err: any) => res.status(500).send({ msg: err }));
});

app.post(
  "/upload/product/:id",
  upload.single("image"),
  [DB.ConnectToDB],
  async (req: any, res: any) => {
    try {
      const result = await uploadFile(req.files[0]);
      res.send({ msg: "success", url: result.Location });
    } catch (error) {
      res.send({ msg: "fail", error });
    }
  }
);

app.post(
  "/upload/deal/:id",
  upload.single("image"),
  [DB.ConnectToDB],
  User.uploadProfileImage
);

app.post("/payment_api", async (req: any, res: any) => {
  try {
    const { amount } = req.body;
    if (!amount)
      return res.status(401).send({ msg: "Amount is not specified" });
    const { access_token } = await createToken();
    const resp = await createOrder(access_token, amount * 100);
    return res.status(200).send({ data: resp });
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.post("/check_payment", async (req: any, res: any) => {
  try {
    const { ref } = req.body;
    if (!ref)
      return res.status(401).send({ msg: "refrence id is not specified" });
    const { access_token } = await createToken();
    const resp = await checkState(access_token, ref);
    if (resp.status === 200) return res.status(200).send(resp.data);
    return res.status(404).send({ msg: "Order with given refrence not found" });
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
});

export default app;
