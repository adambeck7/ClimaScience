module.exports = (sequelize, DataTypes) => {
  const Save = sequelize.define('save', {
    data: {
      type: DataTypes.STRING
    }
  })
  return Save
}
