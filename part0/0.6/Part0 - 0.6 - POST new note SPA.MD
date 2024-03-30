<<<<<<< HEAD
sequenceDiagram
    title: Part0 - 0.6 / POST new note SPA

    participant Browser
    participant Server

    Browser->>Server: Submit new note (Save button) (POST /new_note_spa)
    Server-->>Browser: HTTP 201 Created
    Note over Browser: JS code handles new note creation:
    Note over Browser: - Prevents default form submission
    Note over Browser: - Creates a new note object
    Note over Browser: - Adds the new note to the notes list
    Note over Browser: - Redraws notes on the page
    Browser->>Server: Requests JSON data update (GET /data.json)
    Server-->>Browser: Updated JSON data for existing notes
    Note over Browser: Update notes list without refreshing the page
=======
sequenceDiagram
    title: Part0 - 0.6 / POST new note SPA

    participant Browser
    participant Server

    Browser->>Server: Submit new note (Save button) (POST /new_note_spa)
    Server-->>Browser: HTTP 201 Created
    Note over Browser: JS code handles new note creation:
    Note over Browser: - Prevents default form submission
    Note over Browser: - Creates a new note object
    Note over Browser: - Adds the new note to the notes list
    Note over Browser: - Redraws notes on the page
    Browser->>Server: Requests JSON data update (GET /data.json)
    Server-->>Browser: Updated JSON data for existing notes
    Note over Browser: Update notes list without refreshing the page
>>>>>>> 172617752842837b0a6e854942c66f6fe5e6bc48
