import React, { useState } from "react";
import categoriesIcon from "../../assets/img/loginWallpaper.jpg";

const PreviewImage = (props) => {
    const { file } = props;
    const [preview, setPreview] = useState(categoriesIcon);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        setPreview(reader.result);
         
    }

    return (
        <div>
            <img src={preview} alt="" width="100px" height="100px" />
        </div>
        )
}

export default PreviewImage;