import Post from "../../database/models/PostModel";
import IPost from "./IPost";

/**
 * @author Gustavo Boaz
 * @description Interface para implementar serviços CRUD de Post
 */
export default interface IServicePost {
  create(dto: IPost): Promise<Post>;
  readAll(): Promise<Post[]>;
  readById(id: number): Promise<Post>;
  update(id: number, dto: IPost): Promise<Post>;
  delete(id: number): Promise<void>;
}