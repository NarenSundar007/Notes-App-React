# Notes App 📝

![image](https://github.com/user-attachments/assets/6c5baa6e-2e81-4e99-8c44-27e8415a41dd)

A simple full-stack Notes App built using React, normal CSS, and Express.js.

(Currently Working on Login and session features using Google OAuth)

### This project has 2 different types of Back-end servers:
1) Just stores the notes in an array if there is post request and and returns notes from that array if given a get request.(Data gets lost if server restarts)
2) Uses a local mongoDB server to store the notes and notes are permanently stored in disk so no worries of dataloss

## Features
- Add notes with a unique ID and description.
- View all notes in a list format.
- Delete notes with a single click.
- Notes get stores in a Local MongoDB database.
- Custom Google Fonts for better typography.

## Tech Stack
### Frontend:
- **React**: For building the user interface.
- **CSS**: For styling.


### Backend:
- **Express.js**: For the API server.
- **Axios**: For making HTTP requests.
- **MongoDB**: For storing notes
