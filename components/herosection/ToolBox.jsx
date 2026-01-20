export default function ToolBox(){
    return (
        <main className=" bg-slate-950">
      
      
      {/* Additional content section to enable parallax scrolling */}
      <section className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-4xl font-bold text-white">Explore More</h2>
          <p className="mb-6 text-lg text-slate-300">
            Scroll back up to see the parallax effect in action. The creative tool cards move at a different speed than the background, creating a beautiful sense of depth and dimension.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-lg bg-slate-800 p-6 border border-slate-700 hover:border-slate-600 transition-colors"
              >
                <h3 className="mb-3 text-xl font-semibold text-white">Feature {item}</h3>
                <p className="text-slate-400">
                  This is an additional content section to enable smooth parallax scrolling effects.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
    )
}