import React, { useState } from 'react';
import { Camera, X, UploadCloud, CheckCircle2 } from 'lucide-react';
import Button from '../common/Button';

interface CameraUploadProps {
  onUploadComplete: (urls: string[]) => void;
}

const CameraUpload = ({ onUploadComplete }: CameraUploadProps) => {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages(prev => [...prev, ...filesArray]);
      
      const newPreviews = filesArray.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const uploadToCloudinary = async () => {
    setIsUploading(true);
    // Mocking Cloudinary upload for now
    await new Promise(resolve => setTimeout(resolve, 2000));
    const mockUrls = previews; // In real implementation, these would be Cloudinary secure_urls
    onUploadComplete(mockUrls);
    setIsUploading(false);
  };

  return (
    <div className="glass p-8 rounded-[2.5rem]">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {previews.map((src, i) => (
          <div key={i} className="relative aspect-square rounded-2xl overflow-hidden group">
            <img src={src} alt="preview" className="w-full h-full object-cover" />
            <button 
              onClick={() => removeImage(i)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        <label className="aspect-square bg-brand-primary/5 border-2 border-dashed border-brand-primary/20 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-brand-primary/10 transition-colors">
          <Camera className="w-10 h-10 text-brand-primary/40 mb-2" />
          <span className="text-xs font-bold text-brand-primary/60 uppercase">Add Photo</span>
          <input type="file" multiple accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>
      </div>

      <Button 
        className="w-full" 
        onClick={uploadToCloudinary} 
        disabled={images.length === 0}
        isLoading={isUploading}
      >
        <UploadCloud className="w-5 h-5 mr-2" /> Upload Portfolio
      </Button>
    </div>
  );
};

export default CameraUpload;
