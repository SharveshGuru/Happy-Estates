import React, { useState } from 'react';
import styles from './AddProperty.module.css';
import axiosInstance from '../../Api';

const AddImages = ({property}) => {

    const user = JSON.parse(localStorage.getItem("user"));
    
    const [files, setFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [updated, setUpdated] = useState(false);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const imageFiles = selectedFiles.filter(file => file.type.startsWith('image/'));
        
        if (imageFiles.length !== selectedFiles.length) {
            setErrorMessage('Only image files are allowed.');
        } else {
            setErrorMessage('');
            setFiles(imageFiles);
        }
    };

    const handleUpload = async () => {
        if (files.length === 0) {
            setErrorMessage('All fields are required');
            return;
        }
        
        setErrorMessage('');

        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file);
        });
        formData.append('documentName', property.name+" image");
        formData.append('documentType', "Property Image");
        formData.append('propertyid', property.id);
        formData.append('uploadedBy', user.sub);

        try {
            await axiosInstance.post('/images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUpdated(true);
        } catch (error) {
            setErrorMessage('Error uploading document. Please try again.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpload();
    };

    return (
        <div className={styles.container}>
            {!updated ? (
                <>
                    <h2 className={styles.heading}>Add Images</h2>
                    <br />
                    <form className={styles.form} onSubmit={handleSubmit}>
                        {/* <label className={styles.formlabel}>Document Name: </label>
                        <input 
                            className={styles.forminput} 
                            onChange={(e) => setDocumentName(e.target.value)} 
                            type="text" 
                            value={documentName} 
                            placeholder='Enter Document Name' 
                            required
                        /> */}
                        <br />
                        
                        <label className={styles.formlabel}>Upload Images: </label>
                        <input type='file' multiple accept="image/*" onChange={handleFileChange} />
                        <br />
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        
                        <button className={styles.submit} type='submit'>Add Images</button>
                    </form>
                </>
            ) : (
                <h2>Images have been added successfully!</h2>
            )}
        </div>
    );
};

export default AddImages;
