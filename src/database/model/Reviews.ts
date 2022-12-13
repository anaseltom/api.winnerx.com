export default (sequelize: any, DataTypes: any) => {
  const Reviews = sequelize.define(
    "reviews",
    {
      id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true
      },
      product_id: DataTypes.SMALLINT,
      user_id: DataTypes.SMALLINT,
      rating: DataTypes.SMALLINT,
      remarks: DataTypes.STRING,
      status: DataTypes.STRING,
      modified_at: DataTypes.DATE,
      created_at: DataTypes.DATE
    },
    {
      freezeTableName: true
    }
  );
  return Reviews;
};
