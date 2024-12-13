import { useState } from "react";
import { useTranslation } from "react-i18next";
import swal from "sweetalert";
import Footer from "./Footer";

const INITIAL_FORM_STATE = {
  name: "",
  email: "",
  questions: "",
};

const Contact = () => {
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const canSubmitForm = !!form.email && !!form.name && !!form.questions;
  
  const handleFormChange = (e) => {
    const { id, value } = e.target;

    console.log(id, value);

    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/data/query-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.status === 200) {
        swal(
          t("contact_us_success_heading"),
          t("contact_us_success_message"),
          "success"
        );
      } else {
        swal(
          t("contact_us_failure_heading"),
          t("contact_us_failure_message"),
          "error"
        );
      }

      setForm({ ...INITIAL_FORM_STATE });
      setLoading(false);
    } catch (err) {
      console.log("Error while submitting contact us form", err);
    }
  };

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-3 md:p-8 text-center">
        <div className="flex justify-center">
          <img
            className="rounded-2xl w-full md:w-auto px-3"
            src="https://scholarships.iico.org/wp-content/uploads/2023/09/Contact-Us-1536x1487.png"
            alt="Scholarship"
          />
        </div>
        <div className="flex flex-col justify-start gap-6 md:gap-10 items-center  p-3">
          <h1 className="text-gray-700 text-[24px] md:text-5xl font-bold w-full text-start ">
            {t("contact_us")}
          </h1>
          <form
            className="flex flex-col gap-10 w-full max-w-md md:max-w-full "
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col text-start ">
              <label className="text-sm md:text-base font-medium mb-1 ">
                {t("contact_name")}
              </label>
              <input
                type="text"
                id="name"
                onChange={handleFormChange}
                disabled={loading}
                className="border border-gray-300 rounded-md p-3 my-1 text-sm md:text-base"
                value={form.name}
              />
            </div>
            <div className="flex flex-col text-start">
              <label className="text-sm md:text-base font-medium mb-1">
                {t("contact_email")}
              </label>
              <input
                type="email"
                id="email"
                onChange={handleFormChange}
                disabled={loading}
                className="border border-gray-300 rounded-md p-3 my-1 text-sm md:text-base"
                value={form.email}
              />
            </div>
            <div className="flex flex-col text-start">
              <label className="text-sm md:text-base font-medium mb-1">
                {t("contact_ques")}
              </label>
              <textarea
                type="text"
                id="questions"
                onChange={handleFormChange}
                disabled={loading}
                className="border border-gray-300 rounded-md p-2 my-1 text-sm md:text-base h-40"
                value={form.questions}
              ></textarea>
            </div>
            <div className="w-full flex justify-start">
              <button className={`text-white bg-green-700 px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed ${canSubmitForm && "hover:bg-green-800"}`} disabled={!canSubmitForm}>
                {t("contact_submit")}
              </button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
