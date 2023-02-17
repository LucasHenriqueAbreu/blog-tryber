import { Model } from "sequelize";
import { expect } from "chai";
import Sinon from "sinon";
import PostService from "../../src/api/services/PostService";
import Post from "../../src/database/models/PostModel";

describe('Testes de serviço: Update Post', function() {
  afterEach(function () {
    Sinon.restore();
  });
  
  it('Caso 1: Deve atualizar Post caso Id for valido', async function () {
    // GIVEN
    const inputMock: number = 1;
    const inputOutputMock: Post = new Post({
      id: 1,
      title: 'Typescript na pratica ATUALIZADO',
      content: 'Typescript é uma boa ferramenta para ajudar no POO',
    });

    // WHEN
    Sinon.stub(Model, 'update').resolves();
    Sinon.stub(Model, 'findOne').resolves(inputOutputMock);
    const service = new PostService();
    const result = await service.update(inputMock, inputOutputMock);

    // THEN
    expect(result).to.be.equal(inputOutputMock);
  });

  it('Caso 2: Deve ler "ID post não existe" quando Id não existir', async function () {
    // GIVEN
    const ID_NOT_FOUND = 'ID post não existe'
    const inputMock: number = 1000;

    const inputOutputMock: Post = new Post({
      id: 1,
      title: 'Typescript na pratica ATUALIZADO',
      content: 'Typescript é uma boa ferramenta para ajudar no POO',
    });

    try {
      // WHEN
      Sinon.stub(Model, 'findOne').resolves(null);
      const service = new PostService();
      await service.update(inputMock, inputOutputMock);
    } catch (error) {
      // THEN
      expect((error as Error).message).to.be.equal(ID_NOT_FOUND);
    }
  });
});