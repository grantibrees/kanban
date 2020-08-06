import express from 'express'
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { boardsService } from '../services/BoardsService'
import { listsService } from '../services/listsService'



//PUBLIC
export class BoardsController extends BaseController {
  constructor() {
    super("api/boards")
    console.log("registering BoardsController");
    this.router
      .use(auth0provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/lists', this.getListsByBoardId)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
      .delete('/:boardId/lists/:listId', this.deleteListByBoardId)
  }


  async getAll(req, res, next) {
    try {
      //only gets boards by user who is logged in
      let data = await boardsService.getAll(req.userInfo.email)
      return res.send(data)
    }
    catch (err) { next(err) }
  }

  async getById(req, res, next) {
    try {
      let data = await boardsService.getById(req.params.id, req.userInfo.email)
      return res.send(data)
    } catch (error) { next(error) }
  }
  async getListsByBoardId(req, res, next) {
    try {
      let data = await listsService.getListsByBoardId(req.params.id, req.userInfo.email)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await boardsService.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await boardsService.edit(req.params.id, req.userInfo.email, req.body)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async delete(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      await boardsService.delete(req.params.id, req.userInfo.email)
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }

  async deleteListByBoardId(req, res, next) {
    try {
      let data = await listsService.deleteListsByBoardId(req.params.boardId, req.params.listId, req.userInfo.email)
      return res.send(data)
    } catch (error) { next(error) }
  }
}


