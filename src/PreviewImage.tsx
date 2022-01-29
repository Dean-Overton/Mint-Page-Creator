import { read } from 'fs';
import React, { useState } from 'react';
import { fileURLToPath } from 'url';

interface PreviewProps {
    file?: Blob;
}

const PreviewImage: React.FC<PreviewProps> = ({ file }) => {
    const [preview, SetPreview] = useState<string | ArrayBuffer |null>(null);
    const [imgState, setImgState] = useState({
        //path: fileURLToPath(file)
    });

    const reader = new FileReader();
    reader.readAsDataURL(file!);
    reader.onload = () => {
        SetPreview(reader.result);
    };
    return (
        <></>//<img src={imgState.path} alt='preview'></img>
    )
}
export default PreviewImage;