import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeleteJobDialog = ({ job, onClose, onDelete }) => {
  if (!job) return null;

  const handleDelete = () => {
    onDelete(job.id);
    onClose();
  };

  return (
    <Dialog open={!!job} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-strawberry-700">Delete Job</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this job? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={handleDelete}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteJobDialog;