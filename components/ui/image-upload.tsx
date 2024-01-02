'use client';
import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ImagePlus, Trash } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { Skeleton } from './skeleton';

interface ImageUploadProps {
    value: string[];
    disabled?: boolean;
    onChange: (value: string[]) => void;
    onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    value,
    disabled,
    onChange,
    onRemove,
}) => {
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = useCallback(
        async (files: File[]) => {
            try {
                setIsUploading(true);

                const formDataArray = files.map((file) => {
                    const formData = new FormData();

                    formData.append('file', file);
                    formData.append('upload_preset', 'kdvpxn15');

                    return formData;
                });

                const uploadPromises = formDataArray.map((formData) =>
                    axios.post(
                        'https://api.cloudinary.com/v1_1/di1knfmpc/image/upload',
                        formData,
                    ),
                );

                const responses = await Promise.all(uploadPromises);
                const newImageUrls = responses.map(
                    (response) => response.data.secure_url,
                );

                onChange([...value, ...newImageUrls]);
            } catch (error) {
                console.error('Error uploading image:', error);
            } finally {
                setTimeout(() => {
                    setIsUploading(false);
                }, 3000);
            }
        },
        [onChange, value],
    );

    const { getRootProps } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': [],
        },
        maxFiles: 3,
        multiple: true,
        onDrop: handleUpload,
    });

    return (
        <div>
            <div className='mb-4 flex items-center gap-4'>
                {value.map((url) => (
                    <div
                        key={url}
                        className='relative w-[200px] h-[200px] rounded-md overflow-hidden'
                    >
                        {isUploading ? (
                            <Skeleton className='h-[200px] w-[200px] bg-slate-200' />
                        ) : (
                            <>
                                <Image
                                    fill
                                    priority
                                    sizes='20vw'
                                    className='object-cover'
                                    alt='Image'
                                    src={url}
                                />
                                <div className='z-10 absolute top-2 right-2'>
                                    <Button
                                        type='button'
                                        onClick={() => onRemove(url)}
                                        variant='destructive'
                                        size='sm'
                                    >
                                        <Trash className='h-4 w-4' />
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
            <div {...getRootProps({})}>
                <Button type='button' disabled={disabled} variant='secondary'>
                    <ImagePlus className='h-4 w-4 mr-2' />
                    Tải hình ảnh
                </Button>
            </div>
        </div>
    );
};

export default ImageUpload;
