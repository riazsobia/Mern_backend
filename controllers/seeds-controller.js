const faker = require("faker");
const Listing = require("../models/Listing");

const index = async (req, res) => {
  try {
    console.log("seeding");
    await Listing.deleteMany();
    let count = 0;
    const data = [];
    let product;
    while (count < 50) {
      product = {
        title: faker.fake("{{commerce.product}}"),
        price: faker.fake("{{commerce.price}}"),
        description: faker.fake("{{commerce.productMaterial}}")
      };
      data.push(product);
      count += 1;
    }
    await Listing.insertMany(data);
    console.log("finished seeding");
    res.end();
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  index
};
