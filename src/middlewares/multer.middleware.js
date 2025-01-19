import multer from "multer";

const storage = multer.diskStorage({
    console.log("1")
    destination: function (req, file, cb) {
      cb(null, './public/temp')
    console.log("2")
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)

    }
  })
  
  export const upload = multer(
    { 
        storage , 
    }
);
