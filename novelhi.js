export default {
  id: 'novelhi',
  name: 'NovelHi',
  site: 'https://novelhi.com',
  language: 'en',
  version: '1.0.0',
  icon: '🌐',

  async parseNovelAndChapters(novelUrl) {
    const url = `https://novelhi.com${novelUrl}`;
    const body = await fetch(url).then(res => res.text());
    const $ = cheerio.load(body);

    const title = $('h1').text().trim();
    const cover = $('img').first().attr('src');
    const chapters = [];

    $('.chapter-list a').each((i, el) => {
      chapters.push({
        name: $(el).text().trim(),
        url: $(el).attr('href'),
      });
    });

    return {
      title,
      cover,
      chapters,
    };
  },

  async parseChapter(chapterUrl) {
    const url = `https://novelhi.com${chapterUrl}`;
    const body = await fetch(url).then(res => res.text());
    const $ = cheerio.load(body);
    return $('.chapter-content').html();
  },
};
