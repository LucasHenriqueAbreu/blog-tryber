import { Model } from "sequelize";
import { expect } from "chai";
import Sinon from "sinon";
import Comment from "../../src/database/models/CommentModel";
import CommentService from "../../src/api/services/CommentService";

describe('Testes de serviço: Read all Comments', function() {
  afterEach(function () {
    Sinon.restore();
  });
  
  it('Caso 1: Deve ler uma lista com 1 Comment', async function () {
    // GIVEN
    const outputMock: Comment[] = [new Comment({
      id: 1,
      content: 'Typescript é massa!',
      postId: 1
    })];

    // WHEN
    Sinon.stub(Model, 'findAll').resolves(outputMock);
    const service = new CommentService();
    const result = await service.readAll();

    // THEN
    expect(result).to.be.equal(outputMock);
    expect(result.length).to.be.equal(1);
  });
});