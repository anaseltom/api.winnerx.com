export default (sequelize: any, DataTypes: any) => {
  const Customers = sequelize.define(
    "customers",
    {
      id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: DataTypes.INTEGER,
      customer_id: DataTypes.INTEGER,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      country: DataTypes.STRING,
      country_code: DataTypes.STRING,
      phone_no: DataTypes.STRING,
      city: DataTypes.STRING,
      company: DataTypes.STRING,
      address: DataTypes.STRING,
      apartment: DataTypes.STRING,
      state: DataTypes.STRING,
      postal_code: DataTypes.STRING,
      country_code1: DataTypes.STRING,
      phone_no1: DataTypes.STRING,
      collect_tax: DataTypes.BOOLEAN,
      marketing_emails: DataTypes.BOOLEAN,
      marketing_sms: DataTypes.BOOLEAN,
      notes: DataTypes.STRING,
      tags: DataTypes.STRING,
      extra1: DataTypes.STRING,
      extra2: DataTypes.STRING,
      extra3: DataTypes.STRING,
      extra4: DataTypes.STRING,
      extra5: DataTypes.STRING,
      map_url: DataTypes.STRING,
      referred_by: DataTypes.STRING,
      points: DataTypes.INTEGER,
      order_no_current: DataTypes.STRING,
      total_orders: DataTypes.INTEGER,
      total_spent: DataTypes.DECIMAL,
      status: DataTypes.STRING,
      modified_at: DataTypes.DATE,
      created_at: DataTypes.DATE,
    },
    {
      freezeTableName: true,
    }
  );
  return Customers;
};
