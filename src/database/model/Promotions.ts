export default (sequelize: any, DataTypes: any) => {
  const Promotions = sequelize.define(
    "promotions",
    {
      id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true
      },
      product_id: DataTypes.SMALLINT,
      percentage_off: DataTypes.SMALLINT,
      remarks: DataTypes.STRING,
      expiry_date: DataTypes.STRING,
      status: DataTypes.STRING,
      modified_at: DataTypes.DATE,
      created_at: DataTypes.DATE
    },
    {
      freezeTableName: true
    }
  );
  return Promotions;
};
