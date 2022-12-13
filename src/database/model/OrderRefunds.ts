export default (sequelize: any, DataTypes: any) => {
    const OrderRefunds = sequelize.define(
        "order_refunds",
        {
            id: {
                type: DataTypes.SMALLINT,
                primaryKey: true,
                autoIncrement: true
            },
            ref_no: DataTypes.STRING,
            order_item_id: DataTypes.INTEGER,
            amount: DataTypes.DECIMAL,
            user_id: DataTypes.INTEGER,
            order_id: DataTypes.INTEGER,
            product_id: DataTypes.INTEGER,
            issue_type: DataTypes.STRING,
            reason: DataTypes.STRING,
            date_requested: DataTypes.STRING,
            remarks: DataTypes.STRING,
            status: DataTypes.STRING,
            modified_at: DataTypes.DATE,
            created_at: DataTypes.DATE,
        },
        {
            freezeTableName: true
        }
    );
    return OrderRefunds;
};
