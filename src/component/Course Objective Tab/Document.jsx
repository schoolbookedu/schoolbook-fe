// import React from 'react'
// import DocViewer, {DocViewerRenderers} from '@cyntler/react-doc-viewer'
// const Document = ({documentUrl,title}) => {
//   console.log(documentUrl)
//   const doc = [
//     {uri: {documentUrl},
//     // fileType: "pdf",
//     // fileName
//   }
//   ];

//   return (
//     <div>
//         <h2 className='text-center'>{title}</h2>
//         <a href={documentUrl}>Click to Download File</a>
//         <DocViewer 
//         documents={doc}
//         pluginRenderers={DocViewerRenderers}
//         />
//     </div>
//   )
// }

// export default Document

import  { React, useState} from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { pdfjs } from 'react-pdf';

const Document = ({ documentUrl, title }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <h2>{title}</h2>
      <div>
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
          <Viewer fileUrl={documentUrl} onReady={onDocumentLoadSuccess} />
        </Worker>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    </div>
  );
};

export default Document;