'use client';

import axios from 'axios';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { ImagePlus, Trash } from 'lucide-react';
import { FC, useCallback, useState } from 'react';
import { Skeleton } from './ui/skeleton';
import { Button } from './ui/button';

interface ImageUploadSingleProps {
    value: string;
    loading?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
}

export const ImageUploadSingle: FC<ImageUploadSingleProps> = ({
    value,
    loading,
    onChange,
    onRemove,
}) => {
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = useCallback(
        async (files: File[]) => {
            try {
                setIsUploading(true);

                const formData = new FormData();
                formData.append('file', files[0]);
                formData.append('upload_preset', 'kdvpxn15');

                const response = await axios.post(
                    'https://api.cloudinary.com/v1_1/di1knfmpc/image/upload',
                    formData,
                );

                const imageUrl = response.data.secure_url;
                onChange(imageUrl);
            } catch (error) {
                console.error('Error uploading image:', error);
            } finally {
                setTimeout(() => {
                    setIsUploading(false);
                }, 500);
            }
        },
        [onChange],
    );

    const { getRootProps } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': [],
        },
        multiple: false,
        onDrop: handleUpload,
    });

    return (
        <>
            <div className='mb-4 flex items-center gap-4'>
                {value && (
                    <div className='relative w-[200px] h-[200px] rounded-md overflow-hidden'>
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
                                    src={value}
                                />
                                <div className='z-10 absolute top-2 right-2'>
                                    <Button
                                        type='button'
                                        onClick={() => onRemove(value)}
                                        variant='destructive'
                                        size='sm'
                                    >
                                        <Trash className='h-4 w-4' />
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
            <div {...getRootProps({})}>
                <Button type='button' disabled={loading} variant='secondary'>
                    <ImagePlus className='h-4 w-4 mr-2' />
                    Tải hình ảnh
                </Button>
            </div>
        </>
    );
};
