import Bcryptjs from "bcryptjs";

import AppError from "../errors/AppError.js";
import AuthenticationMiddleware from "../middlewares/AuthenticationMiddleware.js";

import User from "../models/User.js";

class UserService {
    async login(username, password) {
        const user = await User.scope("withPassword").findOne({
            where: { username },
            attributes: {
                include: "password",
            },
        });

        if (!user) throw new AppError("Credenciais incorretas", 401);

        const arePasswordsEqual = await Bcryptjs.compare(
            password,
            user.dataValues.password
        );
        if (!arePasswordsEqual)
            throw new AppError("Credenciais incorretas", 401);

        const token = AuthenticationMiddleware.logIn(user.id);

        return {
            user_id: user.dataValues.id,
            token,
        };
    }

    async create(username, password) {
        const usedUsername = await User.findOne({
            where: {
                username: username,
            },
        }).catch(
            /* istanbul ignore next */ (error) => {
                throw new AppError(error.message, 500, error);
            }
        );
        if (usedUsername) throw new AppError("'username' já utilizado", 409);

        const bcryptPassword = Bcryptjs.hashSync(password, 8);
        const user = await User.create({
            username,
            password: bcryptPassword,
        }).catch(
            /* istanbul ignore next */ (error) => {
                throw new AppError(error.message, 500, error);
            }
        );
        return { id: user.id };
    }

    async find(id) {
        const user = await User.findOne({
            where: {
                id: id,
            },
        }).catch(
            /* istanbul ignore next */ (error) => {
                throw new AppError(error.message, 500, error);
            }
        );
        if (user) return user;
        else throw new AppError("Usuário não encontrado!", 404);
    }

    async update(id, password, oldPassword) {
        await this.find(id);

        let user = await User.scope("withPassword").findByPk(id);

        let bcryptPassword;
        if (password) {
            if (!(await Bcryptjs.compare(oldPassword, user.password)))
                throw new AppError("Credenciais incorretas!", 401);
            bcryptPassword = await Bcryptjs.hash(password, 8);
        }
        await user
            .update({
                password: bcryptPassword,
            })
            .catch(
                /* istanbul ignore next */ (error) => {
                    throw new AppError(error.message, 500, error);
                }
            );
        user = await User.findByPk(id);
        return user;
    }
}

export default UserService;
