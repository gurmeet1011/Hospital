import React from "react";

const EmergencyContacts = () => {
  // Example emergency contacts data
  const contacts = [
    {
      name: "Ambulance",
      number: "112",
      description: "Emergency ambulance services",
    },
    {
      name: "Police",
      number: "100",
      description: "Contact local police for emergencies",
    },
    {
      name: "Fire Brigade",
      number: "101",
      description: "For fire-related emergencies",
    },
    {
      name: "Doctor on Call",
      number: "9876543210",
      description: "24/7 medical assistance",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Emergency Contacts
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map((contact, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300"
          >
            <h2 className="text-xl font-semibold text-red-500">
              {contact.name}
            </h2>
            <p className="text-gray-700 mt-2">{contact.description}</p>
            <p className="text-gray-800 font-bold mt-4">
              Contact: {contact.number}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyContacts;
