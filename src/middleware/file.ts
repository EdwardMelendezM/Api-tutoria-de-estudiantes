import multer, { diskStorage } from "multer";
import { RequestExt } from "../interfaces/requestExtend.interface";

const PATH_STORAGE = `${process.cwd()}/storage/users`;

const storage = diskStorage({
  destination(req: RequestExt, file: Express.Multer.File, cb: any) {
    cb(null, PATH_STORAGE);
  },
  filename(req: RequestExt, file: Express.Multer.File, cb: any) {
    const ext = file.originalname.split(".").pop();
    const fileNameRandom = `image-${Date.now()}.${ext}`;
    cb(null, fileNameRandom);
  },
});

const multerMiddleware = multer({ storage });

export default multerMiddleware;
