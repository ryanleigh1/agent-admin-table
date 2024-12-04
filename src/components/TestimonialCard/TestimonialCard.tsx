import React from "react";

interface TestimonialCardProps {
  userData: {
    imageUrl: string;
    name: string;
    handle: string;
    testimonial: string;
  };
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ userData }) => {
  return (
    <main className="flex flex-col items-start gap-y-4 w-[340px] mt-[200px] p-6 rounded-lg bg-white shadow">
      <header className="flex flex-row gap-x-4">
        <img
          src={userData.imageUrl}
          alt="profile pic"
          width="48px"
          height="48px"
        />
        <div>
          <h2 className="font-sans text-lg-18 font-semibold">
            {userData.name}
          </h2>
          <p className="font-sans text-sm-14 font-normal text-[#525252]">
            {userData.handle}
          </p>
        </div>
      </header>
      <section className="relative group overflow-hidden">
        <p
          id="testimonial-text"
          className="font-sans text-base"
        >
          {userData.testimonial}
        </p>
      </section>
    </main>
  );
};

export default TestimonialCard;
