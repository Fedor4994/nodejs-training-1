const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const db = path.resolve("./contacts.json");
const router = express.Router();

router.use(express.json());

router.get("/contacts", async (req, res) => {
  try {
    const data = await fs.readFile(db, "utf8");
    const contacts = JSON.parse(data);
    console.log(123);
    res.json(contacts);
  } catch (error) {
    res.send("Something goes wrong", error);
  }
});

router.get("/contacts/:id", async (req, res) => {
  try {
    const data = await fs.readFile(db, "utf8");
    const contacts = JSON.parse(data);
    const contact = contacts.find((contact) => contact.id === req.params.id);
    console.log(contact);
    contact
      ? res.json(contact)
      : res.status(400).send("No contact with such id");
  } catch (error) {
    res.send("Something goes wrong", error);
  }
});

router.delete("/contacts/:id", async (req, res) => {
  try {
    const data = await fs.readFile(db, "utf8");
    const contacts = JSON.parse(data);
    const filtredContacts = contacts.filter(
      (contact) => contact.id !== req.params.id
    );
    if (filtredContacts.length === contacts.length) {
      return res.status(400).send("Does not exist contact with this id");
    }
    await fs.writeFile(db, JSON.stringify(filtredContacts));
    res.json(filtredContacts);
  } catch (error) {
    res.send("Something goes wrong", error);
  }
});

router.post("/contacts", async (req, res) => {
  const data = await fs.readFile(db, "utf8");
  const contacts = JSON.parse(data);
  const lastId = Number(contacts[contacts.length - 1].id);
  console.log(req.body);
  contacts.push({
    id: String(lastId + 1),
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  });
  await fs.writeFile(db, JSON.stringify(contacts));
  res.json(contacts);
});

module.exports = router;
