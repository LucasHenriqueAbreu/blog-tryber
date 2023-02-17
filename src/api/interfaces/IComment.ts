/**
 * @author Gustavo Boaz
 * @description Interface de representação de IComment
 */
 export default interface IComment {
  id?: number;
  content: string;
  postId: number;
}