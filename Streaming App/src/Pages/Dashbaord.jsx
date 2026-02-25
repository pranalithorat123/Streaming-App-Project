import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

export default function Dashboard() {
  const [greeting, setGreeting] = useState("Good Afternoon");

  useEffect(() => {
    const hr = new Date().getHours();
    if (hr < 12) setGreeting("Good Morning");
    else if (hr < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const user = "Pranali Thorat";

  const last7 = [
    { d: "Sep 21", views: 2, mins: 0 },
    { d: "Sep 22", views: 4, mins: 3 },
    { d: "Sep 23", views: 1, mins: 2 },
    { d: "Sep 24", views: 3, mins: 1 },
    { d: "Sep 25", views: 0, mins: 0 },
    { d: "Sep 26", views: 2, mins: 2 },
    { d: "Sep 27", views: 5, mins: 6 },
  ];

  return (
    <div className="space-y-6 p-4 sm:p-6 md:p-8">
      {/* Greeting */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">
            {greeting}, {user}!
          </h1>
          <p className="text-gray-500 text-sm md:text-lg">
            Welcome to your dashboard
          </p>
        </div>
        <div>
          <a
            href="/guided-tour"
            className="text-blue-500 font-medium hover:underline text-sm md:text-base"
          >
            Take Our Guided Tour &rarr;
          </a>
        </div>
      </div>
      {/* Website Ready Card */}
      <div className="rounded-lg bg-white p-4 sm:p-6 shadow hover:shadow-md transition-shadow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {/* Left Section */}
          <div className="flex flex-col gap-4 items-center lg:items-start text-center lg:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <img
                src="congrats.gif"
                alt="Celebration"
                className="h-24 w-24 sm:h-28 sm:w-28 object-contain"
              />
              <div>
                <h1 className="text-xl sm:text-3xl font-bold text-gray-700">
                  Congratulations!
                </h1>
                <h3 className="text-sm sm:text-lg text-gray-600">
                  Your website is ready.
                </h3>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={() => window.location.assign("/visit")}
              >
                Visit Website
              </button>
              <button
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                onClick={() => window.location.assign("/edit-website")}
              >
                Edit Website
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-4 lg:gap-8">
            {/* Audio/Image */}
            <div className="flex-shrink-0">
              <div className="h-32 w-32 rounded-full border-4 border-gray-50 flex items-center justify-center overflow-hidden shadow-md">
                <img
                  src="audio_vedio.png"
                  alt="Media illustration"
                  className="h-24 w-24 sm:h-28 sm:w-28 object-contain"
                />
              </div>
            </div>

            {/* Text */}
            <div className="flex flex-col gap-2 max-w-xs text-center lg:text-left lg:ml-4">
              <h3 className="text-sm sm:text-lg text-gray-600 font-medium whitespace-nowrap">
                Upload your Movies, Web-series, Podcasts, Courses etc.
              </h3>
              <h3 className="text-sm sm:text-lg text-gray-600 font-medium whitespace-nowrap">
                Monetize and generate revenue.
              </h3>
              <h3 className="text-sm sm:text-lg text-gray-600 font-medium whitespace-nowrap">
                Try your Android, iOS and TV apps.
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Overview + Trending Section */}
      <div className="bg-gray-100 p-4 sm:p-6 rounded-lg space-y-6">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left: Overview */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xl md:text-2xl font-semibold">
              Overview{" "}
              <span className="text-gray-500 font-normal text-sm md:text-lg">
                last 7 days
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Views */}
              <div className="rounded-lg bg-white p-4 shadow hover:shadow-md transition-shadow">
                <div className="text-base font-semibold text-gray-700">
                  Views
                </div>
                <div className="text-3xl font-semibold mt-1">0</div>
                <div className="mt-3 h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={last7}>
                      <defs>
                        <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                          <stop
                            offset="5%"
                            stopColor="#3b82f6"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#3b82f6"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis
                        dataKey="d"
                        tick={{ fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis hide />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="views"
                        stroke="#3b82f6"
                        fill="url(#g1)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Watch Duration */}
              <div className="rounded-lg bg-white p-4 shadow hover:shadow-md transition-shadow">
                <div className="text-base font-semibold text-gray-700">
                  Watch Duration
                </div>
                <div className="text-2xl font-bold mt-1">00h 00m 00s</div>
                <div className="mt-3 h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={last7}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis
                        dataKey="d"
                        tick={{ fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis hide />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="mins"
                        stroke="#22c55e"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Trending */}
          <div className="lg:col-span-5 mt-4 lg:mt-0">
            <div className="rounded-lg bg-white p-4 shadow hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2 sm:gap-0">
                <h3 className="font-semibold text-xl">Trending Content</h3>
                <select className="border rounded px-2 py-1 text-sm mt-2 sm:mt-0">
                  <option>By Views</option>
                  <option>By Watch Time</option>
                </select>
              </div>
              <ul className="mt-4 space-y-3">
                {[
                  { t: "Action Thriller", v: 124 },
                  { t: "Science Doc", v: 88 },
                  { t: "Comedy Hour", v: 75 },
                ].map((it, i) => (
                  <li
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3"
                  >
                    <div className="h-8 w-16 rounded bg-gradient-to-r from-blue-400/30 to-blue-200/10 flex-shrink-0" />
                    <div className="flex-1 w-full">
                      <div className="text-sm font-medium">{it.t}</div>
                      <div className="h-1.5 bg-gray-200 rounded mt-1 overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${Math.min(100, it.v)}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 w-10 text-right">
                      {it.v}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Infrastructure */}
        <section>
          <h3 className="text-xl md:text-2xl font-semibold mb-4 mt-6">
            Infrastructure
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Bandwidth */}
            <div className="rounded-lg bg-white p-5 shadow hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-lg md:text-xl">
                    Bandwidth Usage
                  </div>
                  <p className="text-sm md:text-lg text-gray-500 mt-1">
                    <button
                      onClick={() =>
                        window.location.assign("/billing/subscription-details")
                      }
                      className="text-blue-500 hover:underline"
                    >
                      Purchase
                    </button>{" "}
                    subscription to use more bandwidth.
                  </p>
                </div>
                <div className="h-8 w-8 rounded-md bg-blue-100 text-blue-500 grid place-items-center">
                  ⏫
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm md:text-base text-gray-500">
                <span>0 GB Used</span>
                <span>10 GB Free</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                <div className="h-full bg-blue-400" style={{ width: `2%` }} />
              </div>
            </div>

            {/* Storage */}
            <div className="rounded-lg bg-white p-5 shadow hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-lg md:text-xl">
                    Storage Usage
                  </div>
                  <p className="text-sm md:text-lg text-gray-500 mt-1">
                    <button
                      onClick={() =>
                        window.location.assign("/billing/subscription-details")
                      }
                      className="text-blue-500 hover:underline"
                    >
                      Purchase
                    </button>{" "}
                    subscription to use more storage.
                  </p>
                </div>
                <div className="h-8 w-8 rounded-md bg-blue-100 text-blue-500 grid place-items-center">
                  💾
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm md:text-base text-gray-500">
                <span>0.15 GB Used</span>
                <span>50 GB Free</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                <div className="h-full bg-blue-400" style={{ width: `0.3%` }} />
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="text-xs md:text-sm text-gray-500 mt-6 md:mt-8">
        © 2025 abc., All Rights Reserved
      </footer>
    </div>
  );
}
