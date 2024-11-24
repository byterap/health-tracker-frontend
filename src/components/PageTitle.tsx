export default function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[60px] flex items-center justify-center">
      <h1 className="text-2xl font-semibold text-gray-900">
        {children}
      </h1>
    </div>
  )
} 