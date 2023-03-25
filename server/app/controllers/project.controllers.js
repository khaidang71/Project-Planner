const ProjectService = require("../services/project.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    if (!req.body?.title) {
        return next(new ApiError(400, "title can not be empty"));
    }

    try {
        const projectService = new ProjectService(MongoDB.client);
        const document = await projectService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the project")
        );
    }
};


exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const projectService = new ProjectService(MongoDB.client);
        const { title } = req.query;
        if (title) {
            documents = await projectService.findByName(title);
        } else {
            documents = await projectService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving projects")
        );
    }
    return res.send(documents);
};


exports.findOne = async (req, res, next) => {
    try {
        const projectService = new ProjectService(MongoDB.client);
        const document = await projectService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "project not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving project with id=${req.params.id}`))
    };
};


exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }
    try {
        const projectService = new ProjectService(MongoDB.client);
        const document = await projectService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "project not found"));
        }
        return res.send({
            message: "project was updated successfully",
        })
    } catch (error) {
        return next(
            new ApiError(500, `Error updating project with id=${req.params.id}`)
        )
    }
};

exports.delete = async (req, res, next) => {
    try {
        const projectService = new ProjectService(MongoDB.client);
        const document = await projectService.delete(req.params.id);
        if (!document) {
            return next(
                new ApiError(404, "project not found")
            )
        }
        return res.send({
            message: "project was deleted successfully"
        });
    } catch (error) {
        return next(
            new ApiError(
                500, `Could not delete project with id=${req.params.id}`
            )
        );
    }
};


exports.deleteAll = async (req, res, next) => {
    try {
        const projectService = new ProjectService(MongoDB.client);
        const deletedCount = await projectService.deleteAll();
        return res.send({
            message: `${deletedCount} projects were deleted successfully`,
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occured while removing all projects")
        );
    }
};


exports.findAllComplete = async (req, res, next) => {
    try {
        const projectService = new ProjectService(MongoDB.client);
        const documents = await projectService.findAllComplete();
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(
                500, "An error occured while retrieving complete project"
            )
        );
    }
};