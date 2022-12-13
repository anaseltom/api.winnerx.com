export default (sequelize: any, DataTypes: any) => {
    const OrderFulfillments = sequelize.define(
        "order_fulfillments",
        {
            id: {
                type: DataTypes.SMALLINT,
                primaryKey: true,
                autoIncrement: true
            },
            ref_no: DataTypes.STRING,
            order_item_id: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER,
            price: DataTypes.DECIMAL,
            user_id: DataTypes.INTEGER,    //-- user / seller who did the fulfillment
            order_id: DataTypes.INTEGER,
            product_id: DataTypes.INTEGER,
            remarks: DataTypes.STRING,
            tracking_no: DataTypes.STRING,
            shipping_carrier: DataTypes.STRING,
            tracking_url: DataTypes.STRING,
            status: DataTypes.STRING,
            modified_at: DataTypes.DATE,
            created_at: DataTypes.DATE,
        },
        {
            freezeTableName: true
        }
    );
    return OrderFulfillments;
};
