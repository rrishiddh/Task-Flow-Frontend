# <img width="30px" src="https://img.icons8.com/?size=100&id=JiXLgJKyZix0&format=png&color=000000"/> TaskFlow✨

## Project Name: TaskFlow

### A brief description: 
- TaskFlow is a task management application that enables users to efficiently add, edit, delete, and reorder tasks using an intuitive drag-and-drop interface. The tasks are categorized into three sections: To-Do, In Progress, and Done, ensuring seamless workflow organization. The application features real-time database synchronization to maintain data persistence and is designed with a clean, minimalistic, and fully responsive UI.
 


---

### Purpose:

- TaskFlow is built to test and enhance front-end interactivity, backend data management, and real-time synchronization skills while adhering to a structured design system. The application ensures a user-friendly experience for managing tasks effectively while maintaining real-time data integrity.
  

### Main Technology used in this project:
- React-router
- MongoDB
- Node.js
- Express.js
- Firebase-auth
- Tailwind-CSS
- React-dnd package 

### Main Key Features:

1. Authentication System:

- Users must log in via Firebase Authentication (Google Sign-in).

- User details (ID, email, and display name) are stored in the database upon first login.

2. Task Management System:

- Users can create, edit, delete, and reorder tasks.

- Tasks are categorized into: To-Do, In Progress, Done.

- Drag-and-drop functionality for moving and reordering tasks.

- Instant database synchronization for data persistence.

3. Database & Real-time Syncing:

- MongoDB is used as the database to store tasks.

- Ensures real-time updates using one of the following approaches:MongoDB Change Streams,Optimistic UI,Polling as a fallback.
- Deleted tasks are permanently removed from the database.



4. Frontend UI:

- Built with Vite.js + React for optimal performance.

- Drag-and-drop functionality using React-beautiful-dnd.

- Clean, modern, and fully responsive UI.

- Limited to four colors for a minimalistic look.

5. Responsiveness:

- Works smoothly on both desktop and mobile devices.

- Ensures a mobile-friendly drag-and-drop experience.



### Dependencies:
- axios : ^1.7.9,
- firebase : ^11.1.0,
- localforage : ^1.10.0,
- match-sorter : ^8.0.0,
- react : ^19.0.0-rc.1,
- react-dnd : ^16.0.1,
- react-dnd-html5-backend : ^16.0.1,
- react-dom : ^19.0.0-rc.1,
- react-hook-form : "^7.54.2,
- react-router-dom : ^7.1.1,
- sort-by : ^1.2.0,
- sweetalert2 : "11.15.10

### How to run on local machine?

1. Open your terminal or command prompt.

2. Use the git clone command followed by the repository URL:-  git clone 'repository-url'

- Replace 'repository-url' with the actual URL of the Git repository you want to clone.

3. To run the project: Navigate to the project directory:- cd 'directory-name' 

4. Run 'npm install' to install project dependencies.

5. Environment setup:Create a '.env.local' file and put your firebase environment variable there. Save the following variable:
- VITE_apiKey='YOUR_FIREBASE_API_KEY'
- VITE_authDomain='YOUR_FIREBASE_AUTH_DOMAIN'
- VITE_projectId='YOUR_FIREBASE_PROJECT_ID'
- VITE_storageBucket='YOUR_FIREBASE_STORAGE_BUCKET'
- VITE_messagingSenderId='YOUR_FIREBASE_MESSAGING_SENDER_ID'
- VITE_appId='YOUR_FIREBASE_APP_ID'
- VITE_Payment_Gateway_PK='YOUR_STRIPE_ID'

6. Run 'npm run dev' to run the project locally.



###

##  Live Link: 
### Netlify : []()

### 
##  GitHub Repo Link: 
###  Server Side : []()


### 


<hr/>