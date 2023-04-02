import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

import User from "../models/User.js";
import Task from "../models/Task.js";

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USERNAME,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_DOCKER_PORT,
        logging: process.env.APP_DEBUG ? console.log : false,
        dialect: "mysql",
        define: {
            timestamps: false,
            freezeTableName: true,
        },
    }
);

const database = async function connect() {
    try {
        // * Start Models here
        User.init(sequelize);
        Task.init(sequelize);

        // * Configure Associations here
        Task.belongsTo(User, {
            as: "user",
            foreignKey: "user_id",
        });

        // await sequelize.sync({ alter: false }); // force: true to drop and re-create
        await sequelize.authenticate();

        if (process.env.APP_DEBUG) {
            console.log(
                `\n--> Connection with '${process.env.MYSQL_HOST}:${process.env.MYSQL_DOCKER_PORT}/${process.env.MYSQL_DATABASE}' established`
            );
        }
    } catch (error) {
        if (process.env.APP_DEBUG) {
            console.error(
                `\nUnable to establish, check or re-sync connection with '${process.env.MYSQL_HOST}:${process.env.MYSQL_DOCKER_PORT}/${process.env.MYSQL_DATABASE} with user '${process.env.MYSQL_USERNAME}' and password '${process.env.MYSQL_PASSWORD}!'`
            );
            console.error(error);
        }
    }
};

export default database;
