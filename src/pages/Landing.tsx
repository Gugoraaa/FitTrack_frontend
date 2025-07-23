
import {useNavigate } from "react-router-dom";
export default function FitTrackLanding() {

    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/login'); // change this path to your actual route
    };

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#f9fbfa] overflow-x-hidden group/design-root"
      style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-[#eaf1ee] px-10 py-3">
          <div className="flex items-center gap-4 text-[#101815]">
            
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">FitTrack</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            
                <button className="h-10 min-w-[84px] rounded-lg bg-[#1f5f48] px-4 text-sm font-bold text-[#f9fbfa]"
                onClick={
                    handleGetStarted
                }>
                Get Started
                </button>
            
          </div>
        </header>

        {/* Hero */}
        <section className="px-40 py-5 flex flex-1 justify-center">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1 @container">
            <div className="@[480px]:p-4">
              <div
                className="flex min-h-[480px] flex-col items-center justify-center gap-6 p-4 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-lg"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBknGq0Gzskt6VjmBjrjkaimdbYTpyifX8QUpKm_K_9QLGHZKRBqE4PPxORFBpZ0hj45mZ1dFoiaszQmDLxIwxWu3gneN7CdRKuPa42RHcaDfTuvxr8I3udiEsaP3TT0jkU-4rSiLfny0uEZGzjKiS_lgshoXxJbyKruyENieogLtz-qrr4OQpFDhOmwaDJpImfg67h5JYcI2L6O0-DvnPODIh2YNq4KZd2ikMStrzTXDjCMMceKqLwzrQvTy4wnM0uhAtdqR84LiE')",
                }}
              >
                <div className="flex flex-col gap-2 text-center text-white">
                  <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl">
                    Track Your Fitness Journey
                  </h1>
                  <p className="text-sm @[480px]:text-base">
                    Achieve your health and fitness goals with our comprehensive tracking service.
                    Monitor your progress, set personalized goals, and gain valuable insights.
                  </p>
                </div>
                <button className="mt-4 h-10 rounded-lg bg-[#1f5f48] px-4 text-sm font-bold text-[#f9fbfa] @[480px]:h-12 @[480px]:px-5" onClick={handleGetStarted}>
                  Get Started
                </button>
              </div>
            </div>

            {/* Features */}
            <section className="flex flex-col gap-10 px-4 py-10 @container">
              <header className="flex flex-col gap-4 max-w-[720px]">
                <h2 className="text-[32px] font-bold tracking-light leading-tight @[480px]:text-4xl @[480px]:tracking-[-0.033em]">
                  Key Features
                </h2>
                <p className="text-base">
                  Explore the powerful features designed to help you stay motivated and achieve your fitness aspirations.
                </p>
              </header>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
                {[
                  {
                    title: 'Activity Tracking',
                    description:
                      'Automatically track your daily activities, including steps, distance, calories burned, and active minutes.',
                  },
                  {
                    title: 'Progress Monitoring',
                    description:
                      'Visualize your progress over time with detailed charts and graphs, helping you stay on track.',
                  },
                  {
                    title: 'Goal Setting',
                    description:
                      'Set custom fitness goals for various activities and monitor your progress towards achieving them.',
                  },
                  {
                    title: 'Personalized Insights',
                    description:
                      'Receive tailored recommendations and insights based on your activity data to optimize your fitness routine.',
                  },
                  {
                    title: 'Integration',
                    description:
                      'Seamlessly integrate with other fitness apps and devices to consolidate your health data in one place.',
                  },
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex flex-1 flex-col gap-3 rounded-lg border border-[#d4e2dd] bg-[#f9fbfa] p-4"
                  >
                    <div className="text-[#101815]">
                      <svg width="24px" height="24px" fill="currentColor">
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-base font-bold text-[#101815]">{feature.title}</h3>
                      <p className="text-sm font-normal text-[#5c8a79]">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex justify-center">
          <div className="flex max-w-[960px] flex-1 flex-col text-center px-5 py-10 @container">
            <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
              <a className="text-[#5c8a79] text-base" href="#">
                Privacy Policy
              </a>
              <a className="text-[#5c8a79] text-base" href="#">
                Terms of Service
              </a>
              <a className="text-[#5c8a79] text-base" href="#">
                Contact Us
              </a>
            </div>
            <p className="mt-6 text-[#5c8a79] text-base">© 2023 FitTrack. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
