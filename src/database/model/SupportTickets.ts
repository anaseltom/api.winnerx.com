export default (sequelize: any, DataTypes: any) => {
  const OrgSupportTickets = sequelize.define(
    "org_support_tickets",
    {
      id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true
      },
      serial: DataTypes.STRING,
      subject: DataTypes.STRING,
      message: DataTypes.STRING,
      message_type: DataTypes.STRING,
      status: DataTypes.STRING,
      org_id: DataTypes.INTEGER,
      email: DataTypes.STRING,
      modified_at: DataTypes.DATE,
      created_at: DataTypes.DATE
    },
    {
      freezeTableName: true
    }
  );
  return OrgSupportTickets;
};