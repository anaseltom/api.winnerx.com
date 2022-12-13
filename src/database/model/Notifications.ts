export default (sequelize: any, DataTypes: any) => {
  const Notifications = sequelize.define(
    "notifications",
    {
      id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true
      },
      org_id: DataTypes.STRING,
      email: DataTypes.STRING,
      message: DataTypes.STRING,
      message_type: DataTypes.STRING,
      serial: DataTypes.STRING,
      status: DataTypes.STRING,
      subject: DataTypes.STRING,
      modified_at: DataTypes.DATE,
      created_at: DataTypes.DATE
    },
    {
      freezeTableName: true
    }
  );
  return Notifications;
};
