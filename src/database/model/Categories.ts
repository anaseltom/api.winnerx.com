export default (sequelize: any, DataTypes: any) => {
  const Categories = sequelize.define(
    "categories",
    {
      id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true
      },
      category_code: DataTypes.STRING,
      category_name: DataTypes.STRING,
      category_name_ar: DataTypes.STRING,
      keywords: DataTypes.STRING,
      description: DataTypes.STRING,
      header: DataTypes.STRING,
      footer: DataTypes.STRING,
      image_small: DataTypes.STRING,
      image_medium: DataTypes.STRING,
      image_large: DataTypes.STRING,
      extra1: DataTypes.STRING,
      extra2: DataTypes.STRING,
      extra3: DataTypes.STRING,
      parent_id: DataTypes.SMALLINT,
      category_order: DataTypes.SMALLINT,
      seller_id: DataTypes.SMALLINT,
      imageSmall: DataTypes.STRING,
      categoryCode: DataTypes.STRING,
      categoryName: DataTypes.STRING,
      status: DataTypes.STRING,
      modified_at: DataTypes.DATE,
      created_at: DataTypes.DATE
    },
    {
      freezeTableName: true
    }
  );
  return Categories;
};
