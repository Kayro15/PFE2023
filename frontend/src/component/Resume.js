
import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../css/PDFViewer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = () => {

  const [pdfData, setPdfData] = useState(null);
  const {idUser}=useParams()
  useEffect(() => {
      axios.get(`http://localhost:3000/api/users/pdf/${idUser}`).then((response) => {
        console.log(response.data.user.pdfdata.data)
      setPdfData(response.data.user.pdfdata.data);
    });
  }, []);



  return (
     <div className="pdf-container">
      {pdfData ? ( 
       <Document file={{ data: pdfData }}>
          <Page
            pageNumber={1}
            width={700}
          />
     </Document>
      ) : (
        <div>Loading PDF...</div>
      )}
    
    </div>
  );
};

export default PDFViewer;

