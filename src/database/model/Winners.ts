export default (sequelize: any, DataTypes: any) => {
  const Winners = sequelize.define(
    "winners",
    {
      id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true
      },
      entry_code: DataTypes.STRING,
      customer_id: DataTypes.SMALLINT,
      deal_id: DataTypes.SMALLINT,
      product_id: DataTypes.SMALLINT, 
      deal_date_end: DataTypes.DATE, 
      remarks: DataTypes.STRING,
      status: DataTypes.STRING,
      modified_at: DataTypes.DATE,
      created_at: DataTypes.DATE
    },
    {
      freezeTableName: true
    }
  );
  return Winners;
};
