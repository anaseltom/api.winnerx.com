export default (sequelize: any, DataTypes: any) => {
  const Billing = sequelize.define(
    "billing",
    {
      id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true
      },
      package_name: DataTypes.STRING,
      package_description: DataTypes.STRING,
      package_code: DataTypes.STRING,
      package_price: DataTypes.DOUBLE,
      package_type: DataTypes.STRING,
      package_promo_code: DataTypes.STRING,
      package_discount: DataTypes.FLOAT,
      product_id: DataTypes.INTEGER,
      payment_status: DataTypes.STRING,
      org_id: DataTypes.INTEGER,
      email: DataTypes.STRING,
      status: DataTypes.STRING,
      modified_at: DataTypes.DATE,
      created_at: DataTypes.DATE
    },
    {
      freezeTableName: true
    }
  );
  return Billing;
};