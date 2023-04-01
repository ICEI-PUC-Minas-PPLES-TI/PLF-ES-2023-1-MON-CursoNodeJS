import { object, string } from "yup";

import AppError from "../errors/AppError.js";

import UserService from "../services/UserService.js";

class UserController {
    async login(request, response) {
        const scheme = object().shape({
            username: string("'username' deve ser string")
                .max(100, "'username' deve ter no máximo 100 caracteres")
                .required("'username' é um campo obrigatório"),
            password: string("'password' deve ser string")
                .min(8, "'password' deve ter no mínimo 8 caracteres")
                .required("'password' é um campo obrigatório"),
        });

        try {
            await scheme.validate(request.body, {
                abortEarly: false,
            });
        } catch (error) {
            throw new AppError(error.name, 422, error.errors);
        }

        let { username, password } = request.body;

        const userService = new UserService();
        const { user_id, token } = await userService.login(username, password);

        return response.status(200).json({
            user_id,
            token,
        });
    }

    async create(request, response) {
        const scheme = object().shape({
            username: string("'username' deve ser string")
                .max(100, "'username' deve ter no máximo 100 caracteres")
                .required("'username' é um campo obrigatório"),
            password: string("'password' deve ser string")
                .min(8, "'password' deve ter no mínimo 8 caracteres")
                .required("'password' é um campo obrigatório"),
        });

        try {
            await scheme.validate(request.body, { abortEarly: false });
        } catch (error) {
            throw new AppError(error.name, 422, error.errors);
        }

        const { username, password } = request.body;

        const userService = new UserService();
        const user = await userService.create(username, password);

        return response.status(201).json(user);
    }

    async find(request, response) {
        //const id = request.params.id;
        const id = request.userId;
        if (!id || !(id > 0))
            throw new AppError("Favor enviar um id válido na URL", 422);
        const userService = new UserService();
        const user = await userService.find(id);
        return response.status(200).json(user);
    }

    async update(request, response) {
        const scheme = object().shape({
            password: string("'password' deve ser string").min(
                8,
                "'password' deve ter no mínimo 8 caracteres"
            ),
            oldPassword: string("'oldPassword' deve ser string"),
        });

        try {
            await scheme.validate(request.body, { abortEarly: false });
        } catch (error) {
            throw new AppError(error.name, 422, error.errors);
        }

        const { password, oldPassword } = request.body;
        const id = request.userId;

        const userService = new UserService();
        const user = await userService.update(id, password, oldPassword);

        return response.status(200).json(user);
    }
}

export default UserController;
