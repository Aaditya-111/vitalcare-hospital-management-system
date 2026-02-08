export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} VitalCare Hospital Management System. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Designed with care for better healthcare
          </p>
        </div>
      </div>
    </footer>
  )
}
