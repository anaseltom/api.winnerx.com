export default (sequelize: any, DataTypes: any) => {
  const BillingCapture = sequelize.define(
    "billing_capture",
    {
      id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true
      },
      subscription_id: DataTypes.STRING,
      object: DataTypes.STRING,
      items: DataTypes.TEXT,
      created: DataTypes.DATE,
      current_period_end: DataTypes.DATE,
      current_period_start: DataTypes.DATE,
      customer_id: DataTypes.STRING,
      trial_end: DataTypes.DATE,
      trial_start: DataTypes.DATE,
      tax_percent: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      subscription_status: DataTypes.STRING,
      livemode: DataTypes.BOOLEAN,
      status: DataTypes.STRING,
      email: DataTypes.STRING,
      org_id: DataTypes.INTEGER,
      modified_at: DataTypes.DATE,
      created_at: DataTypes.DATE
    },
    {
      freezeTableName: true
    }
  );
  return BillingCapture;
};