import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";

export default function EditDialog({
  open,
  initialContent,
  onConfirm,
  onClose,
}) {
  console.log(
    "Initial content:=======================================",
    initialContent
  );

  const [editedContent, setEditedContent] = React.useState(
    initialContent || ":::"
  );
  console.log(
    "Edited content:==========================================",
    editedContent
  );

  const handleConfirm = () => {
    onConfirm(editedContent);
    onClose();
  };

  return (
    <React.Fragment>
      <Dialog id="Dialog" open={open} onClose={onClose}>
        <DialogTitle>Enter your updates:</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            type="text"
            fullWidth
            value={editedContent}
            onChange={(e) => {
              setEditedContent((prevEditedContent) => e.target.value);
            }}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleConfirm} autoFocus>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
