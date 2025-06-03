export default function Products() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Product cards will be populated here */}
        <div className="group relative">
          <div className="w-full min-h-80 bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75">
            <img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg" alt="Product" className="w-full h-full object-center object-cover" />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
                <a href="#">
                  <span aria-hidden="true" className="absolute inset-0"></span>
                  Example SaaS Product
                </a>
              </h3>
              <p className="mt-1 text-sm text-gray-500">Project Management</p>
            </div>
            <p className="text-sm font-medium text-gray-900">$99/mo</p>
          </div>
        </div>
      </div>
    </div>
  );
}