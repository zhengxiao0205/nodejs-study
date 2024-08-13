export default (sequelize, DataTypes) => {
  return sequelize.define(
    'tb_user',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
    },
    { tableName: 'tb_user' }
  )
}
