import { program, comment } from "../types/programsTypes";

const express = require("express");
const { db } = require("../utils/admin");

const router = express.Router();

// Get all programs
router.get("/", (req, res) => {
  db.collection("programs")
    .orderBy("createdAt", "desc")
    .get()
    .then(data => {
      const programs: program[] = [];
      data.forEach(doc => {
        programs.push({
          programId: doc.id,
          name: doc.data().name,
          provider: doc.data().provider,
          createdAt: doc.data().createdAt,
          commentCount: doc.data().commentCount,
          likeCount: doc.data().likeCount,
          programLogo: doc.data().programLogoUrl
        });
      });
      return res.json(programs);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
});

// Post one program
router.post("/", (req, res) => {
  if (req.body.body.trim() === "") {
    return res.status(400).json({ body: "Body must not be empty" });
  }

  const newProgram: program = {
    name: req.body.name,
    provider: req.user.provider,
    programLogo: req.user.programLogoUrl,
    createdAt: new Date().toISOString(),
    likeCount: 0,
    commentCount: 0
  };

  db.collection("programs")
    .add(newProgram)
    .then(doc => {
      const resProgram: program = newProgram;
      resProgram.programId = doc.id;
      res.json(resProgram);
    })
    .catch(err => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
});

// Get one program
router.get("/:programId", (req, res) => {
  let programData: program;
  db.doc(`/programs/${req.params.programId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Program not found" });
      }
      programData = doc.data();
      programData.programId = doc.id;
      return db
        .collection("comments")
        .orderBy("createdAt", "desc")
        .where("programId", "==", req.params.programId)
        .get();
    })
    .then(data => {
      programData.comments = [];
      data.forEach(doc => {
        programData.comments.push(doc.data());
      });
      return res.json(programData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
});

// Comment on a program
router.post("/:programId/comment", (req, res) => {
  if (req.body.body.trim() === "")
    return res.status(400).json({ comment: "Must not be empty" });

  const newComment: comment = {
    body: req.body.body,
    createdAt: new Date().toISOString(),
    programId: req.params.programId,
    userHandle: req.user.handle,
    userImage: req.user.imageUrl
  };

  db.doc(`/programs/${req.params.programId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Program not found" });
      }
      return doc.ref.update({ commentCount: doc.data().commentCount + 1 });
    })
    .then(() => {
      return db.collection("comments").add(newComment);
    })
    .then(() => {
      res.json(newComment);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Something went wrong" });
    });
});

// Like a program
router.get("/:programId/like", (req, res) => {
  const likeDocument = db
    .collection("likes")
    .where("userHandle", "==", req.user.handle)
    .where("programId", "==", req.params.programId)
    .limit(1);

  const programDocument = db.doc(`/programs/${req.params.programId}`);

  let programData: program;

  programDocument
    .get()
    .then(doc => {
      if (doc.exists) {
        programData = doc.data();
        programData.programId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: "Program not found" });
      }
    })
    .then(data => {
      if (data.empty) {
        return db
          .collection("likes")
          .add({
            programId: req.params.programId,
            userHandle: req.user.handle
          })
          .then(() => {
            programData.likeCount++;
            return programDocument.update({ likeCount: programData.likeCount });
          })
          .then(() => {
            return res.json(programData);
          });
      } else {
        return res.status(400).json({ error: "Program already liked" });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
});

// Unlike a program
router.get("/:programId/unlike", (req, res) => {
  const likeDocument = db
    .collection("likes")
    .where("userHandle", "==", req.user.handle)
    .where("programId", "==", req.params.programId)
    .limit(1);

  const programDocument = db.doc(`/programs/${req.params.programId}`);

  let programData: program;

  programDocument
    .get()
    .then(doc => {
      if (doc.exists) {
        programData = doc.data();
        programData.programId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: "Program not found" });
      }
    })
    .then(data => {
      if (data.empty) {
        return res.status(400).json({ error: "Program not liked" });
      } else {
        return db
          .doc(`/likes/${data.docs[0].id}`)
          .delete()
          .then(() => {
            programData.likeCount--;
            return programDocument.update({ likeCount: programData.likeCount });
          })
          .then(() => {
            res.json(programData);
          });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
});

// Delete a program
router.delete("/:programId", (req, res) => {
  const document = db.doc(`/programs/${req.params.programId}`);
  document
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Program not found" });
      }
      if (doc.data().userHandle !== req.user.handle) {
        return res.status(403).json({ error: "Unauthorized" });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: "Program deleted successfully" });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
});

module.exports = router;
