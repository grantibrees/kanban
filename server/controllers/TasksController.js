import express from 'express'
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { tasksService } from '../services/TasksService'



//PUBLIC
export class TasksController extends BaseController {


  constructor() {
    super("api/tasks")
    this.router
      .use(auth0provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .post('', this.create)
      .post('/:id/comments', this.addComments)
      .delete("/:id/comments/:commentId", this.deleteComment)
      .post("/:id/comments/:commentId", this.editComment)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }


  async getAll(req, res, next) {
    try {
      //only gets tasks by user who is logged in
      let data = await tasksService.getAll(req.userInfo.email)
      return res.send(data)
    }
    catch (err) { next(err) }
  }

  async getById(req, res, next) {
    try {
      let data = await tasksService.getById(req.params.id, req.userInfo.email)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await tasksService.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }
  async addComments(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await tasksService.addComment(req.params.id, req.body)
      return res.send(data)
    } catch (error) { console.error(error) }
  }
  async edit(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await tasksService.edit(req.params.id, req.userInfo.email, req.body)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async editComment(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await tasksService.editComment(req.params.id, req.params.commentId, req.body)
      res.send(data)
    } catch (error) { next(error) }
  }
  async delete(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      await tasksService.delete(req.params.id, req.userInfo.email)
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }
  async deleteComment(req, res, next) {
    try {
      await tasksService.deleteComment(req.params.id, req.params.commentId)

      res.send("comment deleted")

    } catch (error) { next(error) }
  }
}


