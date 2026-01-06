import { UppercaseRecipePipe } from './uppercase-recipe.pipe';

describe('UppercaseRecipePipe', () => {
  it('create an instance', () => {
    const pipe = new UppercaseRecipePipe();
    expect(pipe).toBeTruthy();
  });
});
