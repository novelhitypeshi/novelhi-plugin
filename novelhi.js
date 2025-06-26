export default {
  id: 'novelhi',
  name: 'NovelHi',
  site: 'https://novelhi.com',
  language: 'en',
  version: '1.0.0',
  icon: '🌐',

  async popularNovels(page) {
    const url = `https://novelhi.com/popular?page=${page}`;
    const res = await fetch(url);
    const body = await res.text();
    const $ = cheerio.load(body);
    const novels = [];

    $('.book-item').each((_, el) => {
      const name = $(el).find('.book-name').text().trim();
      const cover = $(el).find('img').attr('src');
      const novelUrl = $(el).find('a').attr('href');
      novels.push({ name, cover, url: novelUrl });
    });

    return novels;
  },

  async parseNovelAndChapters(novelUrl) {
    const url = `https://novelhi.com${novelUrl}`;
    const res = await fetch(url);
    const body = await res.text();
    const $ = cheerio.load(body);

    const title = $('h1').text().trim();
    const cover = $('.book-img img').attr('src');
    const author = $('.book-info p').first().text().replace('Author:', '').trim();

    const chapters = [];
    $('.chapter-list a').each((_, el) => {
      chapters.push({
        name: $(el).text().trim(),
        url: $(el).attr('href'),
      });
    });

    return { title, cover, author, chapters };
  },

  async parseChapter(chapterUrl) {
    const url = `https://novelhi.com${chapterUrl}`;
    const res = await fetch(url);
    const body = await res.text();
    const $ = cheerio.load(body);
    return $('.chapter-content').html();
  },

  async searchNovels(searchTerm) {
    const url = `https://novelhi.com/search?keyword=${encodeURIComponent(searchTerm)}`;
    const res = await fetch(url);
    const body = await res.text();
    const $ = cheerio.load(body);
    const novels = [];

    $('.book-item').each((_, el) => {
      const name = $(el).find('.book-name').text().trim();
      const cover = $(el).find('img').attr('src');
      const novelUrl = $(el).find('a').attr('href');
      novels.push({ name, cover, url: novelUrl });
    });

    return novels;
  },
};
