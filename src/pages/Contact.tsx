import { useState } from "react";
import { FiMail, FiPhone, FiGlobe, FiLinkedin } from "react-icons/fi";

type FormState = "idle" | "sending" | "sent" | "error";

const web3FormsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

function Contact() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!web3FormsAccessKey) {
      setState("error");
      setErrorMessage(
        "Contact form is not configured. Missing VITE_WEB3FORMS_ACCESS_KEY.",
      );
      return;
    }

    setState("sending");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.append("access_key", web3FormsAccessKey);
    formData.append("from_name", "Plant Disease Detector Contact Form");
    formData.append(
      "subject",
      String(formData.get("subject") || "New contact form message"),
    );

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json().catch(() => null)) as {
        success?: boolean;
        message?: string;
      } | null;

      if (!response.ok || !payload?.success) {
        throw new Error(payload?.message || "Failed to send message.");
      }

      setState("sent");
      form.reset();
    } catch (error) {
      setState("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <section id="contact" className="  bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-14 md:py-20 mt-16">
        {/* Header */}
        <div className="text-center space-y-3 mb-10 md:mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900">
            Contact
          </h2>
          <p className="text-base sm:text-lg text-green-800/90">
            Want to collaborate, ask a question, or report an issue? Send a
            message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Info card */}
          <div className="rounded-2xl border border-green-100 bg-white shadow-lg p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-green-900 mb-4">
              Get in touch
            </h3>

            <p className="text-green-800/90 leading-relaxed mb-6">
              This is an academic prototype focused on uncertainty-aware and
              explainable plant disease diagnosis under real-world conditions.
              If you want to discuss the thesis, the prototype, or report an
              issue, feel free to reach out.
            </p>

            <div className="space-y-4">
              <a
                href="mailto:eslam.aly@eslamaly.com"
                className="flex items-center gap-3 text-green-900 hover:text-green-700 transition"
              >
                <FiMail />
                <span className="break-all">eslam.aly@eslamaly.com</span>
              </a>

              <a
                href="tel:+491623320059"
                className="flex items-center gap-3 text-green-900 hover:text-green-700 transition"
              >
                <FiPhone />
                <span>+49 162 332 0059</span>
              </a>

              <a
                href="https://eslamaly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-green-900 hover:text-green-700 transition"
              >
                <FiGlobe />
                <span>eslamaly.com</span>
              </a>

              <a
                href="https://www.linkedin.com/in/eslam-aly-88b66ab8/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-green-900 hover:text-green-700 transition"
              >
                <FiLinkedin />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Form card */}
          <div className="rounded-2xl border border-green-100 bg-white shadow-lg p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-green-900 mb-4">
              Send a message
            </h3>

            <form onSubmit={onSubmit} className="space-y-4">
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="firstName"
                    className="text-sm font-medium text-green-900"
                  >
                    First name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    required
                    className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-green-700/30"
                    placeholder="Your first name"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="lastName"
                    className="text-sm font-medium text-green-900"
                  >
                    Last name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    required
                    className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-green-700/30"
                    placeholder="Your last name"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-green-900"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-green-700/30"
                  placeholder="you@example.com"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-green-900"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  required
                  className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-green-700/30"
                  placeholder="What is this about?"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-green-900"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-green-700/30 resize-y"
                  placeholder="Write your message..."
                />
              </div>

              <button
                type="submit"
                disabled={state === "sending"}
                className="w-full sm:w-auto px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 disabled:opacity-50 transition"
              >
                {state === "sending" ? "Sending..." : "Send message"}
              </button>

              {state === "sent" && (
                <p className="text-sm text-green-700">Message sent ✅</p>
              )}
              {state === "error" && (
                <p className="text-sm text-red-700">
                  {errorMessage || "Something went wrong. Please try again."}
                </p>
              )}
            </form>

            <p className="mt-6 text-xs text-green-800/70 leading-relaxed">
              By sending this message, you agree that your email and message
              content will be used only to respond to you. This site is an
              academic prototype for plant disease diagnosis and currently uses
              placeholder results in parts of the interface.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
