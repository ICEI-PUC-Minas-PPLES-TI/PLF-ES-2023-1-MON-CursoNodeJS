import { object, string, number, mixed } from "yup";

import AppError from "../errors/AppError.js";

import TaskService from "../services/TaskService.js";

class TaskController {
    async create(request, response) {
        const scheme = object().shape({
            description: string("'description' deve ser string")
                .max(255, "'description' deve ter no máximo 255 caracteres")
                .required("'description' é um campo obrigatório"),
        });

        try {
            await scheme.validate(request.body, { abortEarly: false });
        } catch (error) {
            throw new AppError(error.name, 422, error.errors);
        }

        const { description } = request.body;

        const taskService = new TaskService();
        const task = await taskService.create(description, request.userId);

        return response.status(201).json(task);
    }

    async find(request, response) {
        const scheme = object().shape({
            id: number("'id' deve ser um número")
                .min(1, "'id' deve ser no mínimo 1")
                .required("'id' é um parâmetro obrigatório"),
        });

        try {
            await scheme.validate(request.params, { abortEarly: false });
        } catch (error) {
            throw new AppError(error.name, 422, error.errors);
        }

        const { id } = request.params;

        const taskService = new TaskService();
        const task = await taskService.find(id);

        return response.status(200).json(task);
    }

    async update(request, response) {
        const scheme = object().shape({
            description: string("'description' deve ser string")
                .max(255, "'description' deve ter no máximo 255 caracteres")
                .required("'description' é um campo obrigatório"),
        });

        const schemeParam = object().shape({
            id: number("'id' deve ser um número")
                .min(1, "'id' deve ser no mínimo 1")
                .required("'id' é um parâmetro obrigatório"),
        });

        try {
            await scheme.validate(request.body, { abortEarly: false });
            await schemeParam.validate(request.params, { abortEarly: false });
        } catch (error) {
            throw new AppError(error.name, 422, error.errors);
        }

        const { id } = request.params;
        const { description } = request.body;

        const taskService = new TaskService();
        const task = await taskService.update(id, description);

        return response.status(200).json(task);
    }

    async delete(request, response) {
        const scheme = object().shape({
            id: number("'id' deve ser um número")
                .min(1, "'id' deve ser no mínimo 1")
                .required("'id' é um parâmetro obrigatório"),
        });

        try {
            await scheme.validate(request.params, { abortEarly: false });
        } catch (error) {
            throw new AppError(error.name, 422, error.errors);
        }

        const { id } = request.params;

        const taskService = new TaskService();
        await taskService.delete(id, request.userId);

        return response.status(204).json();
    }

    async list(request, response) {
        const orderEnum = ["ASC", "DESC"];
        const scheme = object().shape({
            page: number("'page' deve ser um número"),
            limit: number("'limit' deve ser um número"),
            attribute: string("'attribute' deve ser uma string"),
            order: mixed().oneOf(
                orderEnum,
                `'order' deve ser um desses: ${orderEnum}.`
            ),
        });

        try {
            await scheme.validate(request.query, { abortEarly: false });
        } catch (error) {
            throw new AppError(error.name, 422, error.errors);
        }

        const taskService = new TaskService();
        const tasks = await taskService.list(request.query, request.userId);

        return response.status(200).json(tasks);
    }
}

export default TaskController;
