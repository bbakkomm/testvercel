import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'client/public/uploads');
  },
  filename: (req, file, cb) => {
    const newFileName = file.originalname;
    cb(null, newFileName);
    // const ext = path.extname(file.originalname);
    // cb(null, path.basename(file.originalname, ext) + '-' + Date.now() + ext);
  }
});
const upload = multer({ storage });

export default upload;