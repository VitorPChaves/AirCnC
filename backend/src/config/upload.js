const multer = require('multer');
const path = require('path');

// exporta um objeto com as informações dos arquivos recebidos da aplicação
module.exports = {
    //informa como o multer vai armazenar os arquivos
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),

        //informe como o nome do arquivo vai ser formado
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname, ext);

            //${Date.now()} garante que os arquivos serão únicos e não serão sobrepostos
            cb(null, `${name}-${Date.now()}${ext}`);
        },
    }),
};

// const multer = require("multer");
// const path = require("path");
// const crypto = require("crypto");
// const aws = require("aws-sdk");
// const multerS3 = require("multer-s3");

// const storageTypes = {
//   local: multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
//     },
//     filename: (req, file, cb) => {
//       crypto.randomBytes(16, (err, hash) => {
//         if (err) cb(err);

//         file.key = `${hash.toString("hex")}-${file.originalname}`;

//         cb(null, file.key);
//       });
//     }
//   }),
// //   s3: multerS3({
// //     s3: new aws.S3(),
// //     bucket: process.env.BUCKET_NAME,
// //     contentType: multerS3.AUTO_CONTENT_TYPE,
// //     acl: "public-read",
// //     key: (req, file, cb) => {
// //       crypto.randomBytes(16, (err, hash) => {
// //         if (err) cb(err);

// //         const fileName = `${hash.toString("hex")}-${file.originalname}`;

// //         cb(null, fileName);
// //       });
// //     }
// //   })
// };

// module.exports = {
//   dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
//   storage: storageTypes[process.env.STORAGE_TYPE],
//   limits: {
//     fileSize: 2 * 1024 * 1024
//   },
//   fileFilter: (req, file, cb) => {
//     const allowedMimes = [
//       "image/jpeg",
//       "image/pjpeg",
//       "image/png",
//       "image/gif"
//     ];

//     if (allowedMimes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error("Invalid file type."));
//     }
//   }
// };
