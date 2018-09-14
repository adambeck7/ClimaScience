module.exports = (sequelize, DataTypes) => {
  const Save = sequelize.define('save', {
    data: {
      type: DataTypes.TEXT
    },
    label: {
      type: DataTypes.STRING
    },
    time: {
      type: DataTypes.INTEGER
    },
    user: {
      type: DataTypes.STRING
    }
  })
  return Save
}
