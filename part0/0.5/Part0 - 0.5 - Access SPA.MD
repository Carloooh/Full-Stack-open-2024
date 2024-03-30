sequenceDiagram
    title: Part0 - 0.5 / Access SPA web

    participant Browser
    participant Server

    Browser->>Server: Access web page (GET /spa)
    Server-->>Browser: HTML document
    Browser->>Server: Request CSS (GET main.css)
    Server-->>Browser: CSS code for SPA
    Browser->>Server: Request JavaScript (GET spa.js)
    Server-->>Browser: JavaScript code for SPA
    Browser->>Server: Request JSON data (GET data.json)
    Server-->>Browser: JSON data for existing notes
    Browser->>Browser: Process JSON data and dynamically generate HTML