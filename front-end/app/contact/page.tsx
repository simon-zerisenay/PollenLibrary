const ContactSection = () => {
    return (
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-20 mx-auto flex flex-col md:flex-row gap-5 justify-center">
          
          <div className="lg:w-1/3 md:w-1/2 bg-white dark:bg-gray-950  flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 rounded-md px-5 py-5 border-[0.5px] shadow-md dark:border-gray-900">
            <h2 className="text-gray-900 dark:text-gray-100 text-lg mb-1 font-medium title-font">Contact Us</h2>
            <p className="leading-relaxed mb-5 text-gray-600 dark:text-gray-300">Fujairah Research Center</p>
            <div className="relative mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600 dark:text-gray-300">Name</label>
              <input type="text" id="name" name="name" className="w-full bg-white dark:bg-gray-900 rounded border border-gray-300 dark:border-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 text-base outline-none text-gray-700 dark:text-gray-300 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600 dark:text-gray-300">Email</label>
              <input type="email" id="email" name="email" className="w-full bg-white dark:bg-gray-900 rounded border border-gray-300 dark:border-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 text-base outline-none text-gray-700 dark:text-gray-300 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative mb-4">
              <label htmlFor="message" className="leading-7 text-sm text-gray-600 dark:text-gray-300">Message</label>
              <textarea id="message" name="message" className="w-full bg-white dark:bg-gray-900 rounded border border-gray-300 dark:border-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 dark:focus:ring-indigo-900 text-base outline-none text-gray-700 dark:text-gray-300 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
            </div>
            <button className="text-white  bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg">Send Message</button>
            
          </div>
          <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
            <iframe
              width="100%"
              height="100%"
              className="absolute inset-0"
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m19!1m8!1m3!1d115565.91547231133!2d56.2570643!3d25.1547905!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3ef4f9632b3afd69%3A0xa6de9f298d040ac1!2sCity%20-%20Skamkam%20-%20Fujairah!3m2!1d25.154813299999997!2d56.3394658!5e0!3m2!1sen!2sae!4v1715252479481!5m2!1sen!2sae" 
              style={{ filter: 'grayscale(1) contrast(1.2) opacity(0.4)' }}
            ></iframe>
            <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md">
              <div className="lg:w-1/2 px-6">
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">ADDRESS</h2>
                <p className="mt-1">New Sakamkam, Fujairah,UAE</p>
              </div>
              <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">EMAIL</h2>
                <a href="mailto:example@email.com" className="text-indigo-500 leading-relaxed">info@frc.ae</a>
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">PHONE</h2>
                <p className="leading-relaxed">+971 92222411</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default ContactSection;
  