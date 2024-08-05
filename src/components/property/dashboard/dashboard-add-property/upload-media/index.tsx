import React from "react";
import UploadPhotoGallery from "./UploadPhotoGallery";
import VideoOptionFiled from "./VideoOptionFiled";

const UploadMedia = () => {
  return (
    <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
      <h4 className="title fz17 mb30">Upload photos of your property</h4>
      <form className="form-style1">
        <div className="row">
          <div className="col-lg-12">
            <UploadPhotoGallery />
          </div>
        </div>
        {/* End col-12 */}       
      </form>
    </div>
  );
};

export default UploadMedia;

// import React, { useState } from "react";

// interface UploadMediaProps {
//   updateImage: (data: { image: string }) => void;
// }

// const UploadMedia: React.FC<UploadMediaProps> = ({ updateImage }) => {
//   const [image, setImage] = useState<string>("");

//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64Image = reader.result as string;
//         setImage(base64Image);
//         updateImage({ image: base64Image });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
//       <h4 className="title fz17 mb30">Upload photos of your property</h4>
//       <form className="form-style1">
//         <div className="row">
//           <div className="col-lg-12">
//             <input type="file" onChange={handleImageUpload} />
//           </div>
//         </div>
//         {/* End col-12 */}
//       </form>
//     </div>
//   );
// };

// export default UploadMedia;