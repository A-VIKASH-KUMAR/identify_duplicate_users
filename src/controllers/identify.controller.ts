import {
  identifyContact,
  getSecondaryContactIds,
  createNewContact,
  updateContactPrecedence,
  random,
} from "../utils/funcions";

type Contact = {
  id: number;
  email: string;
  phone_number: string;
  created_at: Date;
};
export const identify = async (req: any, res: any) => {
  try {
    const { email, phoneNumber } = req.body;
    let contacts: Array<Contact>;
    contacts = await identifyContact(email, phoneNumber);

    if (email || phoneNumber) {
      if (contacts.length === 0) {
        const id = random(10000, 20000);
        const createContact = await createNewContact(
          id,
          email,
          phoneNumber,
          null,
          "primary"
        );

        if (!createContact) {
          return res
            .status(500)
            .json({ message: "unable to create contact please try later" });
        }
        return res.status(200).json({
          contact: {
            primaryContactId: createContact.id,
            emails: [createContact.email],
            phoneNumbers: [createContact.phone_number],
            secondaryContactIds: [],
          },
        });
      }
    } else {
      return res
        .status(400)
        .json({ error: "Email or phoneNumber is required." });
    }
    if (contacts && contacts.length > 0) {
      // If both email and phone number match
      if (
        email === contacts[0].email &&
        phoneNumber === contacts[0].phone_number
      ) {
        const secondaryContactIds = await getSecondaryContactIds(
          contacts[0].id
        );

        return res.status(200).json({
          contact: {
            primaryContactId: contacts[0].id,
            emails: [contacts[0].email],
            phoneNumbers: [contacts[0].phone_number],
            secondaryContactIds,
          },
        });
      }
      const emails = contacts.map((contact) => contact.email);
      const phoneNumbers = contacts.map((contact) => contact.phone_number);
      const ids = contacts.map((contact) => contact.id);
      for (let i = 0; i < contacts.length; i++) {
        // If a matching contact is found but with different information, create a secondary contact
        if (
          (email && emails.length > 1 && email !== emails[i]) ||
          (phoneNumber &&
            phoneNumbers.length > 1 &&
            phoneNumber !== phoneNumbers[i])
        ) {
          const id = random(10000, 20000);
          await createNewContact(id, email, phoneNumber, ids[0], "secondary");
        }

        if (
          (email && email === emails[i]) ||
          (phoneNumber && phoneNumber === phoneNumbers[i])
        ) {
          const id = ids[i];
          await updateContactPrecedence(id, ids[0], "secondary");
        }
      }

      const secondaryContactIds = await getSecondaryContactIds(contacts[0].id);
      const uniquePhoneNumbers = [...new Set(phoneNumbers)];
      const uniqueEmails = [...new Set(emails)];
      return res.status(200).json({
        contact: {
          primaryContactId: contacts[0].id,
          emails: uniqueEmails,
          phoneNumbers: uniquePhoneNumbers,
          secondaryContactIds,
        },
      });
    } else {
      return res.status(404).json({ error: "Contact not found." });
    }
  } catch (error) {
    console.error("Error identifying contact:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
