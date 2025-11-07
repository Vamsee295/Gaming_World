import React, { useMemo, useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/components/ui/use-toast";

interface ChangePhotoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ChangePhotoDialog: React.FC<ChangePhotoDialogProps> = ({ open, onOpenChange }) => {
  const { user, updateAvatar, removeAvatar } = useUser();
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [previewActive, setPreviewActive] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewImgRef = useRef<HTMLImageElement>(null);
  const currentPhotoRef = useRef<HTMLDivElement>(null);

  const current = useMemo(() => user?.avatarUrl ?? null, [user]);

  // Default profile SVG
  const defaultProfileSvg = (
    <svg className="w-2/3 h-2/3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
    </svg>
  );

  const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
    toast({
      title: message,
      variant: type === 'error' ? 'destructive' : 'default',
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    
    if (!files || files.length === 0) {
      setFile(null);
      setPreview(null);
      setPreviewActive(false);
      return;
    }

    const selectedFile = files[0];
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    if (selectedFile.size > maxFileSize) {
      showNotification("File is too large! Max size is 5MB.", 'error');
      if (fileInputRef.current) fileInputRef.current.value = '';
      setFile(null);
      setPreview(null);
      setPreviewActive(false);
      return;
    }

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (result) {
        setPreview(String(result));
        setPreviewActive(true);
      }
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSave = async () => {
    if (!file) {
      showNotification("Please select a new photo first!", 'error');
      return;
    }

    setIsSaving(true);
    try {
      await updateAvatar(file);
      
      // Reset state
      setFile(null);
      setPreview(null);
      setPreviewActive(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
      
      showNotification("Profile photo updated successfully!", 'success');
      
      // Close dialog after a short delay
      setTimeout(() => {
        onOpenChange(false);
        setIsSaving(false);
      }, 1500);
    } catch (error) {
      showNotification("Failed to update profile photo.", 'error');
      setIsSaving(false);
    }
  };

  const handleDelete = () => {
    removeAvatar();
    setFile(null);
    setPreview(null);
    setPreviewActive(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    
    showNotification("Profile photo deleted. Default image restored.", 'success');
    
    setTimeout(() => {
      onOpenChange(false);
    }, 1500);
  };

  const handleCancel = () => {
    setFile(null);
    setPreview(null);
    setPreviewActive(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    
    showNotification("Photo change cancelled. Returning to profile...", 'info');
    
    setTimeout(() => {
      onOpenChange(false);
    }, 1500);
  };

  // Reset state when dialog closes
  useEffect(() => {
    if (!open) {
      setFile(null);
      setPreview(null);
      setPreviewActive(false);
      setIsSaving(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl p-8">
        <DialogHeader>
          <DialogTitle className="text-4xl font-extrabold mb-8 text-center border-b border-border pb-4">
            Change Profile Photo
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 pb-8">
          {/* LEFT SIDE: Photo Display & Preview Area */}
          <div className="flex flex-col items-center w-full md:w-2/5">
            <h2 className="text-xl font-semibold mb-4">Current / New Photo</h2>
            <div className="relative">
              {/* Current Profile Photo */}
              <div
                ref={currentPhotoRef}
                className={`w-48 h-48 rounded-full bg-secondary flex items-center justify-center shadow-lg overflow-hidden border-8 border-border transition-all duration-300 ${
                  previewActive ? 'opacity-50 scale-95' : ''
                }`}
              >
                {current && !preview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={current} alt="Current profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-muted-foreground">
                    {defaultProfileSvg}
                  </div>
                )}
              </div>
              
              {/* Preview Selected Photo */}
              {preview && (
                <img
                  ref={previewImgRef}
                  src={preview}
                  alt="Photo Preview"
                  className={`w-48 h-48 rounded-full object-cover shadow-2xl border-8 border-cyan-500 absolute top-0 left-0 transition-opacity duration-300 ${
                    previewActive ? 'opacity-100' : 'opacity-0 hidden'
                  }`}
                />
              )}
            </div>
            
            {/* Status Message */}
            <p className="text-base text-muted-foreground text-center mt-4">
              {previewActive 
                ? "New photo preview is active. Click Save to update."
                : "Please select a new photo to enable the Save button."
              }
            </p>
          </div>

          {/* RIGHT SIDE: Controls & Actions */}
          <div className="w-full md:w-3/5 md:pt-4">
            <h2 className="text-xl font-semibold mb-4 border-b border-border pb-2">
              Upload and Actions
            </h2>

            {/* Upload New Photo Control */}
            <input
              ref={fileInputRef}
              type="file"
              id="photoUpload"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label
              htmlFor="photoUpload"
              className="cursor-pointer bg-cyan-500 hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-700 text-white font-bold py-3 px-10 w-full rounded-lg shadow-md hover:shadow-lg transition duration-150 ease-in-out text-center block hover:-translate-y-0.5"
            >
              Select New Photo
            </label>
            
            {/* Info Message */}
            <p className="text-sm text-muted-foreground mt-2">JPG, PNG, or GIF format required. Max 5MB.</p>
            
            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap justify-start gap-3 pt-4 border-t border-border">
              {/* Delete Photo Option */}
              <Button
                onClick={handleDelete}
                variant="destructive"
                className="flex-1 min-w-[120px] font-bold py-3 px-4"
                disabled={isSaving}
              >
                Delete Photo
              </Button>
              
              {/* Cancel / Back Option */}
              <Button
                onClick={handleCancel}
                variant="outline"
                className="flex-1 min-w-[120px] font-bold py-3 px-4"
                disabled={isSaving}
              >
                Cancel
              </Button>
              
              {/* Save / Update Photo */}
              <Button
                onClick={handleSave}
                disabled={!file || isSaving}
                className="flex-1 min-w-[140px] bg-cyan-500 hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-700 text-white font-bold py-3 px-6 shadow-lg disabled:opacity-70"
              >
                {isSaving ? 'Saving...' : 'Save / Update Photo'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePhotoDialog;



