"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { db } from '../../../config';
import { doc, getDoc } from 'firebase/firestore';

const RecordPage = () => {
  const [record, setRecord] = useState(null);
  const navigation = useNavigation();

  
  const recordId = navigation.current.pathname.split('/').pop();

  useEffect(() => {
    const fetchRecord = async () => {
      if (recordId) {
        try {
          const docRef = doc(db, 'records', recordId); 
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setRecord(docSnap.data());
          } else {
            console.log('No such document!');
          
          }
        } catch (error) {
          console.error('Error fetching record:', error);
        
        }
      }
    };

    fetchRecord();
  }, [recordId]);

  if (!record) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Record Details</h1>
      <div className="mt-4">
        <p>ID: {recordId}</p>
        <p>Forename: {record.forename}</p>
        <p>Surname: {record.surname}</p>
        <p>Date of Birth: {record.dob}</p>
      </div>
    </div>
  );
};

export default RecordPage;