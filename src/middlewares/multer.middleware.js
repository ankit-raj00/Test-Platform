import multer from "multer";
import os from "os";
import path from "path";

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Use the system's temporary directory for file uploads
        const tempDir = os.tmpdir();
        cb(null, tempDir);
    },
    filename: function (req, file, cb) {
        // Save the file with a unique name
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const extension = path.extname(file.originalname); // Extract file extension
        const baseName = path.basename(file.originalname, extension); // Remove extension
        cb(null, `${baseName}-${uniqueSuffix}${extension}`);
    },
});

// Multer instance
export const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
    },
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "application/pdf"];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Unsupported file type"), false);
        }
    },
});
