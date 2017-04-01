import { CymbelineWebPage } from './app.po';

describe('cymbeline-web App', () => {
  let page: CymbelineWebPage;

  beforeEach(() => {
    page = new CymbelineWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
