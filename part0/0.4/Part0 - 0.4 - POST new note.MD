sequenceDiagram
    title: Part0 0.4 / POST new note

    participant Browser
    participant Server

    Browser->>Server: Submit new note (Save button)  (POST /new_note)
    Server-->>Browser: HTTP 302 Redirect to /notes
    Browser->>Server: Request notes (GET /notes)
    Server-->>Browser: Notes page (HTML)
    Browser->>Server: Request stylesheet (GET main.css)
    Server-->>Browser: CSS file
    Browser->>Server: Request JavaScript script (GET main.js)
    Server-->>Browser: JavaScript file
    Browser->>Server: Request JSON data (GET data.json)
    Server-->>Browser: Updated list of notes (JSON)