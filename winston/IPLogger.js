const requestIp = require("request-ip");
const iplocation = require("iplocation").default;
var NodeGeocoder = require("node-geocoder");
var HttpsAdapter = require("node-geocoder/lib/httpadapter/httpsadapter.js");
const httpAdapter = new HttpsAdapter(null, {
  headers: {
    "user-agent": "My application <akshshakya2019@gmail.com>",
    "X-Specific-Header": "Specific value"
  }
});
var geocoder = NodeGeocoder({
  provider: "google",
  httpAdapter: httpAdapter,
  apiKey:
    "AIzaSyCb6Lkwb3OqScpTnzw5alW8LJWTbx_X7Qo" /********** AIzaSyALzGJ6fdA3UZ0jCFpUJ2dIoQNmQ31etJU */,
  formatter: null
});
const IPLogger = function(req, res, next) {
  // req.body.userInformation={lat:'33.012',long:'70.235',country:'Delhi',city:'delhi'}
  // next()
  const clientIp = requestIp.getClientIp(req);
  const ipAddress = clientIp.split(":").slice(-1);
  var iplog = ipAddress[0];
  iplocation(iplog, [], function(err, result) {
    if (err) {
      res.send("Provider Failed");
    } else {
      let latitute = {
        lat: result.latitude,
        lon: result.longitude
      };
      geocoder
        .reverse(latitute)
        .then(function(result) {
          req.body.userInformation = result;
          console.log("Successfully get location", JSON.stringify(result));
          next();
        })
        .catch(function(err) {
          console.log("this is the catch part ", err);
        });
    }
  });
};

module.exports = { IPLogger };
