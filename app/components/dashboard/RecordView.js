import React, { useState } from "react";
import Image from "next/image";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config";

function RecordView({ record, onBack, teamId }) {
  const [editMode, setEditMode] = useState(false);
  const [editedRecord, setEditedRecord] = useState({ ...record });

  if (!record) return null;

  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (!editMode) {
      setEditedRecord({ ...record });
    }
  };

  const handleChange = (key, value) => {
    setEditedRecord((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!record.id) {
      console.error("No record ID or team ID found");
      return;
    }

    try {
      const recordRef = doc(db, "teams", teamId, "records", record.id);
      console.log(db, teamId, record.id);
      await updateDoc(recordRef, editedRecord);
      setEditMode(false);

      setEditedRecord({ ...editedRecord });
    } catch (error) {
      console.error("Error updating record: ", error);
      alert("Error updating record!");
    }
  };

  const renderField = (label, value, key) => {
    return (
      <div className="mb-1" key={key}>
        <label className="font-medium block mb-1">{label}:</label>
        {editMode ? (
          <input
            type="text"
            defaultValue={value !== "N/A" ? value : ""}
            placeholder={`Enter ${label.toLowerCase()}`}
            className="input input-bordered input-primary w-full max-w-xs"
            onChange={(e) => handleChange(key, e.target.value)}
          />
        ) : (
          <span>{value}</span>
        )}
      </div>
    );
  };

  return (
    <div className="p-4 max-w-xl mt-5 mx-auto">
        <div className="flex justify-center">
      <button onClick={onBack} className="btn btn-primary mb-4">
        Back
      </button>
   
      <button onClick={toggleEditMode} className="btn btn-primary mb-4 ml-2">
        {editMode ? "Cancel" : "Edit"}
      </button>
      {editMode && (
        <button onClick={handleSave} className="btn btn-error mb-4 ml-2">
          Save
        </button>
      )}
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
        <div className="w-full text-center flex justify-center items-center mb-4">
          <Image
            src="/images/profile.jpg"
            className="rounded-full"
            width={40}
            height={40}
            alt="Profile"
          />
        </div>
        <h3 className="text-xl text-center font-semibold mb-4">
          {editedRecord.forename} {editedRecord.surname}
        </h3>

        <div className="text-gray-700 flex flex-col gap-3 text-md mb-4">
          <h2 className="font-bold text-lg mb-2">Basic Details</h2>
          {renderField("Forename", editedRecord.forename || "N/A", "forename")}
          {renderField("Surname", editedRecord.surname || "N/A", "surname")}
          {renderField("Date of Birth", editedRecord.dob || "N/A", "dob")}
          {renderField(
            "National Insurance Number",
            editedRecord.nino || "N/A",
            "nino"
          )}
        </div>

        <div className="text-gray-700 flex text-md flex-col gap-3mb-4">
          <h2 className="font-bold text-lg mb-2">Contact Details</h2>
          {renderField("Address", editedRecord.address || "N/A", "address")}
          {renderField("Phone", editedRecord.phone || "N/A", "phone")}
          {renderField("Email", editedRecord.email || "N/A", "email")}
        </div>

        <div className="text-gray-700 flex flex-col gap-3 text-md">
          <h2 className="font-bold text-lg mb-2">Job and Role</h2>
          {renderField("Position", editedRecord.position || "N/A", "position")}
          {renderField(
            "Department",
            editedRecord.department || "N/A",
            "department"
          )}
          {renderField(
            "Start Date",
            editedRecord.startDate || "N/A",
            "startDate"
          )}
          {renderField(
            "Employee ID",
            editedRecord.employeeId || "N/A",
            "employeeId"
          )}
        </div>
      </div>
    </div>
  );
}

export default RecordView;
