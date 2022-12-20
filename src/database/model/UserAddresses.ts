export default (sequelize: any, DataTypes: any) => {
  const UserAddresses = sequelize.define(
    "user_addresses",
    {
      id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
      },
      customer_id: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      country: DataTypes.STRING,
      country_code: DataTypes.STRING,
      phone_no: DataTypes.STRING,
      mobile_no: DataTypes.STRING,
      city: DataTypes.STRING,
      company: DataTypes.STRING,
      address: DataTypes.STRING,
      apartment: DataTypes.STRING,
      state: DataTypes.STRING,
      postal_code: DataTypes.STRING,
      remarks: DataTypes.STRING,
      address_type: DataTypes.STRING,
      map_url: DataTypes.STRING,
      status: DataTypes.STRING,
      modified_at: DataTypes.DATE,
      created_at: DataTypes.DATE,
    },
    {
      freezeTableName: true,
    }
  );
  return UserAddresses;
};
