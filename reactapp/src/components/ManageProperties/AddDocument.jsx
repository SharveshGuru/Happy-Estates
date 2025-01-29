import React, { useState } from 'react';
import styles from './AddProperty.module.css';
import axiosInstance from '../../Api';

const AddDocument = ({lease}) => {

    const user = JSON.parse(localStorage.getItem("user"));

    const [file, setFile] = useState(null);
    const [documentName, setDocumentName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [updated,setUpdated]=useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
    };

    const handleUpload = async () => {
        if (!file || !documentName) {
            setErrorMessage('All fields are required');
            return;
        }

        setErrorMessage('');
        const formData = new FormData();
        formData.append('file', file);
        formData.append('documentName', documentName);
        formData.append('documentType', "Lease Document");
        formData.append('leaseid', lease.id);
        formData.append('propertyid',lease.property.id);
        formData.append('uploadedBy', user.sub);

        const fileType = file.type; // Get the MIME type of the file
        formData.append('fileType', fileType);
        

        try {
            const response = await axiosInstance.post('/documents', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            });

            setUpdated(!updated);
        } catch (error) {
            setErrorMessage('Error uploading document. Please try again.');
            // console.error('Upload failed:', error);
        }
    };
    
    function handleSubmit(e){
        e.preventDefault();

        handleUpload();
    };

    return (
        <div className={styles.container}>
            {!updated &&<>
            <h2 className={styles.heading}>Add Document</h2>
            <br></br>
            {/* {console.log(lease)} */}
        <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.formlabel}>Document Name: </label>
            <input className={styles.forminput} onChange={(e)=>setDocumentName(e.target.value)} type="text" value={documentName} placeholder='Enter Document Name' required></input><br />
            
            <label className={styles.formlabel}>Upload Document: </label>
            <input type='file' onChange={handleFileChange} />
            <br/>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            <button className={styles.submit} type='submit'>Add Document</button>
            </form></>}
            {updated && <h2>Document has been added successfully!</h2>}
        </div>
    );
};

export default AddDocument;
