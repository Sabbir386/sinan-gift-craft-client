import React from "react";

function Aboutus() {
  return (
    <div className="bg-secondaryColor text-white py-10 px-6 md:px-20">
      <div className="max-w-4xl mx-auto bg-primaryColor text-gray-800 rounded-lg shadow-lg p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-buttonBackground">
          About Us
        </h1>

        <section className="mt-6">
          <p className="text-gray-400 leading-relaxed mb-4">
            Cashooz.com is the web's most popular rewards program and a thriving
            community that is growing daily. It’s a free rewards program where
            you can earn real cash for performing various tasks and activities
            that you already do every day online. It allows its members to make
            great earnings online from home. Redeem for cash out via one of our
            supported methods at times that suit them and without needing to
            spend any of your own money.
          </p>
        </section>

        <section className="mt-8">
          {/* main points  */}
          <div>
            <h2 className="text-xl md:text-2xl font-semibold mb-2 text-white">
              Join for free
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Cashooz is designed to enable its members to generate additional
              income throughout the year. There are no membership fees or
              concealed charges. You retain all the earnings that are confirmed
              in your account. Register here.
            </p>
          </div>
          {/* main points  */}
          {/* main points  */}
          <div>
            <h2 className="text-xl md:text-2xl font-semibold mb-2 text-white">
              Earn
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Earn CZ Points by getting paid for things that you are already
              doing online, be it taking surveys, watching videos, voting,
              testing website, installing apps, signing up, playing games,
              performing web searches, listening music, review, reading email,
              refer others and much more! All earnings are in USD. $1.00 = 100
              CZ (Points). We collaborate with leading market research and
              product testing firms to provide you with the finest paid tasks,
              updated daily to ensure a continuous array of earning
              opportunities.
            </p>
          </div>
          {/* main points  */}
          {/* main points  */}
          <div>
            <h2 className="text-xl md:text-2xl font-semibold mb-2 text-white">
              Affiliate
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              When you introduce a friend to Cashooz and they begin accumulating
              points, you will receive a lifetime commission of 15% on their
              point’s earnings. Referring friends is a fantastic way to increase
              your earnings—the more people you refer, the more you can earn.
              However, only those who sign up through your referral link and
              complete the necessary tasks will count toward your referral
              total. Inactive sign-ups will not be included. Additionally,
              referred members have the opportunity to earn money by bringing in
              more individuals to Cashooz. It is important to note that the
              referral fees are never deducted from the earnings of either the
              referrer or the referred member. Referring friends presents an
              excellent opportunity to earn money, and the process is remarkably
              straightforward. If you are enthusiastic about generating income
              online, demonstrate to your friends how effortless it is, and both
              parties will reap the rewards. By referring friends, you will
              receive a commission based on the points they accumulate.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              The act of sharing this information is uncomplicated. You will be
              provided with a unique referral link that can be distributed
              through email or social media platforms. Simply inform your
              friends about the ease of earning and your enjoyment of making
              money online. If you maintain a blog or a YouTube channel, you can
              utilize our banners to engage your audience. The more referrals
              you generate, the greater your potential earnings. Encourage your
              friends to join, and you will be compensated—it's as simple as
              that. For further details, please explore our Referral Program.
            </p>
          </div>
          {/* main points  */}
          {/* main points  */}
          <div>
            <h2 className="text-xl md:text-2xl font-semibold mb-2 text-white">
              Rewards
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Cashooz offers three distinct types of rewards: a daily bonus, a
              task completion bonus, and an affiliate bonus, which are not
              provided by other companies globally.
            </p>
          </div>
          {/* main points  */}
          {/* small points  */}
          <div className="pl-4">
            <h3 className="text-sm font-semibold mb-2 text-white">
              Daily Bonus
            </h3>
            <p className="text-gray-400 leading-relaxed mb-4 text-xs">
              {" "}
              The daily bonus must be claimed each day following registration.
              After claiming it today, you will need to make another claim after
              a 24-hour period. This process requires you to claim the bonus on
              a daily basis.
            </p>
            <h3 className="text-sm font-semibold mb-2 text-white">
              Task Completion Bonus
            </h3>
            <p className="text-gray-400 leading-relaxed mb-4 text-xs">
              {" "}
              Completing 10 tasks will earn you a bonus. If you reach 15 tasks,
              an additional bonus will be awarded. Furthermore, upon completing
              20 tasks, you will receive a substantial bonus, along with
              additional rewards for further task completion. Therefore, strive
              to complete more tasks to maximize your bonuses.
            </p>

            <h3 className="text-sm font-semibold mb-2 text-white">
              {" "}
              Affiliate Bonus
            </h3>
            <p className="text-gray-400 leading-relaxed mb-4 text-xs">
              {" "}
              Referring friends is a great way to earn. The more you refer the
              more you earn. But those who sign up with the referral link but do
              not complete any work, will not be counted in the referral list.
              cashooz only counts active referrer list. Referring twenty
              individuals will qualify you for a bonus. Should you refer thirty
              individuals, you will receive an additional bonus. Moreover, upon
              reaching a total of forty or more active referrals, you will be
              granted a significant bonus, in addition to further rewards for
              any additional referrals. Consequently, it is advisable to aim for
              more referrals to enhance your bonuses.
            </p>
          </div>
          {/* small points  */}
        </section>
      </div>
    </div>
  );
}

export default Aboutus;
