export default (sequelize: any, DataTypes: any) => {
  const Orders = sequelize.define(
    "orders",
    {
      id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
      },
      order_no: DataTypes.STRING,
      customer_id: DataTypes.INTEGER,
      total_quantity: DataTypes.SMALLINT,
      total_price: DataTypes.DECIMAL,
      discount: DataTypes.DECIMAL,
      shipping_fee: DataTypes.DECIMAL,
      tax: DataTypes.DECIMAL,
      payment_status: DataTypes.STRING,
      payment_type: DataTypes.STRING,
      fulfillment_status: DataTypes.STRING,
      package_status: DataTypes.STRING,
      delivery_method: DataTypes.STRING,
      remarks: DataTypes.STRING,
      tags: DataTypes.STRING,
      // address_id_home: DataTypes.STRING,
      // address_id_shipping: DataTypes.STRING,
      // address_id_billing: DataTypes.STRING,
      tracking_no: DataTypes.STRING,
      shipping_carrier: DataTypes.STRING,
      tracking_url: DataTypes.STRING,
      status: DataTypes.STRING,
      refrence: DataTypes.TEXT,
      modified_at: DataTypes.DATE,
      created_at: DataTypes.DATE,
    },
    {
      freezeTableName: true,
    }
  );
  return Orders;
};
