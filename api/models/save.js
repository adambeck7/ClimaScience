module.exports = (sequelize, DataTypes) => {
  const Save = sequelize.define('save', {
    data: {
      type: DataTypes.STRING
    },
    label: {
      type: DataTypes.STRING
    }
  })
  return Save
}
