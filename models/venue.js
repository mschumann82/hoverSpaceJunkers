module.exports = function(sequelize, DataTypes) {
    const Venue = sequelize.define("Venue", {
      artist: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      }
    });
  
    Venue.associate = function(models) {
      
      Venue.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Venue;
  };