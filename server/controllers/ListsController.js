import express from 'express'
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { listsService } from '../services/ListsService'
import { tasksService } from '../services/TasksService'



//PUBLIC
export class ListsController extends BaseController {

  constructor() {
    super("api/lists")
    this.router
      .use(auth0provider.getAuthorizedUserInfo)
      .get('/:id/tasks', this.getTasksByListId)
      .post('/:id', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
      .delete('/:listId/tasks/:taskId', this.deleteTasksByListId)
  }

  async getTasksByListId(req, res, next) {
    try {
      let data = await tasksService.getTasksByListId(req.params.id, req.userInfo.email)
      return res.send(data)
    } catch (error) { next(error) }
  }
  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await listsService.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await listsService.edit(req.params.id, req.userInfo.email, req.body)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async delete(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      await listsService.delete(req.params.id, req.userInfo.email)
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }
  async deleteTasksByListId(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      await tasksService.deleteTasksByListId(req.params.listId, req.params.taskId, req.userInfo.email)
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }
}


