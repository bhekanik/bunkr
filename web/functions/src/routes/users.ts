import { signupUser, loginUser, userImage } from "../types/usersTypes";
import { notification } from "../types/programsTypes";

const FBAuth = require("../utils/fbAuth");

const express = require("express");
const { admin, db } = require("../utils/admin");
const config = require("../utils/config");
const firebase = require("firebase");

firebase.initializeApp(config);

const router = express.Router();

const {
  validateSignupData,
  validateLoginData,
  reduceUserDetails
} = require("../utils/validators");

// Sign users up
router.post("/signup", (req, res) => {
  const newUser: signupUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle
  };

  const { valid, errors } = validateSignupData(newUser);

  if (!valid) return res.status(400).json(errors);

  const noImg = "no-img.png";

  let token: string, userId: string;
  db.doc(`/users/${newUser.handle}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        return res.status(400).json({ handle: "this handle is already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then(data => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then(idToken => {
      token = idToken;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${
          config.storageBucket
        }/o/${noImg}?alt=media`,
        userId
      };
      return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch(err => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: "Email is already is use" });
      } else {
        return res
          .status(500)
          .json({ general: "Something went wrong, please try again" });
      }
    });
});

// Log user in
router.post("/login", (req, res) => {
  const user: loginUser = {
    email: req.body.email,
    password: req.body.password
  };

  const { valid, errors } = validateLoginData(user);

  if (!valid) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
      return data.user.getIdToken();
    })
    .then(token => {
      return res.json({ token });
    })
    .catch(err => {
      console.error(err);
      // auth/wrong-password
      // auth/user-not-user
      return res
        .status(403)
        .json({ general: "Wrong credentials, please try again" });
    });
});

// Add user details
router.post("/", (req, res) => {
  const reducedUserDetails = reduceUserDetails(req.body);

  db.doc(`/users/${req.user.handle}`)
    .update(reducedUserDetails)
    .then(() => {
      return res.json({ message: "Details added successfully" });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
});

// Get any user's details
router.get("/:handle", (req, res) => {
  const requestedUserDetails: any = {};

  db.doc(`/users/${req.params.handle}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        requestedUserDetails.user = doc.data();
        return db
          .collection("programs")
          .where("userHandle", "==", req.params.handle)
          .orderBy("createdAt", "desc")
          .get();
      } else {
        return res.status(404).json({ errror: "User not found" });
      }
    })
    .then(data => {
      data.forEach(doc => {
        requestedUserDetails.programs.push({
          name: doc.data().name,
          createdAt: doc.data().createdAt,
          provider: doc.data().provider,
          programLogo: doc.data().programLogo,
          likeCount: doc.data().likeCount,
          commentCount: doc.data().commentCount,
          programId: doc.id
        });
      });
      return res.json(requestedUserDetails);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
});

// Get own user details
router.get("/", (req, res) => {
  const requestedUserData: any = {};

  db.doc(`/users/${req.user.handle}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        requestedUserData.credentials = doc.data();
        return db
          .collection("likes")
          .where("userHandle", "==", req.user.handle)
          .get();
      }
    })
    .then(data => {
      data.forEach(doc => {
        requestedUserData.likes.push(doc.data());
      });
      return db
        .collection("notifications")
        .where("recipient", "==", req.user.handle)
        .orderBy("createdAt", "desc")
        .limit(10)
        .get();
    })
    .then(data => {
      data.forEach(doc => {
        requestedUserData.notifications.push({
          recipient: doc.data().recipient,
          sender: doc.data().sender,
          createdAt: doc.data().createdAt,
          programId: doc.data().programId,
          type: doc.data().type,
          read: doc.data().read,
          notificationId: doc.id
        });
      });
      return res.json(requestedUserData);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
});

// Upload a profile image for user
router.post("/image", FBAuth, (req, res) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  const busboy = new BusBoy({ headers: req.headers });

  let imageToBeUploaded: userImage;
  let imageFileName: string;

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
      return res.status(400).json({ error: "Wrong file type submitted" });
    }
    // my.image.png => ['my', 'image', 'png']
    const imageExtension: string = filename.split(".")[
      filename.split(".").length - 1
    ];
    // 32756238461724837.png
    imageFileName = `${Math.round(
      Math.random() * 1000000000000
    ).toString()}.${imageExtension}`;
    const filepath: string = path.join(os.tmpdir(), imageFileName);
    file.pipe(fs.createWriteStream(filepath));
    file.on("end", function() {
      console.log("File [" + fieldname + "] Finished");
    });
    imageToBeUploaded = { filepath, mimetype };
    console.log("busboy finished");
  });
  busboy.on("finish", () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype
          }
        }
      })
      .then(() => {
        const imageUrl: string = `https://firebasestorage.googleapis.com/v0/b/${
          config.storageBucket
        }/o/${imageFileName}?alt=media`;
        return db.doc(`/users/${req.user.handle}`).update({ imageUrl });
      })
      .then(() => {
        return res.json({ message: "image uploaded successfully" });
      })
      .catch(err => {
        console.error(err);
        return res.status(500).json({ error: "something went wrong" });
      });
  });
  busboy.end(req.rawBody);
});

// Mark notifications as read
router.post("/notifications", (req, res) => {
  const batch = db.batch();
  req.body.forEach(notificationId => {
    const returnedNotification: notification = db.doc(
      `/notifications/${notificationId}`
    );
    batch.update(returnedNotification, { read: true });
  });
  batch
    .commit()
    .then(() => {
      return res.json({ message: "Notifications marked read" });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
});

module.exports = router;
