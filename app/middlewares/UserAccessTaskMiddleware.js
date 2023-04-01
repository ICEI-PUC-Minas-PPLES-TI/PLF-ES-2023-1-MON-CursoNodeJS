import AppError from "../errors/AppError.js";

import Task from "../models/Task.js";

const verifyTaskPermission = async (request, response, next) => {
    const task = await Task.findOne({
        where: {
            id: request.params.id,
            user_id: request.userId,
        },
    }).catch(
        /* istanbul ignore next */ (error) => {
            throw new AppError(error.message, 500, error);
        }
    );
    if (task) next();
    else throw new AppError("Usuário não tem acesso a essa Tarefa!", 403);
};

const UserAccessTaskMiddleware = {
    verifyTaskPermission,
};

export default UserAccessTaskMiddleware;
