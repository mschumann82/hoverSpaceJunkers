module.exports = function(sequelize, DataTypes) {
    const Venue = sequelize.define("Venue", {
      venue: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      }
    });
  
    Venue.associate = function(models) {
      
      Venue.belongsTo(models.user, {
        foreignKey: {
          allowNull: false,
          // unique: true
        },
        unique: true
      });
    };
  
    return Venue;
  };