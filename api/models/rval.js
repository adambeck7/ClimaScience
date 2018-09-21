module.exports = (sequelize, DataTypes) => {
  const rVal = sequelize.define('rval', {
    rValue: {
      type: DataTypes.FLOAT
    },
    dataOne: {
      type: DataTypes.STRING
    },
    dataTwo: {
      type: DataTypes.STRING
    },
    time: {
      type: DataTypes.INTEGER
    }
  })
  return rVal
}
