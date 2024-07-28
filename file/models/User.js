const {Sequelize, DataTypes}  = require('sequelize')
module. exports = function (sequelize){
const User = sequelize.define( 'user',{
username: {
    type: Datatypes.STRING,
    allowNull: false, 
    unique: true,
},
email: {
    type: Datatypes.STRING,
    allowNull: false, 
    unique: true,
},
password: {
    type: Datatypes.STRING,
    allowNull: false,  
},
});
return User;
};
