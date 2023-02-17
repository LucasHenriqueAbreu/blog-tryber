import { Model } from "sequelize";
import { expect } from "chai";
import Sinon from "sinon";
import Comment from "../../src/database/models/CommentModel";
import CommentService from "../../src/api/services/CommentService";

describe('Testes de serviço: Update Comment', function() {
  afterEach(function () {
    Sinon.restore();
  });
  
  it('Caso 1: Deve atualizar Comment caso Id for valido', async function () {
    // GIVEN
    const inputMock: number = 1;
    const inputOutputMock: Comment = new Comment({
      id: 1,
      content: 'Typescript é massa! ATUALIZADO',
      postId: 1
    });

    // WHEN
    Sinon.stub(Model, 'update').resolves();
    Sinon.stub(Model, 'findOne').resolves(inputOutputMock);
    const service = new CommentService();
    const result = await service.update(inputMock, inputOutputMock);

    // THEN
    expect(result).to.be.equal(inputOutputMock);
  });

  it('Caso 2: Deve ler "ID comentario não existe" quando Id não existir', async function () {
    // GIVEN
    const ID_NOT_FOUND = 'ID comentario não existe'
    const inputMock: number = 1000;

    const inputOutputMock: Comment = new Comment({
      id: 1,
      content: 'Typescript é massa! ATUALIZADO',
      postId: 1
    });

    try {
      // WHEN
      Sinon.stub(Model, 'findOne').resolves(null);
      const service = new CommentService();
      await service.update(inputMock, inputOutputMock);
    } catch (error) {
      // THEN
      expect((error as Error).message).to.be.equal(ID_NOT_FOUND);
    }
  });
});