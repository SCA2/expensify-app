const book = {
  title: 'Ego is the Enemy',
  // author: 'Ryan Holliday',
  publisher: {
    // name: 'Penguin'
  }
};

const { title, author = 'Anonymous' } = book;
const { name: publisherName = 'Self-Published' } = book.publisher;

console.log(`${title} by ${author}, published by ${publisherName}`);

const items = ['coffee', '$2.00', '$2.50', '$2.75'];
const [item, , price] = items;
const [...last] = items;
console.log(`A medium ${item} costs ${price}`);
console.log(last);