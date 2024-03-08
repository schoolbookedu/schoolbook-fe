import { React } from "react";
import "@react-pdf-viewer/core/lib/styles/index.css";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const Document = ({ documentUrl }) => {
  const docs = [
    {
      uri: documentUrl,
    },
  ];

  return (
    <div>
      {/* <h2>{title}</h2> */}
      <div className="w-full">
        <DocViewer
          documents={docs}
          initialActiveDocument={docs[1]}
          pluginRenderers={DocViewerRenderers}
          height="100"
        />
      </div>
    </div>
  );
};

export default Document;
