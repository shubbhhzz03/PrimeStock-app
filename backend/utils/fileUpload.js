const multer = require("multer");


//define file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,  new Date().toISOString().replace(/:/g, "-") + "-" +
       file.originalname) //23/08/2022
    }
  })

  //specify file format that can be saved
  
  function fileFilter (req, file, cb) {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" 
  ) {
cb(null, true)
  } else {
      cb(null, false)
  }
    
  
  }

  const upload = multer({ storage, fileFilter })

  //file size formatter
  const fileSizeFormatter = (bytes, decimal) => {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const dm = decimal || 2;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return (
      parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
    );
  };

  module.exports =  { upload, fileSizeFormatter};