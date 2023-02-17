import { 
  INTEGER,
  Model,
  STRING
} from 'sequelize';
import db from '.';
import Post from './PostModel';

class Comment extends Model {
  declare readonly id: number;
  declare content: string;
  declare postId: number;
}

Comment.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  content: {
    allowNull: false,
    type: STRING,
  },
  postId: {
    allowNull: false,
    field: 'post_id',
    type: INTEGER,
  },
}, {
  sequelize: db,
  underscored: true,
  modelName: 'comments',
  timestamps: false
});

Comment.belongsTo(Post, { foreignKey: 'post_id', as: 'id_post' });
Post.hasMany(Comment, { foreignKey: 'post_id', as: 'id_post' });

export default Comment;