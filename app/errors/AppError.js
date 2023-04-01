class AppError {
    constructor(message, statusCode = 500, error) {
        if (message == "ValidationError") {
            this.message = "Erro de validação de dados!";
            this.statusCode = statusCode;
            this.error = error;
        } else {
            this.message = message;
            this.statusCode = statusCode;
            this.error = error;
        }
    }
}

export default AppError;
