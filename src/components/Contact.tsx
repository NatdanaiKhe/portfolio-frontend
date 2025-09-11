import { type ContactType } from "@/types";
import { Link, Mail, MapPin,  } from "lucide-react";
import { useEffect, useRef } from "react";
import { useAnimation, useInView, motion } from "motion/react";
import { motionVariant } from "@/config/motionConfig";

function Contact({ contact }: { contact: ContactType }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }else{
      controls.start('hidden')
    }
  }, [inView, controls]);
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={motionVariant}
      id="contact"
      className="flex h-auto min-h-[calc(50svh-65px)] w-full flex-col items-center justify-center p-4 md:px-12"
    >
      <h1 className="text-4xl font-bold">Get In Touch</h1>
      <p className="mt-4 text-sm text-white/80">
        Have a project in mind or want to discuss potential opportunities? I'd
        love to hear from you!
      </p>
      <div className="mx-auto flex w-full flex-col items-start justify-start px-4 md:mt-10 md:flex-row lg:w-[800px]">
        {/* email */}
        <div className="mt-4 w-full">
          <label
            className="mb-2 block text-sm font-bold "
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
            className="mb-2 block text-sm font-bold "
            htmlFor="location"
          >
            <MapPin className="mr-2 inline" />
            Based in
          </label>
          <p>{contact.location}</p>
        </div>

        {/* connect */}
        <div className="mt-4 w-full">
          <p className="mb-2 block text-sm font-bold ">
            <Link className="mr-2 inline" />
            Connect with me
          </p>
          {contact.socials.map((social) => (
            <a
              key={social.name}
              className="mr-4 inline-block cursor-pointer"
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="inline h-6 w-6"
                src={social.icon.url}
                alt={social.name}
              />
            </a>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default Contact;
