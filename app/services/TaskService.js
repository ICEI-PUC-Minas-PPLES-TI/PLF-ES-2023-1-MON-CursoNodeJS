import { where, fn, col } from "sequelize";

import AppError from "../errors/AppError.js";
import SortPaginate from "../helpers/SortPaginate.js";

import Task from "../models/Task.js";
import User from "../models/User.js";

class TaskService {
    async create(description, user_id) {
        const task = await Task.create({
            description,
            user_id,
        }).catch(
            /* istanbul ignore next */ (error) => {
                throw new AppError(error.message, 500, error);
            }
        );

        return { id: task.id };
    }

    async find(id) {
        const task = await Task.findOne({
            where: {
                id: id,
            },
            include: [
                {
                    model: User,
                    as: "user",
                },
            ],
        }).catch(
            /* istanbul ignore next */ (error) => {
                throw new AppError(error.message, 500, error);
            }
        );
        if (task) return task;
        else throw new AppError("Tarefa não encontrada", 404);
    }

    async update(id, description = null) {
        const task = await this.find(id);

        task.update(
            {
                description: description ? description : task.description,
            },
            {
                where: { id: id },
            }
        ).catch(
            /* istanbul ignore next */ (error) => {
                throw new AppError(error.message, 500, error);
            }
        );

        return task;
    }

    async delete(id, user_id) {
        const task = await this.find(id);

        if (task.user_id != user_id)
            throw new AppError("Você não é o dono dessa tarefa", 403);

        await task.destroy().catch(
            /* istanbul ignore next */ (error) => {
                throw new AppError("Erro interno do servidor", 500, error);
            }
        );
    }

    async list(query, user_id) {
        let whre = {};

        whre.user_id = user_id;

        if (query.description) {
            whre.description = where(
                fn("LOWER", col("description")),
                "LIKE",
                "%" + query.description.toLowerCase() + "%"
            );
        }

        const attributes = Object.keys(Task.getAttributes);
        const taskQuantity = await Task.count();
        const sortPaginateOptions = SortPaginate.sortPaginate(
            query,
            attributes,
            taskQuantity
        );

        const tasks = await Task.findAndCountAll({
            where: whre,
            limit: sortPaginateOptions.limit,
            offset: sortPaginateOptions.offset,
            order: sortPaginateOptions.order,
            paranoid: sortPaginateOptions.paranoid,
        }).catch(
            /* istanbul ignore next */ (error) => {
                throw new AppError("Erro interno do servidor!", 500, error);
            }
        );

        return {
            count: tasks.rows.length,
            total: tasks.count,
            pages: Math.ceil(tasks.count / sortPaginateOptions.limit),
            tasks: tasks.rows,
        };
    }
}

export default TaskService;
