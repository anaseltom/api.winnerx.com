export default (sequelize: any, DataTypes: any) => {
  const Vendors = sequelize.define(
    "vendors",
    {
      id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true
      },
      categoryCode: DataTypes.STRING,
      companyName: DataTypes.STRING,
      contactFName: DataTypes.STRING,
      contactLName: DataTypes.STRING,
      contactTitle: DataTypes.STRING,
      address1: DataTypes.STRING,
      address2: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      postalCode: DataTypes.STRING,
      country: DataTypes.STRING,
      lat: DataTypes.STRING,
      lon: DataTypes.STRING,
      phone1: DataTypes.STRING,
      phone2: DataTypes.STRING,
      email1: DataTypes.STRING,
      email2: DataTypes.STRING,
      url: DataTypes.STRING,
      paymentMethods: DataTypes.STRING,
      discountType: DataTypes.STRING,
      typeGoods: DataTypes.STRING,
      discountAvailable: DataTypes.BOOLEAN,
      logo: DataTypes.STRING,
      extra1: DataTypes.STRING,
      extra2: DataTypes.STRING,
      extra3: DataTypes.STRING,
      extra4: DataTypes.STRING,
      extra5: DataTypes.STRING,
      notes: DataTypes.STRING,
      status: DataTypes.STRING,
      modified_at: DataTypes.DATE,
      created_at: DataTypes.DATE
    },
    {
      freezeTableName: true
    }
  );
  return Vendors;
};
