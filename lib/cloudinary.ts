import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";

export const cloudinary = new Cloudinary({
    cloud: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME
    }
});

export { AdvancedImage };
