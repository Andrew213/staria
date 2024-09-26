'use client';

import type { FC, MouseEvent, SVGProps } from 'react';
import { useEffect, useRef, useState } from 'react';

import { CloseIcon, FileCsvIcon, FileDocIcon, FileEmptyIcon, FileTxtIcon, UploadCloud02 } from '@/assets/icons';
import type { Extension } from '@/types';

interface FileData {
  preview?: string;
  originalFile: File;
  Icon?: FC<SVGProps<SVGElement>>;
}

const getBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

interface Props {
  extensions: Extension[];
  maxWidth?: number;
  maxHeight?: number;
  maxSizeInMB?: number;
  onChange?: (a: File | string) => void;
  isDirty?: boolean;
  fileFromOutside?: {
    preview?: string;
    name: string;
    size: number;
    field: 'logoUrl' | 'iconUrl';
  };
}

const formatFileSize = (sizeInMB: number) => {
  const sizeInGB = sizeInMB / 1000;

  if (sizeInGB >= 1) {
    return ` (max. ${sizeInGB.toFixed(2)} G)`;
  }

  return ` (max. ${sizeInMB} MB)`;
};

export function UploadInput({
  extensions,
  maxHeight,
  fileFromOutside,
  maxWidth,
  onChange,
  isDirty,
  maxSizeInMB,
}: Props) {
  const [file, setFile] = useState<FileData>();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (fileFromOutside) {
      const file = new File([new ArrayBuffer(fileFromOutside.size)], fileFromOutside.name);
      setFile({
        preview: fileFromOutside.preview,
        originalFile: file,
      });
    }
  }, [fileFromOutside]);

  useEffect(() => {
    if (!fileFromOutside) {
      if (onChange && !isDirty) {
        setFile(undefined);
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      }
    }
  }, [isDirty, onChange, fileFromOutside]);

  const [error, setError] = useState('');

  const handleFileUpload = async (currentFile: File) => {
    const ext = currentFile.name?.split('.').at(-1);

    if (!extensions.includes(ext?.toUpperCase() as unknown as Extension)) {
      onChange?.('');
      setFile(undefined);
      setError('incorrect extension');
      return;
    }
    if (maxSizeInMB && currentFile.size > maxSizeInMB * 1024 * 1024) {
      onChange?.('');
      setFile(undefined);
      setError('');
      return;
    }
    const preview = (await getBase64(currentFile)) as string;

    const imageInstance = new Image();
    imageInstance.src = preview;
    if (maxWidth && maxHeight) {
      imageInstance.onload = () => {
        const { width, height } = imageInstance;
        if (width > maxWidth || height > maxHeight) {
          onChange?.('');
          setFile(undefined);
          setError('Wrong properties');
          return;
        }
      };
    }

    imageInstance.onerror = () => {
      let Icon = FileEmptyIcon;
      switch (ext) {
        case 'csv':
          Icon = FileCsvIcon;
          break;
        case 'txt':
          Icon = FileTxtIcon;
          break;
        case 'doc':
          Icon = FileDocIcon;
          break;
      }
      if (onChange) {
        const fmData = new FormData();
        fmData.append('file', currentFile);
        onChange(currentFile);
      }

      setFile({ Icon, originalFile: currentFile });
      return;
    };
    if (onChange) {
      const fmData = new FormData();
      fmData.append('file', currentFile);
      onChange(currentFile);
    }
    setFile({ preview, originalFile: currentFile });
  };

  const handleButtonClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!inputRef?.current) return;
    inputRef.current.click();
  };

  const handleClearButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    onChange?.('');
    setFile(undefined);
  };

  return (
    <>
      <div
        className="w-full cursor-pointer rounded-3 border px-6 py-4 dark:border-primary-500 dark:bg-downriver"
        onClick={handleButtonClick}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDragEnd={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.items) {
            Array.from(e.dataTransfer.items).forEach((item) => {
              if (item.kind === 'file') {
                const currentFile = item.getAsFile();
                if (currentFile) {
                  void handleFileUpload(currentFile);
                }
              }
            });
          }
        }}
      >
        {!file?.originalFile ? (
          <div className="flex flex-col items-center text-sm text-gray-blue-100">
            <span className="mb-3 rounded-2 border border-gray-blue-500 p-2.5">
              <UploadCloud02 className="size-5" />
            </span>
            <div>
              <span className="text-primary-500">Click to upload</span>{' '}
              <span className="font-rubik">or drag and drop </span>
            </div>
            <span className="font-rubik text-xs">
              {extensions.map((el, index) => {
                const isLast = extensions.length > 1 && index === extensions.length - 1;
                const isPrev = index === extensions.length - 2;
                if (isPrev) {
                  return `${el} `;
                }
                return isLast ? ` or ${el}` : `${el} , `;
              })}
              {maxSizeInMB && formatFileSize(maxSizeInMB)}
              {maxHeight && maxWidth && ` (max. ${maxWidth}x${maxHeight})`}
            </span>
            {error && <h1>{error}</h1>}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            {file.preview && (
              <img alt="" className="max-h-20.5 w-auto max-w-20.5 object-fill" src={`${file.preview}`} />
            )}
            {file.Icon && <file.Icon className="size-10" />}
            <div>
              <div className="text-sm font-medium">{`${file.originalFile.name}`}</div>
              <div className="font-rubik text-sm text-gray-blue-100">
                {Math.floor(file.originalFile.size / 1024) > 0
                  ? `${Math.round(file.originalFile.size / 1000)} KB`
                  : `${Math.round(file.originalFile.size)} B`}
              </div>
            </div>
            <button className="ml-auto" onClick={handleClearButton}>
              <CloseIcon className="size-6 text-gray-blue-50" />
            </button>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        hidden
        accept={extensions.map((el) => `.${el.toLowerCase()}`).join(', ')}
        onChange={(e) => {
          const files = e.target.files;
          if (!files?.length) return;
          void handleFileUpload(files[0]);
        }}
      />
    </>
  );
}
