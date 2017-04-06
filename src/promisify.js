const promisify = (task) => (
  (...args) => new Promise((resolve, reject) => {
    task(...args, (err, ...result) => {
      if (err) {
        reject(err);
      } else {
        resolve(...result);
      }
    });
  })
);

module.exports = promisify;
