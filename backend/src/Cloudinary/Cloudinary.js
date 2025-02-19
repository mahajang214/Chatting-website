// import { v2 as cloudinary } from 'cloudinary';
const {v2}=require('cloudinary');
const uploadToCloud=async function({image}) {

    // Configuration
    v2.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.API_KEY, 
        api_secret:  process.env.API_SECRET_KEY // Click 'View API Keys' above to copy your API secret
    });
    
    // Upload an image
     const uploadResult = await v2.uploader
       .upload(
           `${image}`, 
        //    {
        //        public_id: 'shoes',
        //    }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log("Cloudinary result : ",uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    // const optimizeUrl = v2.url('shoes', {
    //     fetch_format: 'auto',
    //     quality: 'auto'
    // });
    
    // console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    // const autoCropUrl = v2.url('shoes', {
    //     crop: 'auto',
    //     gravity: 'auto',
    //     width: 500,
    //     height: 500,
    // });
    
    // console.log(autoCropUrl);    
};
module.exports=uploadToCloud;