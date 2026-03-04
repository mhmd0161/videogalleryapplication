export default function Features() {
  return (
    <section className="bg-slate-900 py-28">
  <div className="container">
    <h2 className="text-3xl font-semibold text-white text-center mb-16">
      Built for Modern Video Management
    </h2>

    <div className="grid md:grid-cols-3 gap-12">
      {[
        ["Secure Access", "Private content protected with access control"],
        ["Clean Interface", "Minimal, responsive and user-focused design"],
        ["Scalable Backend", "Powered by Django REST Framework"],
      ].map(([title, desc]) => (
        <div
          key={title}
          className="bg-slate-950 p-8 rounded-2xl text-center shadow-md"
        >
          <h3 className="text-white text-xl font-medium mb-3">{title}</h3>
          <p className="text-gray-400 text-sm">{desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>
  );
}