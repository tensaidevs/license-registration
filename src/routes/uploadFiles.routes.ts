// import { deleteFile, deleteAvatar } from "@/controllers/upload/delete";
// import { uploadFile } from "@/controllers/upload/file";
// import { uploadCustomerIdentificationImages } from "@/controllers/upload/image";
// import Router from "express";
// import { upload } from "@/middlewares/multer.middleware";
// import { validateUserToken } from "@/middlewares/validateUserToken.middleware";

// const router = Router();

// router.route("/uploadFile").post(upload.single("file"), validateUserToken, uploadFile);
// router.route("/uploadImage").post(upload.single("image"), validateUserToken, uploadFile);
// router.route("/uploadCustomerIdentificationImage").post(upload.single("image"), validateUserToken, uploadCustomerIdentificationImages);

// router.route("/deleteFile/:fileId").patch(validateUserToken, deleteFile);
// router.route("/deleteAvatar/:fileId").patch(validateUserToken, deleteAvatar);

// export default router;
