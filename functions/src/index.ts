const functions = require("firebase-functions");
const express = require("express");

const cors = require("cors");
const app = express();
app.use(cors());

// const { db } = require("./utils/admin");
const { admin } = require("./utils/admin");

app.use("/api/", require("./routes/index"));
app.use("/api/users/", require("./routes/users"));
app.use("/api/screams/", require("./routes/screams"));
app.use("/api/programs/", require("./routes/programs"));
app.use("/api/program-rewards/", require("./routes/program-rewards"));
app.use("/api/interests/", require("./routes/interests"));

export const bunkr = functions.https.onRequest(app);

const createNotification = (newNotification) => {
    return admin.firestore().collection('notifications')
        .add(newNotification)
        .then(doc => console.log('notification added', doc))
}

export const projectCreated = functions.firestore
    .document('projects/{projectId}')
    .onCreate(doc => {
        const project = doc.data();
        const notification = {
            content: 'Added a new project',
            user: `${project.authorFirstName} ${project.authorLastName}`,
            time: admin.firestore.FieldValue.serverTimestamp()
        }

        return createNotification(notification);
    }
)

export const userJoined = functions.auth.user()
    .onCreate(user => {
        return admin.firestore().collection('users')
            .doc(user.uid).get().then(doc => {
                const newUser = doc.data();
                const notification = {
                    content: 'Joined Bunkr',
                    user: `${newUser.firstName} ${newUser.lastName}`,
                    time: admin.firestore.FieldValue.serverTimestamp()
                }

                return createNotification(notification);
            })
    }
)