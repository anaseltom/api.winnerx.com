export default (sequelize: any, DataTypes: any) => {
    const OrderItems = sequelize.define(
        "order_items",
        {
            id: {
                type: DataTypes.SMALLINT,
                primaryKey: true,
                autoIncrement: true
            },
            order_id: DataTypes.INTEGER,
            product_id: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER,
            price: DataTypes.FLOAT,
            remarks: DataTypes.STRING,
            fulfillment_status: DataTypes.STRING,
            status: DataTypes.STRING,
            modified_at: DataTypes.DATE,
            created_at: DataTypes.DATE
        },
        {
            freezeTableName: true
        }
    );
    return OrderItems;
};
