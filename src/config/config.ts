require("dotenv").config();

const config: any = {
  baseURL: process.env.BASE_URL,
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  // mysql: {
  //     username: process.env.SQL_DB_USERNAME,
  //     password: process.env.SQL_DB_PASSWORD,
  //     databaseName: process.env.SQL_DB_DATABASE_NAME,
  //     host: process.env.SQL_DB_HOST,
  //     port: process.env.SQL_DB_PORT,
  //     dialect: 'mysql',
  //     timezone: '+06:00',
  //     operatorsAliases: false
  // },
  mysql: {
    username: process.env.SQL_DB_USERNAME,
    password: process.env.SQL_DB_PASSWORD,
    databaseName: process.env.SQL_DB_DATABASE_NAME,
    host: process.env.SQL_DB_HOST,
    port: process.env.SQL_DB_PORT,
    dialect: process.env.SQL_DIALECT,
    timezone: "+06:00",
    operatorsAliases: false,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    pass: process.env.REDIS_PASS,
  },
  passphrase: process.env.secretKey,
  mail: {
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  },
  domainsAuthID: process.env.RESELLER_CLUB_AUTHID,
  domainsApiKey: process.env.RESELLER_CLUB_APIKEY,
  whmToken: process.env.WHM_TOKEN,
  whmURL: process.env.WHM_URL,
  domainCustomerID: process.env.domainCustomerID,
  domainContactID: process.env.domainContactID,
  premiumDomainURL: process.env.premiumDomainURL,

  EXCHANGE_PROVIDER: process.env.EXCHANGE_PROVIDER,

  PHANTOM_JS_PATH: process.env.PHANTOM_JS_PATH,

  COUPON_GOPRO5: process.env.COUPON_GOPRO5,
  COUPON_GOPRO6: process.env.COUPON_GOPRO6,
  DEFAULT_TAX: process.env.DEFAULT_TAX,
};

export default config;
