const AWS = require("aws-sdk");
const uuid = require("uuid/v1");
const requireLogin = require("../middlewares/requireLogin");
const keys = require("../config/keys");

const s3 = new AWS.S3({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey,
  endpoint: "s3-eu-central-1.amazonaws.com",
  signatureVersion: "v4",
  region: "eu-central-1"
});

module.exports = app => {
  app.get("/api/upload", requireLogin, (req, res) => {
    const key = `${req.user.id}/${uuid()}.jpeg`;
    const params = {
      Bucket: "blogster-drex",
      ContentType: "image/jpeg",
      Key: key
    };

    s3.getSignedUrl("putObject", params, (err, url) => {
      res.send({
        key,
        url
      });
    });
  });
};
