import { ModelStatic } from "sequelize";
import Comment from "../../database/models/CommentModel";
import Post from "../../database/models/PostModel";
import IdNotFoundError from "../errors/IdNotFoundError";
import IComment from "../interfaces/IComment";
import IServiceComment from "../interfaces/IServiceComment";
import PostService from "./PostService";

const ID_NOT_FOUND = 'ID comentario não existe';

export default class CommentService implements IServiceComment {
  protected model: ModelStatic<Comment> = Comment;
  protected postService: PostService;

  constructor(){
    this.postService = new PostService();
  }

  async create(dto: IComment): Promise<Comment> {
    await this.postService.readById(dto.postId);
    return await this.model.create({ ...dto });
  }

  async readAll(): Promise<Comment[]> {
    return await this.model.findAll({ include: Post });
  }

  async readById(id: number): Promise<Comment> {
    const comment = await this.model.findOne({ where: { id: id }, include: Post });
    if(!comment) throw new IdNotFoundError(ID_NOT_FOUND);
    return comment;
  }

  async update(id: number, dto: IComment): Promise<Comment> {
    await this.readById(id);
    await this.model.update({
      ...dto
    }, {
      where: { id: id }
    });
    return await this.readById(id);
  }

  async delete(id: number): Promise<void> {
    await this.readById(id);
    await this.model.destroy({
      where: { id: id }
    });
  }
}