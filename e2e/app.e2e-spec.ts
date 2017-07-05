import { InstantSearchGithubPage } from './app.po';

describe('instant-search-github App', () => {
  let page: InstantSearchGithubPage;

  beforeEach(() => {
    page = new InstantSearchGithubPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
