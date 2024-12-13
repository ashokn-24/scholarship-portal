const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const User = require("./User");

const UserOAuth = sequelize.define(
  "useroauth",
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    accessToken: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    provider: {
      type: DataTypes.ENUM("google", "microsoft"),
      allowNull: false,
    },
  },
  { freezeTableName: true, timestamps: true, paranoid: true }
);

UserOAuth.updateOrCreate = async function ({ where, data, transaction }) {
  const userOauth = await UserOAuth.findOne({
    where: { ...where },
    transaction: transaction,
  });
  if (!userOauth) {
    const oauth = await UserOAuth.create(
      { ...data },
      { transaction: transaction }
    );

    return;
  }
  await userOauth.update({ ...data }, { transaction: transaction });
};

User.hasMany(UserOAuth);

UserOAuth.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

module.exports = UserOAuth;
