import Comment from "../../database/models/CommentModel";
import IComment from "./IComment";

/**
 * @author Gustavo Boaz
 * @description Interface para implementar serviços CRUD de Comment
 */
 export default interface IServiceComment {
  create(dto: IComment): Promise<Comment>;
  readAll(): Promise<Comment[]>;
  readById(id: number): Promise<Comment>;
  update(id: number, dto: IComment): Promise<Comment>;
  delete(id: number): Promise<void>;
}