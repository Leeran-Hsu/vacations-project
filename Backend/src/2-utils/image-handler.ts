import { UploadedFile } from "express-fileupload";
import path from "path";
import { v4 as uuid } from "uuid";
import fsPromises from "fs/promises";

// Save an image and return the generated filename
async function saveImage(image: UploadedFile): Promise<string> {
    if(!image) return "no-vacation-image.png";
    const imageExtension = image.name.substring(image.name.lastIndexOf("."));
    const newImageName = uuid() + imageExtension;
    const absolutePath = path.join(__dirname, "../1-assets/images/vacation-images", newImageName);
    await image.mv(absolutePath);
    return newImageName;
}

// Update an image by deleting the old one and saving the new one
async function updateImage(image: UploadedFile, oldImage: string): Promise<string> {
    await deleteImage(oldImage);
    const fileName = await saveImage(image);
    return fileName;
}

// Delete an image
async function deleteImage(oldImage: string): Promise<void> {
    try{
        if(!oldImage) return;
        const absolutePath = path.join(__dirname, "..", "1-assets", "images", "vacation-images", oldImage);
        await fsPromises.rm(absolutePath);
    }
    catch(err: any) {
        console.log(err.message);
    }
}

// Export functions for external use
export default {
    saveImage,
    updateImage,
    deleteImage
};
