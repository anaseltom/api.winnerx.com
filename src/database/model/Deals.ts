export default (sequelize: any, DataTypes: any) => {
  const Deals = sequelize.define(
    "deals",
    {
      id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      name_ar: DataTypes.STRING,
      description_ar: DataTypes.STRING,
      image_url_main: DataTypes.STRING,
      image_url_other1: DataTypes.STRING,
      image_url_other2: DataTypes.STRING,
      image_url_other3: DataTypes.STRING,
      image_url_other4: DataTypes.STRING,
      image_url_other5: DataTypes.STRING,
      image_url_other6: DataTypes.STRING,
      image_url_other7: DataTypes.STRING,
      // product_id: DataTypes.SMALLINT,
      // quantity_sold: DataTypes.SMALLINT,
      // quantity_max: DataTypes.SMALLINT,
      date_start: DataTypes.DATE,
      date_end: DataTypes.DATE,
      // limit_per_person: DataTypes.BOOLEAN,
      remarks: DataTypes.STRING,
      status: DataTypes.STRING,
      modified_at: DataTypes.DATE,
      created_at: DataTypes.DATE
    },
    {
      freezeTableName: true
    }
  );
  return Deals;
};
