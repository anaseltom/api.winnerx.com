export default (sequelize: any, DataTypes: any) => {
  const PaymentMethods = sequelize.define(
    "payment_methods",
    {
      id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: DataTypes.SMALLINT,
      name: DataTypes.STRING,
      customer_id: DataTypes.STRING,
      payment_method_id: DataTypes.STRING,
      country: DataTypes.STRING,
      exp_month: DataTypes.SMALLINT,
      exp_year: DataTypes.SMALLINT,
      last4: DataTypes.STRING,
      type: DataTypes.STRING,
      is_primary: DataTypes.BOOLEAN,
      status: DataTypes.STRING,
      modified_at: DataTypes.DATE,
      created_at: DataTypes.DATE
    },
    {
      freezeTableName: true
    }
  );
  return PaymentMethods;
};
