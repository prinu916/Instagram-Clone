const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

// =======================
// CLOUDINARY STORAGE
// =======================
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "instagram-clone",
        allowed_formats: ["jpg", "png", "jpeg", "gif"]
    }
});

// =======================
// AVATAR UPLOAD
// =======================
exports.uploadAvatar = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

// =======================
// POST UPLOAD
// =======================
exports.uploadPost = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

// =======================
// DELETE FILE
// =======================
exports.deleteFile = async (file) => {
    try {
        const publicId = file.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};