import React from "react";
import "./DialogBox.scss";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Button,
} from "@mui/material";

export interface DialogBoxProps {
  open: boolean;
  title: string;
  message: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DialogBox: React.FC<DialogBoxProps> = ({
  open,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog open={open} onClose={onCancel} className="dialog-container">
      <DialogTitle ><span className="dialog-heading">{title}</span></DialogTitle>
      <Divider />
      <DialogContent className="dialog-content">{message}</DialogContent>
      <Divider />
      <DialogActions className="dialog-actions">
        <Button className="dialog-btn dialog-btn-cancel" onClick={onCancel} variant="outlined">
          {cancelText}
        </Button>
        <Button className="dialog-btn dialog-btn-confirm" onClick={onConfirm} variant="contained">
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;