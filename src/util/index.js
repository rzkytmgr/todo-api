module.exports = {
  keyConverter(data) {
    const camelToSnakeCase = (str) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
    const entries = Object.entries(data);
    const result = {};
    entries.forEach((r) => (result[camelToSnakeCase(r[0])] = r[1]));
    return result;
  },
};
