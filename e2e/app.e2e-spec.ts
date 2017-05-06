import { DentalWebsiteAngularPage } from './app.po';

describe('dental-website-angular App', () => {
  let page: DentalWebsiteAngularPage;

  beforeEach(() => {
    page = new DentalWebsiteAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
