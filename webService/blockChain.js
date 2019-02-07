const cardano = require("cardano-api");
const randomstring = require("randomstring");

const query = {
page: 1, // Optional
pageSize: 10, // Optional
redeemed: true // Optional
};
let randomString = randomstring.generate({
length: 104
});
const address = randomString;
console.log(randomString);
console.log(address.length);

// address generat of cardano 
cardano
.address({ address })
.then(data => console.log("promise", data))
.catch(err => console.log("err", err));


