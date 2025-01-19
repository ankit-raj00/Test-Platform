import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload file to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
    if (!localFilePath) {
        console.error("No file path provided for upload.");
        return null;
    }

    try {
        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto", // Automatically detect file type
        });

        console.log("File uploaded successfully to Cloudinary:", response.url);

        // Remove the locally saved temporary file
        fs.unlinkSync(localFilePath);

        return response;
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);

        // Attempt to remove the temporary file even if upload fails
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return null;
    }
};

// Delete file from Cloudinary
const deleteFromCloudinary = async (fileUrl) => {
    if (!fileUrl) {
        console.error("No file URL provided for deletion.");
        return null;
    }

    try {
        // Extract public ID and determine resource type from the URL
        const urlParts = fileUrl.split("/");
        const fileName = urlParts[urlParts.length - 1];
        const publicId = fileName.split(".")[0];

        const isVideo = fileUrl.includes("/video/");
        const resourceType = isVideo ? "video" : "image";

        // Delete the file from Cloudinary
        const response = await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType,
        });

        console.log("File deleted successfully from Cloudinary:", response);

        return response;
    } catch (error) {
        console.error("Error deleting file from Cloudinary:", error);
        return null;
    }
};

// Export the functions
export { uploadOnCloudinary, deleteFromCloudinary };
