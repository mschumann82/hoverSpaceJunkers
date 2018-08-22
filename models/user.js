
module.exports = function(sequelize, Sequelize) {

	var User = sequelize.define('user', {
		id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
		username: {type:Sequelize.STRING,allowNull: false, validate: { len: [1] }},
		city : {type:Sequelize.STRING, allowNull: false, validate: { len: [1] }},
		state: { type:Sequelize.STRING, allowNull: false, validate: { len: [2,2] } },
		password : {type: Sequelize.STRING,allowNull: false, validate: { len: [6] } }, 
		last_login: {type: Sequelize.DATE},
        status: {type: Sequelize.ENUM('active','inactive'),defaultValue:'active' }
});

User.associate = function(models) {
      // Associating Users with other tables
      
      User.hasMany(models.Artist, {
        onDelete: "cascade"
      });
      User.hasMany(models.Venue, {
        onDelete: "cascade"
      });
    };

	return User;

}