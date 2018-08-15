module.exports = function(sequelize, DataTypes) {
    const Artist = sequelize.define("Artist", {
      artist: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      }
    });
  
    Artist.associate = function(models) {
      
      Artist.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Artist;
  };