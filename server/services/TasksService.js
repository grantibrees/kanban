import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class TasksService {

  async getTasksByListId(id, userEmail) {
    let data = await dbContext.Tasks.find({ listId: id, creatorEmail: userEmail })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this list")
    }
    return data

  }

  async getAll(userEmail) {
    return await dbContext.Tasks.find({ creatorEmail: userEmail }).populate("creator", "name picture")
  }

  async getById(id, userEmail) {
    let data = await dbContext.Tasks.find({ listId: id, creatorEmail: userEmail })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board")
    }
    return data
  }

  async create(rawData) {
    let data = await dbContext.Tasks.create(rawData)
    return data
  }

  async addComment(id, body) {
    try {
      return await dbContext.Tasks.findOneAndUpdate(
        { _id: id },
        { $addToSet: { comments: body } },
        { new: true }
      )
    } catch (error) { console.error(error) }
  }

  async deleteComment(id, commentId) {
    return await dbContext.Tasks.findByIdAndUpdate(
      { _id: id },
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );
  }
  async editComment(id, commentId, body) {
    return await dbContext.Tasks.findOneAndUpdate(
      { "_id": id, "comments._id": commentId },
      { $set: { "comments.$": body } },
      { new: true }
    );
  }

  async edit(id, userEmail, update) {
    let data = await dbContext.Tasks.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    return data;
  }

  async delete(id, userEmail) {
    let data = await dbContext.Tasks.findOneAndRemove({ _id: id, creatorEmail: userEmail });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
  }
  async deleteTasksByListId(listId, taskId, userEmail) {
    let data = await dbContext.Tasks.findOneAndRemove({ listId: listId, _id: taskId, creatorEmail: userEmail });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this list");
    }
  }
}


export const tasksService = new TasksService()