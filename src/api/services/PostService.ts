import { ModelStatic } from "sequelize";
import Post from "../../database/models/PostModel";
import IdNotFoundError from "../errors/IdNotFoundError";
import IPost from "../interfaces/IPost";
import IServicePost from "../interfaces/IServicePost";
import IService from "../interfaces/IServicePost";

const ID_NOT_FOUND = 'ID post não existe';

export default class PostService implements IServicePost{
  protected model: ModelStatic<Post> = Post;

  async create(dto: IPost): Promise<Post> {
    return await this.model.create({ ...dto });
  }

  async readAll(): Promise<Post[]> {
    return await this.model.findAll();
  }
  
  async readById(id: number): Promise<Post> {
    const post = await this.model.findOne({ where: { id: id } });
    if(!post) throw new IdNotFoundError(ID_NOT_FOUND);
    return post;
  }
  
  async update(id: number, dto: IPost): Promise<Post> {
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