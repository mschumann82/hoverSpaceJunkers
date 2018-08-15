module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
          },
          city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
          },
          state: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [2,2]
            }
          },
    });
  
    User.associate = function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      User.hasMany(models.Artist, {
        onDelete: "cascade"
      });
    };
    User.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        User.hasMany(models.Venue, {
          onDelete: "cascade"
        });
      };
  
    return User;
  };
  