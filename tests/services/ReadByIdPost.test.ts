import { Model } from "sequelize";
import { expect } from "chai";
import Sinon from "sinon";
import PostService from "../../src/api/services/PostService";
import Post from "../../src/database/models/PostModel";

describe('Testes de serviço: Read Post by Id', function() {
  afterEach(function () {
    Sinon.restore();
  });
  
  it('Caso 1: Deve ler 1 Post caso Id for valido', async function () {
    // GIVEN
    const inputMock: number = 1;
    const outputMock: Post = new Post({
      id: 1,
      title: 'Typescript na pratica',
      content: 'Typescript é uma boa ferramenta para ajudar no POO',
    });

    // WHEN
    Sinon.stub(Model, 'findOne').resolves(outputMock);
    const service = new PostService();
    const result = await service.readById(inputMock);

    // THEN
    expect(result).to.be.equal(outputMock);
  });

  it('Caso 2: Deve ler "ID não existe" quando Id não existir', async function () {
    // GIVEN
    const ID_NOT_FOUND = 'ID não existe'
    const inputMock: number = 1000;

    try {
      // WHEN
      Sinon.stub(Model, 'findOne').resolves(null);
      const service = new PostService();
      await service.readById(inputMock);
    } catch (error) {
      // THEN
      expect((error as Error).message).to.be.equal(ID_NOT_FOUND);
    }
  });
});