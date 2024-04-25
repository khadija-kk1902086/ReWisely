import React, { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";

const EditsSaving = ({ choices, type, userId, materialId }) => {
  const [saving, setSaving] = useState(false);

  // console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
  // console.log(choices);
  // console.log(pathname);
  // console.log(authorName);
  // console.log(userId);
  // console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++");

  const saveToDatabase = async () => {
    try {
      setSaving(true);
      const response = await fetch("/api/update-material", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          choices: choices,
          // authorName: authorName,
          type: type,
          materialId: materialId,
        }),
      });

      if (response.ok) {
        console.log("Choices saved successfully!");
      } else {
        throw new Error("Failed to save choices to the database");
      }
    } catch (error) {
      console.error("Error saving choices:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <aside className="fixed top-0 right-0 flex flex-col justify-center items-center h-screen bg-transparent mr-8">
      <div className="space-y-4">
        <SaveIcon
          id="SaveIcon"
          style={{ fontSize: "32px", color: "#1668F5" }}
          onClick={saveToDatabase}
          className={saving ? "opacity-50 cursor-not-allowed" : ""}
        />
      </div>
    </aside>
  );
};

export default EditsSaving;
