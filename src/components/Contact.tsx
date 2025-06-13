import { getContact } from "@/services/strapi";
import { type Contact } from "@/types";
import { Github, Linkedin, Mail, MapPin, Unplug } from "lucide-react";
import { useEffect, useState } from "react";

function Contact() {
  const [contact, setContact] = useState<Contact>();
  const baseUrl = import.meta.env.VITE_API_ENDPOINT;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContact();
        setContact(data);
      } catch (err) {
        setError("Failed to fetch home data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !contact) {
    return <div className="py-10 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="py-10 text-center text-red-500">{error}</div>;
  }

  return (
    <section
      id="contact"
      className="flex h-auto min-h-[calc(50svh-65px)] w-full flex-col items-center justify-center p-4 md:px-12"
    >
      <h1 className="text-4xl font-bold">Get In Touch</h1>
      <p className="mt-4 text-sm text-zinc-700">
        Have a project in mind or want to discuss potential opportunities? I'd
        love to hear from you!
      </p>
      <div className="mx-auto flex w-full flex-col items-start justify-start px-4 md:mt-10 md:flex-row lg:w-[800px]">
        {/* email */}
        <div className="mt-4 w-full">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="email"
          >
            <Mail className="mr-2 inline" />
            Email
          </label>
          <a id="email" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
        </div>

        {/* location */}
        <div className="mt-4 w-full">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="location"
          >
            <MapPin className="mr-2 inline" />
            Based in
          </label>
          <p>{contact.location}</p>
        </div>

        {/* connect */}
        <div className="mt-4 w-full">
          <p className="mb-2 block text-sm font-bold text-gray-700">
            <Unplug className="mr-2 inline" />
            Connect with me
          </p>
          {contact.socials.map((social) => (
            <a
              className="mr-4 inline-block cursor-pointer"
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* TODO: add icon for each social */}
            </a>
          ))}

          <a
            className="inline-block cursor-pointer"
            href="https://github.com/NatdanaiKhe"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="inline" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
