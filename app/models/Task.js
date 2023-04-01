import { Model, DataTypes } from "sequelize";
import User from "./User.js";

class Task extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    field: "id",
                    type: DataTypes.BIGINT.UNSIGNED,
                    primaryKey: true,
                    autoIncrement: true,
                    unique: true,
                    allowNull: false,
                    required: true,
                    notEmpty: true,
                },
                description: {
                    field: "description",
                    type: DataTypes.STRING(255),
                    allowNull: false,
                    notEmpty: true,
                },
                user_id: {
                    type: DataTypes.BIGINT.UNSIGNED,
                    allowNull: false,
                    notEmpty: true,
                    required: true,
                    references: {
                        model: User,
                        key: "id",
                    },
                },
            },
            {
                sequelize,
                modelName: "task",
                charset: "utf8mb4",
                collate: "utf8mb4_bin",
            }
        );
    }
}

export default Task;
