import { Model, DataTypes } from "sequelize";

class User extends Model {
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
                    notEmpty: true,
                    required: true,
                },
                username: {
                    field: "username",
                    type: DataTypes.STRING(100),
                    allowNull: false,
                    unique: true,
                    notEmpty: true,
                },
                password: {
                    field: "password",
                    type: DataTypes.STRING(64),
                    allowNull: false,
                    notEmpty: true,
                    comment: "Encrypted with 64 digits",
                },
            },
            {
                tableName: "user",
                charset: "utf8mb4",
                collate: "utf8mb4_bin",
                sequelize,
                defaultScope: {
                    attributes: {
                        exclude: [
                            "password", // To not return password
                        ],
                    },
                },
                scopes: {
                    withPassword: {
                        attributes: { include: ["password"] },
                    },
                },
            }
        );
    }
}

export default User;
