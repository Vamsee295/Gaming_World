import React, { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";

interface ChangePhotoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ChangePhotoDialog: React.FC<ChangePhotoDialogProps> = ({ open, onOpenChange }) => {
  const { user, updateAvatar, removeAvatar } = useUser();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const current = useMemo(() => user?.avatarUrl ?? null, [user]);

  const onPick = (f: File | undefined) => {
    if (!f) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = () => setPreview(String(reader.result));
    reader.readAsDataURL(f);
  };

  const onSave = async () => {
    if (file) await updateAvatar(file);
    onOpenChange(false);
  };

  const onRemove = () => {
    removeAvatar();
    setFile(null);
    setPreview(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change profile photo</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="h-24 w-24 rounded-full overflow-hidden bg-secondary flex items-center justify-center">
              {preview || current ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={(preview || current) as string} alt="preview" className="h-24 w-24 object-cover" />
              ) : (
                <span className="text-muted-foreground text-sm">No photo</span>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <input
                id="photo-input"
                type="file"
                accept="image/*"
                onChange={(e) => onPick(e.target.files?.[0])}
                className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-primary-foreground hover:file:bg-primary/90"
              />
              <p className="text-xs text-muted-foreground">PNG or JPG up to ~5MB.</p>
            </div>
          </div>
        </div>
        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button variant="destructive" onClick={onRemove}>Remove Photo</Button>
          <Button onClick={onSave} disabled={!file}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePhotoDialog;



