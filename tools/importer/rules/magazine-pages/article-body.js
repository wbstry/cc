/* global WebImporter */
export default function articleBody(main, document) {
  const bottomOfThePage = document.querySelector('.section3D.quiet');
  if (!bottomOfThePage) return;
  
  // create the share block
  const shareBlockCells = [
    ['Share'],
    [''],
  ];
  const shareBlock = WebImporter.DOMUtils.createTable(shareBlockCells, document);
  bottomOfThePage.before(shareBlock);
  // create the section metadata block
  const sectionMetadataBlockCells = [
    ['Section Metadata'],
    ['style', 'grid width 8, M spacing'],
  ];
  const sectionMetadataBlock = WebImporter.DOMUtils.createTable(sectionMetadataBlockCells, document);
  bottomOfThePage.before(sectionMetadataBlock);

  // create the aside inline blocks
  document.querySelectorAll('.main__article .has-background.has-very-light-gray-background-color').forEach((asideInline) => {
    if (asideInline.textContent.length > 400 || asideInline.querySelector('a') || asideInline.querySelector('p + p') || asideInline.querySelector('br')) return;
    const div = document.createElement('div');
    div.innerHTML = asideInline.innerHTML;
    const asideInlineCells = [
      ['Aside (Inline)'],
      ['#f5f5f5'],
      [[document.body.querySelector('img').cloneNode()], [div]],
    ];
    const asideInlineBlock = WebImporter.DOMUtils.createTable(asideInlineCells, document);
    asideInline.replaceWith(asideInlineBlock);
  });

  // create the author bio blocks
  document.querySelectorAll('.exergue--img').forEach((authorBio) => {
    if (!authorBio.querySelector('img')) authorBio.insertAdjacentHTML('afterbegin', ' ‏‏　 ');
    const authorBioCells = [
      ['Icon Block (bio, small)'],
      [authorBio.innerHTML],
    ];
    const authorBioBlock = WebImporter.DOMUtils.createTable(authorBioCells, document);
    authorBio.replaceWith(authorBioBlock);
    // wrap the author bio block in a section
    const sectionMetadataBlockCells = [
      ['Section Metadata'],
      ['style', 'grid width 8, L spacing'],
    ];
    const sectionMetadataBlock = WebImporter.DOMUtils.createTable(sectionMetadataBlockCells, document);
    authorBioBlock.after(document.createElement('hr'));
    authorBioBlock.after(sectionMetadataBlock);
    const hr = document.createElement('hr');
    authorBioBlock.before(hr);
    hr.before(sectionMetadataBlock.cloneNode(true));
  });

  // create the quote blocks
  document.querySelectorAll('.wp-block-quote').forEach((quote) => {
    const quoteCells = [
      ['Quote (contained)'],
      [quote.innerHTML],
    ];
    const quoteBlock = WebImporter.DOMUtils.createTable(quoteCells, document);
    quote.replaceWith(quoteBlock);
    // wrap the quote block in a section
    quoteBlock.after(document.createElement('hr'));
    quoteBlock.after(sectionMetadataBlock.cloneNode(true));
    const quoteHR = document.createElement('hr');
    quoteBlock.before(quoteHR);
    quoteHR.before(sectionMetadataBlock.cloneNode(true));
  });

  // fix the tables
  document.querySelectorAll('table').forEach((table) => {
    table.querySelector('thead')?.insertAdjacentHTML('afterbegin', '<tr><th>Columns (table)</th></tr>');
  });
}