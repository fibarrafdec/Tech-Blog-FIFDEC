module.exports = {
  //formats dates as MM/DD/YYYY
  format_date: (date) => {
      return date.toLocaleDateString();
  },
  // returns a substring of the blog text that is the first sentence of the blog
  first_sentence: (text) => {
      const index = text.indexOf('.');
      return text.substring(0, index+1);
  }
};
