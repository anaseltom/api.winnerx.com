export default (sequelize: any, DataTypes: any) => {
  const Sellers = sequelize.define(
    "sellers",
    {
      id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: DataTypes.STRING,
      email: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      store_name: DataTypes.STRING,
      organization: DataTypes.STRING,
      address1: DataTypes.STRING,
      address2: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      postal_code: DataTypes.STRING,
      country: DataTypes.STRING,
      lat: DataTypes.SMALLINT,
      lng: DataTypes.SMALLINT,
      location: DataTypes.STRING,
      browser_name: DataTypes.STRING,
      website: DataTypes.STRING,
      phone_no: DataTypes.STRING,
      mobile_no: DataTypes.STRING,
      phone_no1: DataTypes.STRING,
      phone_no2: DataTypes.STRING,
      email1: DataTypes.STRING,
      email2: DataTypes.STRING,
      extra1: DataTypes.STRING,
      extra2: DataTypes.STRING,
      extra3: DataTypes.STRING,
      extra4: DataTypes.STRING,
      extra5: DataTypes.STRING,
      notes: DataTypes.STRING,
      referred_by: DataTypes.STRING,
      status: DataTypes.STRING,
      modified_at: DataTypes.DATE,
      created_at: DataTypes.DATE
    },
    {
      freezeTableName: true
    }
  );
  return Sellers;
};
