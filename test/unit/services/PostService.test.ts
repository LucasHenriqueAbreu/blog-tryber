import PostService from "../../../src/services/PostService";

describe('PostService', () => {
  it('Deve ser possível criar uma instância de PostService', () => {
    const postService = new PostService();
    expect(postService).toBeInstanceOf(PostService);
  })
});