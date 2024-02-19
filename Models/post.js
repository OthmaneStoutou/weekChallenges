const fs = require('fs');

const getAllPosts = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, (err, data) => {
            if (err) {
                reject({ error: "There was an error reading the file." });
            } else {
                let Data = JSON.parse(data)
                resolve(Data);
            }
        });
    });
};

const createPosts = (filename, posts) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, posts, (err) => {
            if (err) {
                reject({ error: "There was an error writing to the file." });
            } else {
                resolve("The content was written successfully!");
            }
        });
    });
};

// getAllPosts('data.json')
// .then(data => console.log(data))
// .catch(error => console.log(error))
module.exports = { getAllPosts, createPosts };
