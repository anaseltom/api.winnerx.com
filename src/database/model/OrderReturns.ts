export default (sequelize: any, DataTypes: any) => {
    const OrderReturns = sequelize.define(
        "order_returns",
        {
            id: {
                type: DataTypes.SMALLINT,
                primaryKey: true,
                autoIncrement: true
            },
            ref_no: DataTypes.STRING,
            order_item_id: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER,
            user_id: DataTypes.INTEGER,
            order_id: DataTypes.INTEGER,
            product_id: DataTypes.INTEGER,
            issue_type: DataTypes.STRING,
            return_description: DataTypes.STRING,
            reason: DataTypes.STRING,
            date_requested: DataTypes.STRING,
            package_status: DataTypes.STRING,
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
    return OrderReturns;
};
