import { read } from 'fs';
import React, { useState } from 'react';

interface PreviewProps {
    file?: Blob;
}

const PreviewImage: React.FC<PreviewProps> = ({ file }) => {
    const [preview, SetPreview] = useState<string | null>(null);

    const reader = new FileReader();
    reader.readAsDataURL(file!);
    reader.onload = () => {
        SetPreview(reader.result);
    };
    return (
        <img src={preview} alt='preview'></img>
    )
}
export default PreviewImage;