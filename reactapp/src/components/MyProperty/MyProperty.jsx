import React, { useEffect, useState } from "react";
import styles from "./MyProperty.module.css"
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Api";
import { format } from "date-fns";
import Popup from "../Popup/Popup";
import FileDisplay from "../FileDisplay";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/swiper-bundle.css';
import Viewer from 'react-viewer';

const MyProperty = () =>{

    const navigate=useNavigate();
    const user=JSON.parse(localStorage.getItem("user"));
    const [property,setProperty]=useState({
        "id": null,
        "name": null,
        "type": null,
        "numberOfRooms": null,
        "plotArea": null,
        "address": null,
        "price": null,
        "owner": {
            "id": null,
            "name": null,
            "email": null,
            "phone": null,
            "username": null,
        },
        "tenant": {},
        "availabilityStatus": null,
        "postedOn": null,
        "images": [],
        "details": null
    });
    const [ldata,setLdata]=useState({});
    const [documents,setDocuments]=useState([]);
    const [selectedDocumentName, setSelectedDocumentName] = useState(""); 
    const [selectedDocument, setSelectedDocument] = useState(null); 
    const [selectedMimeType, setSelectedMimeType] = useState("");
    const [isDocViewOpen, setIsDocViewOpen] = useState(false);
    const [images,setImages]=useState([]);
    const [viewerOpen, setViewerOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imagesForViewer, setImagesForViewer] = useState([]);

    useEffect(()=>{
        axiosInstance.get(`/tenantproperty/${user.sub}`)
        .then((res)=>{
            setProperty(res.data);
            // console.log(res.data);
        })
        .catch((err)=>{
            window.alert("Error getting details!");
        })
    },[user.sub]);

    useEffect(()=>{
        if(property && property.id){
            axiosInstance.get(`plmapprop/${property.id}`)
            .then((res)=>{
                setLdata(res.data);
                // console.log(res.data);
            })
            .catch((err)=>{
                window.alert("Error getting details!");
            });
        }
    },[property]);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axiosInstance.get(`/propertydocs/${ldata.id}`);
                setDocuments(response.data);
                // console.log(response.data);
            } catch (err) {
                console.log();
            }
        };
    
        fetchDocuments();
    }, [ldata]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axiosInstance.get(`/propertyimages/${property.id}`);
                setImages(response.data);
                // console.log(response.data);
            } catch (err) {
                console.log();
            }
        };
        if(property.id){
            fetchImages();
        }
    }, [property.id]);

    useEffect(()=>{
        if(images.length>0){
            const mappedImages = images.map((img) => ({
                src: convertBlobToURL(img.document, img.fileType),
                alt: img.documentName,
                thumbnail: convertBlobToURL(img.document, img.fileType),
            }));
            setImagesForViewer(mappedImages);
        }
    },[images]);

    const handleRequest=()=>{
        navigate("/requests")
    }

    function convertBlobToURL(blobData, fileType) {
        return `data:${fileType};base64,${blobData}`;
    }

    function handleDocViewPopup(){
        setIsDocViewOpen(!isDocViewOpen);
    }

    function handleView(document){
        setSelectedDocument(document.document);
        setSelectedMimeType(document.fileType);
        setSelectedDocumentName(document.documentName)
        setIsDocViewOpen(!isDocViewOpen);
    }

    return(
        <div className={styles.page}>
            <h1 className={styles.heading}>My Property</h1>
            <div className={styles.container}>
                <div className={styles.listing}>
                    {(property && ldata.lease) ? (<div className={styles.listingContent}>
                        <div>
                            <h2>Property Details:</h2><br />
                            <p>Property Name: {property.name}</p>
                            <p>Address: {property.address}</p>
                            <p>Lease Amount: ₹{property.price}/month</p>
                            <p>Lease Start Date: {format(new Date(ldata.lease.leaseStartDate),"dd MMMM yyyy")}</p>
                            <p>Lease End Date: {format(new Date(ldata.lease.leaseEndDate),"dd MMMM yyyy")}</p>
                            <p>Lease Duration: {ldata.lease.duration} days</p>
                        </div>
                        <div className={styles.ownerContent}>
                            <h2>Owner Details:</h2><br />
                            <p>Owner Name: {property.owner.name}</p>
                            <p>Email ID: {property.owner.email}</p>
                            <p>Phone Number: {property.owner.phone}</p>
                            <button onClick={handleRequest} className={styles.requestButton}>Raise Requests</button>
                        </div>
                    </div>):<h3>You have no property rented</h3>}
                </div>
                <div className={styles.listing}>
                    <h2>Lease Documents:</h2>
                    <div>
                        {documents.length>0 ? (
                            <table className={styles.table}>
                                <thead>
                                    <tr className={styles.headerRow}>
                                        <th className={styles.th}>Document Name</th>
                                        <th className={styles.th}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {documents.map((doc,index)=>(
                                        <tr className={styles.row} key={index}>
                                            <td className={styles.td}>{doc.documentName}</td>
                                            <td className={styles.docbuttonRow}>
                                                <button onClick={()=>handleView(doc)} className={styles.actionButton}>View / Download</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ):<p><br />There are no documents added!</p>}
                    </div>
                </div>
                <div className={styles.listing}>
                    <div className={styles.listingContent}>
                        <h2>Property Images:</h2>
                    </div>

                    
                    {images.length>0?(
                        <div>
                            <br/>
                            <Swiper
                                spaceBetween={10}
                                slidesPerView={1}
                                onSlideChange={(swiper)=>setCurrentImageIndex(swiper.activeIndex)}
                                className={styles.carousel}
                            >
                                {imagesForViewer.map((img,index)=>(
                                    <SwiperSlide key={index}>
                                        <img src={img.thumbnail} alt={img.alt} className={styles.thumbnail} onClick={()=>setViewerOpen(true)} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <p>Click the image to view fully; Swipe using mouse to view all</p>
                        </div>):<p><br />There are no images added!</p>}
                    
                </div>
            </div>
            <Popup isOpen={isDocViewOpen} onClose={handleDocViewPopup}>
                <FileDisplay docname={selectedDocumentName} base64Data={selectedDocument} mimeType={selectedMimeType}/>
            </Popup>
            <Viewer
                visible={viewerOpen}
                onClose={() => setViewerOpen(false)}
                images={imagesForViewer}
                activeIndex={currentImageIndex}
                zoomSpeed={0.2}
                rotatable={true}
                scalable={true}
                draggable={true}
            />
        </div>
    )
}

export default MyProperty;