import { Sequelize } from 'sequelize';
import credentials  from '../common/credentials';
import { Book } from '../models/bookModel';
import { Author } from '../models/autherModel';



 const sequelize = new Sequelize({

    // user: 'postgres',
    username: credentials.postgres.USERNAME,

    host: credentials.postgres.HOST,
    database: credentials.postgres.DATABASE,
    password: credentials.postgres.PASSWORD,
    port: credentials.postgres.DBPORT,

    //dialect 
    dialect: "postgres",
});





sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });


//Synchronize
sequelize.sync()  //--->  sequelize.sync()  --->    sequelize.sync (alter:true)    ---- models ,     sequelize.sync (force:true) , 
  .then(() => {
    console.log('Models synchronized with the database.');  //
  })
  .catch((err) => {
    console.error('Unable to synchronize models with the database:', err);
  });



export  {sequelize};