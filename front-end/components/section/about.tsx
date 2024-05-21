
import Image from 'next/image';
import Link from 'next/link';

const AboutSection = () => {
  return (
    <section className="bg-white dark:bg-gray-950 " id="about">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div className="max-w-lg">
            <h2 className="text-2xl font-medium text-gray-900 sm:text-4xl dark:text-gray-200">About Us</h2>
            <p className="mt-4 text-gray-600 text-lg dark:text-gray-300">
            The Fujairah research center is pivotal to aligning with the UAE innovation strategy 2071, 
            focusing on applied research and technology innovation for desert and tropical areas.
             Our mission is to be a globally recognized, socially conscious research hub, driving economic 
             transformation in Fujairah and beyond. Our vision is to achieve a sustainable economy through 
             cutting-edge research, promoting resource efficiency, bolstering agriculture and fisheries,
              creating local jobs, and addressing environmental challenges.
            </p>
            <div className="mt-8">
              <Link 
              
              href="https://www.frc.ae/" className="text-blue-500 hover:text-blue-600 font-medium">Learn more about us
                <span className="ml-2">&#8594;</span></Link>
            </div>
          </div>
          <div className="mt-12 md:mt-0">
            <Image
              src="/logo.png"
              alt="About Us Image"
              width={600}
              height={400}
              objectFit="cover"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
