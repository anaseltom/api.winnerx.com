export default (sequelize: any, DataTypes: any) => {
  const BillingDetails = sequelize.define(
    "billing_details",
    {
      id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      country: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zipcode: DataTypes.STRING,
      address: DataTypes.STRING,
      stripe_id: DataTypes.STRING,
      stripe_payment_method_id: DataTypes.STRING,
      primary_card: DataTypes.BOOLEAN,
      last4: DataTypes.STRING,
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
  return BillingDetails;
};