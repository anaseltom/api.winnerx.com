export default (sequelize: any, DataTypes: any) => {
    const DealEntries = sequelize.define(
        "deal_entries",
        {
            id: {
                type: DataTypes.SMALLINT,
                primaryKey: true,
                autoIncrement: true
            },
            order_id: DataTypes.INTEGER, 
            customer_id: DataTypes.INTEGER,
            deal_id: DataTypes.INTEGER,
            product_id: DataTypes.INTEGER,
            entry_code: DataTypes.STRING, 
            remarks: DataTypes.STRING,
            status: DataTypes.STRING,
            modified_at: DataTypes.DATE,
            created_at: DataTypes.DATE,
        },
        {
            freezeTableName: true
        }
    );
    return DealEntries;
};
