import React, { useState } from 'react';
import { db } from '../../config';  
import { doc, collection, addDoc } from "firebase/firestore";

const AddRecord = ({ isOpen, onClose, teamId }) => {
  const [forename, setForename] = useState('');
  const [surname, setSurname] = useState(''); //
  const [dob, setDob] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!teamId) {
      alert("No team selected!");
      return;
    }
    try {
     
      await addDoc(collection(db, "teams", teamId, "records"), {
        forename,
        surname, 
        dob,
      });
      alert("Record added successfully!");
      onClose(); 
    } catch (error) {
      console.error("Error adding record: ", error);
      alert("Error adding record!");
    }
  };

  return (
    <dialog className={`modal ${isOpen ? "modal-open" : ""}`} id="add-record-modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add New Record</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Forename"
            required
            className="input input-bordered w-full max-w-xs my-2"
            value={forename}
            onChange={(e) => setForename(e.target.value)}
          />
          <input
            type="text"
            placeholder="Surname"
            className="input input-bordered w-full max-w-xs my-2"
            value={surname} 
            required
            onChange={(e) => setSurname(e.target.value)}
          />
          <input
            type="date"
            placeholder="dd/mm/yyyy"
            className="input input-bordered w-full max-w-xs my-2"
            value={dob}
            required
            onChange={(e) => setDob(e.target.value)}
          />
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="button" onClick={onClose} className="btn">Close</button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AddRecord;
