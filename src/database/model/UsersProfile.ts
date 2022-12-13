export default (sequelize: any, DataTypes: any) => {
  const UsersProfile = sequelize.define(
    "users_profile",
    {
      id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
      },
      email: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      gender: DataTypes.STRING,
      mobile_no: DataTypes.STRING,
      birthdate: DataTypes.STRING,
      country: DataTypes.STRING,
      region: DataTypes.STRING,
      city: DataTypes.STRING,
      address: DataTypes.STRING,
      certifications: DataTypes.STRING,
      experience_info: DataTypes.STRING,
      nationality: DataTypes.STRING,
      skills: DataTypes.STRING,
      tin: DataTypes.STRING,
      title: DataTypes.STRING,
      transport: DataTypes.STRING,
      years_experience: DataTypes.STRING,
      about_me: DataTypes.STRING,
      profile_pic: DataTypes.STRING,
      passport_front: DataTypes.STRING,
      passport_back: DataTypes.STRING,
      national_id: DataTypes.STRING,
      objective: DataTypes.STRING,
      status: DataTypes.STRING,
      modified_at: DataTypes.DATE,
      created_at: DataTypes.DATE
    },
    {
      freezeTableName: true,
    }
  );
  // UsersProfile.associate = function(models: any) {
  //   UsersProfile.belongsTo(models.User);
  // };
  // const associate = ({ Users }: { Users: any }) => {
  //   UsersProfile.belongsTo(Users);
  // };

  return UsersProfile;
};
