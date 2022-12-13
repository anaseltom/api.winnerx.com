export default (sequelize: any, DataTypes: any) => {
  const DealProducts = sequelize.define(
    "deal_products",
    {
      id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true
      },
      deal_id: DataTypes.SMALLINT,
      product_id: DataTypes.SMALLINT,
      quantity_sold: DataTypes.SMALLINT,
      quantity_max: DataTypes.SMALLINT,
      date_start: DataTypes.DATE,
      date_end: DataTypes.DATE,
      limit_per_person: DataTypes.BOOLEAN,
      remarks: DataTypes.STRING,
      status: DataTypes.STRING,
      modified_at: DataTypes.DATE,
      created_at: DataTypes.DATE
    },
    {
      freezeTableName: true
    }
  );
  return DealProducts;
};
