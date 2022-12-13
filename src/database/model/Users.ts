export default (sequelize: any, DataTypes: any) => {
  const Users = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      country: DataTypes.STRING,
      role: DataTypes.STRING,
      permissions: DataTypes.STRING,
      org_name: DataTypes.STRING,
      session: DataTypes.STRING,
      email_status: DataTypes.STRING,
      user_type: DataTypes.STRING,
      status: DataTypes.STRING,
      profile_url: DataTypes.TEXT,
      modified_at: DataTypes.DATE,
      created_at: DataTypes.DATE,
    },
    {
      freezeTableName: true,
    }
  );
  return Users;
};
