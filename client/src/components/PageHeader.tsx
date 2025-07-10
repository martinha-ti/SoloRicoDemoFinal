interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

export default function PageHeader({ 
  title, 
  subtitle, 
  backgroundImage = "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1920&h=400&fit=crop" 
}: PageHeaderProps) {
  return (
    <section 
      className="page-header"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${backgroundImage}')`
      }}
    >
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-shadow">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto text-shadow">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
