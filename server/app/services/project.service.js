const { ObjectId } = require("mongodb");

class projectService {
    constructor(client) {
        this.Project = client.db().collection("projects");
    }
    // dinh nghia cac phuong thuc truy xuat csdl su dung mongodb API
    extractProjectData(payload) {
        const project = {
            title: payload.title,
            details: payload.details,
            complete: payload.complete,
        };
        // remove unfined fields
        Object.keys(project).forEach((key) => {
            project[key] === undefined && delete project[key]
        });
        return project;
    }

    async create(payload) {
        const project = this.extractProjectData(payload);
        const result = await this.Project.findOneAndUpdate(
            project,
            {
                $set: {
                    complete: project.complete === true
                }
            },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Project.find(filter);
        return await cursor.toArray();
    }

    async findByTitle(title) {
        return await this.find({
            title: { $regex: new RegExp(title), $options: "i" },
        });
    }

    async findById(id) {
        return await this.Project.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };

        const update = this.extractProjectData(payload);
        const result = await this.Project.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" },
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Project.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async findAllComplete() {
        return await this.find({ complete: true });
    }

    async deleteAll() {
        const result = await this.Project.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = projectService;