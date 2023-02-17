import { Model } from "sequelize";
import { expect } from "chai";
import Sinon from "sinon";
import IComment from "../../src/api/interfaces/IComment";
import Comment from "../../src/database/models/CommentModel";
import CommentService from "../../src/api/services/CommentService";
import Post from "../../src/database/models/PostModel";
import PostService from "../../src/api/services/PostService";

describe('Testes de serviço: Create Comment', function() {
  afterEach(function () {
    Sinon.restore();
  });

  it('Caso 1: Deve criar um novo Comment', async function () {
    // GIVEN
    const inputMock: IComment = {
      content: 'Typescript é massa!',
      postId: 1
    }
    const outputMock: Comment = new Comment({
      id: 1,
      content: 'Typescript é massa!',
      postId: 1
    });
    const outputPostMock: Post = new Post({
      id: 1,
      title: 'Typescript na pratica',
      content: 'Typescript é uma boa ferramenta para ajudar no POO',
    });

    // WHEN
    Sinon.stub(Model, 'create').resolves(outputMock);
    Sinon.stub(PostService.prototype, 'readById').resolves(outputPostMock);
    const service = new CommentService();
    const result = await service.create(inputMock);

    // THEN
    expect(result).to.be.equal(outputMock);
  });
});